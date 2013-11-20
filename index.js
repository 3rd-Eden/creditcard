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
 * Test numbers from different creditcard schemes. Most of them are taken from
 * http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
 *
 * @type {Array}
 */
exports.testnumbers = [
    4222222222222     // visa
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
  , 5019717010103742  // dankort pbs
  , 6331101999990016  // switch/solo paymentech
];

/**
 * Find out which major card scheme issued the card based on the iin range.
 *
 * @param {String} number
 * @returns {String|Undefined}
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
  } else if (/^5[1-5]/.test(number)) {
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
 * @param {String} number
 * @returns {String} formatted version
 */
exports.format = function format(number) {
  number = (''+ number).replace(/\D/g, '');

  var index = 0
    , pattern = /^(34|37)/.test(number)
      ? 'XXXX XXXXXX XXXXX'     // American express has a different pattern
      : 'XXXX XXXX XXXX XXXX';  // All other credit cards

  return pattern.replace(/X/g, function replace(char) {
    return number.charAt(index++) || '';
  }).trim();
};

/**
 * Validates the creditcards using the Luhn10 algorithm.
 *
 * @copyright https://gist.github.com/976805
 * @param {String} number
 * @returns {Boolean}
 */
exports.validate = function validate(number) {
  number = (''+ number).replace(/\D/g, '');

  var i = number.length
    , sum = 0
    , mul = 1
    , ca;

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
 * @param {String|Number} month
 * @param {String|Number} year
 * @return {Boolean}
 */
exports.expiry = function expiry(month, year) {
  // number conversion
  month = +month;
  year = +year;

  // incorrect numbers should fail fast
  if (!(month || year)) return false;

  var date = new Date()
    , now = +date;

  date.setFullYear(year);
  date.setMonth(--month);

  return +date >= now;
};

/**
 * Applies PAN truncation to the given creditcard. PAN (primary account number)
 * trunction simply replaces the credit-card number's digits by asterisks while
 * leaving the last 4 digits untouched. This hides the numbers from strangers
 * while still allowing the card holder with multiple cards to identify which
 * card was used.
 *
 * @param {String} number
 * @return {String} pan
 */
exports.truncate = exports.PANtruncate = function pan(number) {
  number = (''+ number).replace(/\D/g, '');

  var length = number.length - 4
    , pattern = exports.format(number);

  return pattern.replace(/\d/g, function replace(char) {
    return length-- > 0
      ? 'X'
      : char;
  });
};

/**
 * Parse the creditcard information
 *
 * @param {String} number
 * @returns {String}
 */
exports.parse = function parse(number) {
  number = (''+ number).replace(/\D/g, '');

  var scheme = exports.cardscheme(number);

  return {
      iin: number.slice(0, 9)               // Issuer Identifier Number
    , mii: exports.mii[+number.charAt(0)]   // Major Industry Identifier
    , formatted: exports.format(number)     // Formatted version
    , cvv: scheme === 'American Express'
        ? 4                                 // American Express requires 4 digits
        : 3                                 // All other credit cards
    , truncate: exports.truncate(number)    // PAN truncated version
    , scheme: scheme                        // Creditcard scheme
    , validates: exports.validate(number)   // Does the creditcard validate
  };
};
}(typeof exports !== 'undefined' ? exports : (creditcard = {})));
