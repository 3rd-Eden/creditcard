# Creditcard [![Build Status](https://secure.travis-ci.org/observing/creditcard.png?branch=master)](https://travis-ci.org/observing/creditcard)

Creditcard number parsing, validation and information extraction. The source
code has been commented using JSDoc and converted to documentation which can be
found in the `docs` folder.

## Installation

The module is available in the NPM registery. It can be installed using the
`npm` commandline utlity.

```
npm install creditcard
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
folder**](https://github.com/observing/creditcard/tree/master/docs)

### License (MIT)

Copyright (c) 2013 Observe.it (http://observe.it) <opensource@observe.it>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
