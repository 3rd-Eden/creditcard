[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(function generate(exports, key) {
  'use strict';

  key = key.toString();

  // Require the different iin ranges and attach it to the exports.
  exports[key] = require('./'+ key);

  // Create a lookup array, so we can easily iterate over them to see if we have
  // matches againt the starting numbers
  exports[key +'_keys'] = Object.keys(exports[key]);
  return exports;
}, exports);
