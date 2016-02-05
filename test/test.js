var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) { return read(path.join(__dirname, f), 'utf8') }

var undebug = require('../')
test('undebug', function(t) {

  t.test('should remove requiring `debug`', function(t) {
    t.equal(undebug(fixture('./fixtures/requiring.js')),
            fixture('./fixtures/requiring-expected.js').trim())
    t.end()
  })
})
