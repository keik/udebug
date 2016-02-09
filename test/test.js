var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) {
      return read(path.join(__dirname, 'fixtures', f), 'utf8')
    }

var undebug = require('../')

test('undebug', function(t) {

  t.test('should remove requiring `debug`', function(t) {

    t.equal(undebug(fixture('./requiring.js')),
            fixture('./requiring-expected.js'))

    t.equal(undebug(fixture('./call.js')),
            fixture('./call-expected.js'))

    t.end()
  })
})
