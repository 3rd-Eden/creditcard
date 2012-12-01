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
var creditcard = require('../lib/creditcard');

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

describe('creditcard#pan', function () {
  it('should handle Amerian Express', function () {
    expect(creditcard.pan('378282246310005')).to.equal('XXXX XXXXXX X0005');
  });

  it('should formot all other credit card formats', function () {
    expect(creditcard.pan('4111111111111111')).to.equal('XXXX XXXX XXXX 1111');
  });

  it('should also truncate credit card numbers with less chars correctly', function () {
    expect(creditcard.pan('4222222222222')).to.equal('XXXX XXXX X222 2');
  });
});
