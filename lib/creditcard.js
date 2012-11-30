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
 * Find out which major card scheme issued the card based on the iin range.
 *
 * @param {String} number
 * @returns {String|Undefined}
 */
exports.cardscheme = function cardscheme(number) {
  number = number.replace(/\D/g, '');

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
  number = number.replace(/\D/g, '');

  var pattern = /^(34|37)/.test(number)
    ? 'XXXX XXXXXX XXXXX'     // American express has a different pattern
    : 'XXXX XXXX XXXX XXXX';  // All other credit cards

  return pattern.replace(/X/g, function replace(char, index) {
    return number.charAt(index) || '';
  }).trim();
};

/**
 *
 * @param {String} number
 * @returns {String}
 */
exports.parse = function parse(number) {
  number = number.replace(/\D/g, '');

  return {
      iin: number.slice(0, 9)               // issuer identifier number
    , mii: exports.mii[+number.charAt(0)]   // major industry identifier
    , formatted: exports.format(number)     // formatted version
  };
};
