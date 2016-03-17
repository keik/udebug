var debug = require('debug'),
    d1    = debug('MYAPP1'),
    d2    = debug('MYAPP2')

d1('p1')
d2('p2')
debug('MYAPP3')('p3')
require('debug')('MYAPP4')('p4')
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
