var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) {
      return read(path.join(__dirname, 'fixtures', f), 'utf8')
    }

var udebug = require('../')

test('udebug', function(t) {

  t.test('should remove require `debug`', function(t) {
    t.equal(udebug(fixture('./require-1.js')).code,
            fixture('./require-1-expected.js'), 'require debug are removed (pattern 1)')
    t.equal(udebug(fixture('./require-2.js')).code,
            fixture('./require-2-expected.js'), 'require debug are removed (pattern 2)')
    t.equal(udebug(fixture('./require-3.js')).code,
            fixture('./require-3-expected.js'), 'require debug are removed (pattern 3)')
    t.equal(udebug(fixture('./require-4.js')).code,
            fixture('./require-4-expected.js'), 'require debug are removed (pattern 4)')
    t.equal(udebug(fixture('./require-5.js')).code,
            fixture('./require-5-expected.js'), 'require debug are removed (pattern 5)')
    t.equal(udebug(fixture('./require-6.js')).code,
            fixture('./require-6-expected.js'), 'require debug are removed (pattern 6)')
    t.equal(udebug(fixture('./require-7.js')).code,
            fixture('./require-7-expected.js'), 'require debug are removed (pattern 7)')
    t.end()
  })

  t.test('should remove calling `debug` imported by require', function(t) {
    t.equal(udebug(fixture('./require-and-call.js')).code,
            fixture('./require-and-call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./require-and-call-on-scope.js')).code,
            fixture('./require-and-call-on-scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

  t.test('should remove import `debug`', function(t) {
    t.equal(udebug(fixture('./import-1.js')).code,
            fixture('./import-1-expected.js'), 'import debug are removed (pattern 1)')
    t.equal(udebug(fixture('./import-2.js')).code,
            fixture('./import-2-expected.js'), 'import debug are removed (pattern 2)')
    t.equal(udebug(fixture('./import-3.js')).code,
            fixture('./import-3-expected.js'), 'import debug are removed (pattern 3)')
    t.equal(udebug(fixture('./import-4.js')).code,
            fixture('./import-4-expected.js'), 'import debug are removed (pattern 4)')
    t.equal(udebug(fixture('./import-5.js')).code,
            fixture('./import-5-expected.js'), 'import debug are removed (pattern 5)')
    t.equal(udebug(fixture('./import-6.js')).code,
            fixture('./import-6-expected.js'), 'import debug are removed (pattern 6)')
    t.equal(udebug(fixture('./import-7.js')).code,
            fixture('./import-7-expected.js'), 'import debug are removed (pattern 7)')
    t.end()
  })

  t.test('should remove calling `debug` imported by import', function(t) {
    t.equal(udebug(fixture('./import-and-call.js')).code,
            fixture('./import-and-call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./import-and-call-on-scope.js')).code,
            fixture('./import-and-call-on-scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

})
