(function (exports) {
'use strict';

/**
 * Major Industry Identifier.
 *
 * The first digit of a ISO/IEC 7812 issuer identifier number (inn) tells about
 * what industry the card is used. The index of the array should be the first
 * number of the inn.
 *
 * @type {Array}
 * @public
 */
exports.mii = exports.MII = [
    'ISO/TC 68 and other industry assignments'
  , 'Airlines'
  , 'Airlines and other future industry assignments'
  , 'Travel and entertainment and banking/financial'
  , 'Banking and financial'
  , 'Banking and financial'
  , 'Merchandising and banking/financial'
  , 'Petroleum and other future industry assignments'
  , 'Healthcare, telecommunications and other future industry assignments'
  , 'For assignment by national standards bodies'
];

/**
 * Test numbers from different credit card schemes. Most of them are taken from
 * http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
 *
 * @type {Array}
 * @public
 */
exports.testnumbers = [
    4000000000000002  // Recurly test number
  , 4000000000000010  // Recurly test number
  , 4000000000000028  // Recurly test number
  , 4000000000000036  // Recurly test number
  , 4000000000000044  // Recurly test number
  , 4000000000000051  // Recurly test number
  , 4000000000000077  // Recurly test number
  , 4000000000000085  // Recurly test number
  , 4000000000000093  // Recurly test number
  , 4000000000000101  // Recurly test number
  , 4000000000000119  // Recurly test number
  , 4000000000000200  // Recurly test number
  , 4222222222222222  // Recurly test number
  , 4000000000000226  // Recurly test number
  , 4000000000000309  // Recurly test number
  , 4000000000000317  // Recurly test number
  , 4000000000000325  // Recurly test number
  , 4000000000000341  // Recurly test number
  , 4222222222222     // visa
  , 4012888888881881  // visa
  , 4111111111111111  // visa
  , 5105105105105100  // mastercard
  , 5555555555554444  // mastercard
  , 3566002020360505  // jbc
  , 3530111333300000  // jbc
  , 6011000990139424  // discover
  , 6011111111111117  // discover
  , 6011601160116611  // discover
  , 38520000023237    // diners club
  , 30569309025904    // diners club
  , 378734493671000   // american express
  , 371449635398431   // american express
  , 378282246310005   // american express
  , 341111111111111   // american express
  , 5431111111111111  // mastercard
  , 5610591081018250  // australian bank
  , 5019717010103742  // dankort (pbs)
  , 76009244561       // dankort (pbs)
  , 6331101999990016  // switch/solo (paymentech)
];

/**
 * Find out which major card scheme issued the card based on the IIN range.
 *
 * @param {String} number Credit card number.
 * @returns {String|Undefined}
 * @api public
 */
exports.cardscheme = function cardscheme(number) {
  number = (''+ number).replace(/\D/g, '');

  if (/^(5610|560221|560222|560223|560224|560225)/.test(number)) {
    return 'Australian Bank Card';
  } else if (/^(2014|2149)/.test(number)) {
    return 'Diner\'s Club';
  } else if (/^36/.test(number)) {
    return 'Diner\'s Club International';
  } else if (/^35(2[89]|[3-8][0-9])/.test(number)) {
    return 'Japanese Credit Bureau';
  } else if (/^(5018|5020|5038|6304|6759|676[1-3])/.test(number)) {
    return 'Maestro';
  } else if (/^(6304|670[69]|6771)/.test(number)) {
    return 'laser';
  } else if (/^(6334|6767)/.test(number)) {
    return 'Solo (Paymentech)';
  } else if (/^(222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720|5[1-5])/.test(number)) {
    return 'MasterCard';
  } else if (/^(6011|622|64|65)/.test(number)) {
    return 'Discover';
  } else if (/^3[47]/.test(number)) {
    return 'American Express';
  } else if (/^(30[0-5]|36|38|54|55|2014|2149)/.test(number)) {
    return 'Diner\'s Club / Carte Blanche';
  } else if (/^(4026|417500|4508|4844|491(3|7))/.test(number)) {
    return 'Visa Electron';
  } else if (/^(4)/.test(number)) {
    return 'Visa';
  }

  return undefined;
};

/**
 * Format the credit card number in to the same patterns as seen on the actual
 * credit cards.
 *
 * @param {String} number Credit card number.
 * @returns {String} Formatted version.
 * @api public
 */
exports.format = function format(number) {
  number = (''+ number).replace(/\D/g, '');

  var index = 0
    , pattern = /^(34|37)/.test(number)
      ? 'XXXX XXXXXX XXXXX'     // American express has a different pattern.
      : 'XXXX XXXX XXXX XXXX';  // All other credit cards.

  return pattern.replace(/X/g, function replace(char) {
    return number.charAt(index++) || '';
  }).trim();
};

/**
 * Validates the credit card number using the Luhn10 algorithm.
 *
 * @copyright https://gist.github.com/976805
 * @param {String} number Credit card number we should validate.
 * @returns {Boolean}
 * @api public
 */
exports.validate = function validate(number) {
  number = (''+ number).replace(/\D/g, '');

  var i = number.length
    , sum = 0
    , mul = 1
    , ca;

  //
  // Fast fail case, not enough credit card numbers have been entered. The
  // current shortest range of chars is 12, from Maestro.
  //
  if (i < 12) return false;

  while (i--) {
    ca = number.charAt(i) * mul;
    sum += ca - (ca > 9) * 9;
    mul ^= 3;
  }

  return (sum % 10 === 0) && (sum > 0);
};

/**
 * Validates the expiry number.
 *
 * @param {String|Number} month Expiry month.
 * @param {String|Number} year Expiry year.
 * @returns {Boolean}
 * @api public
 */
exports.expiry = function expiry(month, year) {
  // number conversion.
  month = +month;
  year = +year;

  // incorrect numbers should fail fast instantly
  if (!month || !year || month > 12) return false;

  var date = new Date()
    , now = +date;

  date.setFullYear(year);
  date.setMonth(--month);

  return +date >= now;
};

/**
 * Applies PAN truncation to the given credit card. PAN (primary account number)
 * trunction simply replaces the credit-card number's digits by asterisks while
 * leaving the last 4 digits untouched, unless keeping the first six is specified.
 * This hides the numbers from strangers while still allowing the card holder
 * with multiple cards to identify which card was used. Keeping the first six is
 * useful to allow business to know what company the card was issued from and
 * track chargebacks.
 *
 * @param {String} number Credit card number.
 * @param {String} replacementChar Replacement character.
 * @param {Boolean} keepFirstSix Keep first six digits of card number.
 * @returns {String} PAN.
 * @api public
 */
exports.truncate = exports.PANtruncate = function pan(number, replacementChar, keepFirstSix) {
  if(!replacementChar) replacementChar = 'X';
  number = (''+ number).replace(/\D/g, '');

  var pattern = exports.format(number)
     , startPosition = keepFirstSix === true ? 6 : 0
     , endPosition = number.length - 4
     , currentPosition = 0;

  return pattern.replace(/\d/g, function replace(char) {
     currentPosition++;
     return (currentPosition > startPosition && currentPosition <= endPosition)
        ? replacementChar
        : char;
  });
};

/**
 * Parse the credit card information all at once.
 *
 * @param {String} number Credit card number.
 * @param {Boolean} keepFirstSix Keep first six digits of card number.
 * @returns {Object}
 * @api public
 */
exports.parse = function parse(number, keepFirstSix) {
  number = (''+ number).replace(/\D/g, '');

  var scheme = exports.cardscheme(number);

  return {
       iin: number.slice(0, 9)               // Issuer Identifier Number.
     , mii: exports.mii[+number.charAt(0)]   // Major Industry Identifier.
     , formatted: exports.format(number)     // Formatted version.
     , cvv: scheme === 'American Express'
        ? 4                                  // American Express requires 4 digits.
        : 3                                  // All other credit cards.
     , truncate: exports.truncate(number, keepFirstSix)    // PAN truncated version.
     , scheme: scheme                        // Credit card scheme.
     , validates: exports.validate(number)   // Does the credit card validate.
  };
};
}(typeof exports !== 'undefined' ? exports : (creditcard = {})));
