var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) {
      return read(path.join(__dirname, 'fixtures', f), 'utf8')
    }

var udebug = require('../')

test('udebug', function(t) {

  t.test('should remove requiring `debug`', function(t) {
    t.equal(udebug(fixture('./requiring-1.js')),
            fixture('./requiring-1-expected.js'), 'requiring debug are removed (pattern 1)')
    t.equal(udebug(fixture('./requiring-2.js')),
            fixture('./requiring-2-expected.js'), 'requiring debug are removed (pattern 2)')
    t.equal(udebug(fixture('./requiring-3.js')),
            fixture('./requiring-3-expected.js'), 'requiring debug are removed (pattern 3)')
    t.equal(udebug(fixture('./requiring-4.js')),
            fixture('./requiring-4-expected.js'), 'requiring debug are removed (pattern 4)')
    t.equal(udebug(fixture('./requiring-5.js')),
            fixture('./requiring-5-expected.js'), 'requiring debug are removed (pattern 5)')
    t.equal(udebug(fixture('./requiring-6.js')),
            fixture('./requiring-6-expected.js'), 'requiring debug are removed (pattern 6)')
    t.end()
  })

  t.test('should remove calling `debug`', function(t) {
    t.equal(udebug(fixture('./call.js')),
            fixture('./call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./scope.js')),
            fixture('./scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

})
