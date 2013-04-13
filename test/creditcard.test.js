'use strict';

/**
 * Configure our assertations library.
 */
var chai = require('chai')
  , expect = chai.expect;

chai.Assertion.includeStack = true;

/**
 * The actual library that we test..
 */
var creditcard = require('../');

describe('creditcard#validate', function () {
  var valid = 4222222222222
    , invalid = 242424242424;

  it('should validate the creditcard number', function () {
    expect(creditcard.validate(valid)).to.equal(true);
  });

  it('should not validate the creditcard number', function () {
    expect(creditcard.validate(invalid)).to.equal(false);
  });
});

describe('creditcard#testnumbers', function () {
  it('should have an array of test numbers', function () {
    expect(creditcard.testnumbers).to.be.a('array');

    // also ensure that they validate
    creditcard.testnumbers.forEach(function (number) {
      var valid = creditcard.validate(number);

      if (!valid) console.log('failed to process', number);
      expect(valid).to.equal(true);
    });
  });
});

describe('creditcard#format', function () {
  it('should format American Express using a 4/6/5 pattern', function () {
    expect(creditcard.format('378282246310005')).to.equal('3782 822463 10005');
  });

  it('should formot all other credit card numbers in a 4/4/4/4 pattern', function () {
    expect(creditcard.format('4111111111111111')).to.equal('4111 1111 1111 1111');
  });

  it('should also format credit card numbers with less chars correctly', function () {
    expect(creditcard.format('4222222222222')).to.equal('4222 2222 2222 2');
  });
});

describe('creditcard#truncate', function () {
  it('should handle Amerian Express', function () {
    expect(creditcard.truncate('378282246310005')).to.equal('XXXX XXXXXX X0005');
  });

  it('should formot all other credit card formats', function () {
    expect(creditcard.truncate('4111111111111111')).to.equal('XXXX XXXX XXXX 1111');
  });

  it('should also truncate credit card numbers with less chars correctly', function () {
    expect(creditcard.truncate('4222222222222')).to.equal('XXXX XXXX X222 2');
  });
});

describe('creditcard#parse', function () {
  it('should extract information', function () {
    var data = creditcard.parse('4111111111111111');

    expect(data).to.have.property('iin');
    expect(data).to.have.property('mii');
    expect(data).to.have.property('cvv');
    expect(data).to.have.property('truncate');
    expect(data).to.have.property('scheme');
    expect(data).to.have.property('formatted');
    expect(data).to.have.property('validates');
  });

  it('should extract the correct information', function () {
    var data = creditcard.parse('4111111111111111');

    expect(data.iin).to.equal('411111111');
    expect(data.mii).to.equal('Banking and financial');
    expect(data.cvv).to.equal(3);
    expect(data.truncate).to.equal('XXXX XXXX XXXX 1111');
    expect(data.scheme).to.equal('Visa');
    expect(data.formatted).to.equal('4111 1111 1111 1111');
    expect(data.validates).to.equal(true);
  });
});

describe('creditcard#expiry', function () {
  it('should validate the expiry', function () {
    var today = new Date();

    expect(creditcard.expiry((today.getMonth() + 1), today.getFullYear()));
  });

  it('should not validate the expiry', function () {
    expect(creditcard.expiry('06', '1990')).to.equal(false);
    expect(creditcard.expiry('06', '12')).to.equal(false);
    expect(creditcard.expiry(6, 12)).to.equal(false);
  });
});
