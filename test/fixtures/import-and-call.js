import debug from 'debug'

var d1    = debug('MYAPP1'),
    d2    = debug('MYAPP2')

// call d1('p1')
d1('p1')
// call d2('p2')
d2('p2')
// call debug('MYAPP3')('p3')
debug('MYAPP3')('p3')
// call console.log('p4')
console.log('p4')
