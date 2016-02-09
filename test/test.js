var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) {
      return read(path.join(__dirname, 'fixtures', f), 'utf8')
    }

var udebug = require('../')

test('udebug', function(t) {

  t.test('should remove requiring `debug`', function(t) {

    t.equal(udebug(fixture('./requiring.js')),
            fixture('./requiring-expected.js'))

    t.equal(udebug(fixture('./call.js')),
            fixture('./call-expected.js'))

    t.equal(udebug(fixture('./scope.js')),
            fixture('./scope-expected.js'))

    t.end()
  })
})
