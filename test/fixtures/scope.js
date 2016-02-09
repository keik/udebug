var d = require('debug')('MYAPP')

function a() {
  d('foo')
  var d1 = require('debug')('MYAPP')
}

d1('bar') // should remain because of undefined
