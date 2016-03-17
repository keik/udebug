import aaa from 'debug'
import * as bbb from 'debug'
import {log} from 'debug'
import {log as ccc} from 'debug'
import {save, formatArgs} from 'debug'
import {load, formatArgs as ddd} from 'debug'

var d1    = aaa('MYAPP1'),
    d2    = aaa('MYAPP2')

d1('p1')
d2('p2')
aaa('MYAPP3')('p3')
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
