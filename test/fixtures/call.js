var debug = require('debug')
var d1     = debug('MYAPP')

d1()
d2('hi')

// ----

var debug = require('debug'),
    d2     = debug('MYAPP')

d2('hi')

// ----

var d3 = require('debug')('MYAPP')

d3('hi')
