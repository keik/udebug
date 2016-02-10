var debug = require('debug'),
    d1    = debug('MYAPP1'),
    d2    = debug('MYAPP2')

d1('p1')
d2('p2')
debug('MYAPP3')('p3')
require('debug')('MYAPP4')('p4')
console.log('p5');
