# pruno-mocha

A mocha test runner with support for should and coffeescript.

## Usage

```js
"use strict";

var pruno = require('pruno');

pruno.plugins(function(mix) {
  mix
    .configure({ dir: __dirname + '/config' })
    .mocha({
      search: ['./src/**/*.js', './tests/**/*.js', './tests/**/*.coffee'],
      coffee: false,
      use: ['should']
    });
});
```
