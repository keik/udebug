var debug = require('debug'),
    d1    = debug('MYAPP1'),
    d2    = debug('MYAPP2')

// call d1('p1')
d1('p1')
// call d2('p2')
d2('p2')
// call debug('MYAPP3')('p3')
debug('MYAPP3')('p3')
// call require('debug')('MYAPP4')('p4')
require('debug')('MYAPP4')('p4')
// call console.log('p5')
console.log('p5')
debug.log()
debug.save()
debug.load()

if (true) d2('p3')

if (true)
  d2('p4')
else
  d2('p5')

while (true) d2('p6')

for (var i; i; i++) d2('p7')

for (var k in this) d2('p8')
