var debug = require('debug'),
    d1 = require('debug')('MYAPP1'),
    d2 = debug('MYAPP2')

function a() {
  var d3 = require('debug')('MYAPP3')
  var d4 = debug('MYAPP4')
  d1('foo')
  d2('foo')
  d3('foo')
  d4('foo')
  d5('foo')
}

d1('bar1')
d2('bar2')
d3('bar3')
d4('bar4')
d5('bar5')

var d3 = require('debug')('MYAPP3')
var d5 = require('debug')('MYAPP5')

d1('baz1')
d2('baz2')
d3('baz3')
d4('baz4')
d5('baz5')
