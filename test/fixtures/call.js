var debug = require('debug')
var d1    = debug('MYAPP')

d1('hi')
d2('hi') // should remain because of undefined
d3('hi') // should remain because of undefined
// ----

var debug = require('debug'),
    d2    = debug('MYAPP')

d1('hi')
d2('hi')
d3('hi') // should remain because of undefined

// ----

var d3 = require('debug')('MYAPP')

d1('hi')
d2('hi')
d3('hi') // should remain because of undefined

require('debug')('MYAPP')()
