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

d1('bar')
d2('bar')
d3('bar') // should remain
d4('bar') // should remain
d5('bar') // should remain

var d3 = require('debug')('MYAPP3')
var d5 = require('debug')('MYAPP5')

d1('baz')
d2('baz')
d3('baz')
d4('baz') // should remain
d5('baz')
