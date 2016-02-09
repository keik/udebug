# udebug

Remove [visionmedia/debug](https://github.com/visionmedia/debug) related code using an AST.


# Usage

## CLI

not yet implemented


## Node

```js
var udebug = require('udebug')

var code = [
  'var debug = require("debug"),',
  '    d     = debug("MYAPP")   ',
  '                             ',
  'function greet() {           ',
  '  d("#greet called")         ',
  '  return "hi"                ',
  '}                            '
].join('\n')

console.log(udebug(code))
```

will output:

```js
function greet() {
    return 'hi';
}
```


# Test

```
% npm install
% npm test
```


# License

MIT (c) keik
