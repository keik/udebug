import aaa from 'debug'
import * as bbb from 'debug'
import {log} from 'debug'
import {log as ccc} from 'debug'
import {save, formatArgs} from 'debug'
import {load, formatArgs as ddd} from 'debug'

var d1    = aaa('MYAPP1'),
    d2    = aaa('MYAPP2')

// call d1('p1')
d1('p1')
// call d2('p2')
d2('p2')
// call debug('MYAPP3')('p3')
aaa('MYAPP3')('p3')
// call console.log('p4')
console.log('p4')
bbb.log()
bbb.save()
bbb.load()
ccc()
log()
save()
formatArgs()
load()
ddd()
