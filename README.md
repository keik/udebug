# udebug

Remove [visionmedia/debug](https://github.com/visionmedia/debug) related code using AST.


# Install

```
npm install udebug
```


# Usage

## CLI

```
udebug src.js
```

will print results to stdout, or output to the file with `-o` option:

```
udebug src.js -o dist.js
```

stdin are available:

```
echo 'var debug = require("debug")' | udebug
```


## API

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

process.stdout.write(udebug(code))
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
