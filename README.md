# Creditcard

Creditcard number parsing, validation and information extraction. The source
code has been commented using JSDoc and converted to documentation which can be
found in the `docs` folder.

## Installation

The module is available in the NPM registry. It can be installed using the
`npm` command line utility.

```
npm install --save creditcard
```

Once you have installed the module you can simply require inside of your Node.js
application and use it's exported methods.

```js
var creditcard = require('creditcard');

creditcard.validate(4111111111111);
```

## Documentation

The documentation of this module has been automatically generated from the
JSDocs that is used to comment the source code. It should give a clear
understanding of the methods that are available in this module and how it should
be used. The documentation can be found in the [**docs
folder**](https://github.com/3rd-Eden/creditcard/tree/master/docs)

### License

[MIT](LICENSE)
