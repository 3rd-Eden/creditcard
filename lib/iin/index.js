[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(function generate(exports, key) {
  'use strict';

  // Require the different iin ranges and attach it to the exports.
  exports[key.toString()] = require('./'+ key);
  return exports;
}, exports);
