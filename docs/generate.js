'use strict';

/**
 * The modules that are required to generate some decent documentation.
 */
var ejs = require('ejs')
  , fs = require('fs');

/**
 * The MARKDOWN template that output's a decent API file from the JSDocs
 */
var template = fs.readFileSync(__dirname + '/api.ejs', 'utf8');

/**
 * Fetch the generated data from dox and clean it up a little so we have to use
 * less logic in our template to display fancy pancy information.
 */
var data = require('./api.json').map(function parse(jsdoc) {
  // check if we have param tags, this way we directly know if it's a function
  // or not
  jsdoc.params = jsdoc.tags.filter(function tags(tag) {
    if (tag.type !== 'param') return false;
    return true;
  });

  // what kind of comment is this? functional or static
  jsdoc.type = jsdoc.params.length ? 'function' : 'static';

  // generate a function invocation scheme
  if (jsdoc.type === 'function') {
    jsdoc.ctx.invocation = [
        '('
      , jsdoc.params.map(function (param) {
          return param.name +' _' + param.types.join('|') +'_';
        }).join(', ')
      , ')'].join('');
  } else {
    jsdoc.ctx.invocation = '';
  }

  return jsdoc;
});

// generate the markdown template and output it's data
var markdown = ejs.render(template, {
  jsdoc: data
});

console.log(markdown);
