var test = require('tape'),
    read = require('fs').readFileSync,
    path = require('path'),
    fixture = function(f) {
      return read(path.join(__dirname, 'fixtures', f), 'utf8')
    }

var udebug = require('../')

test('udebug', function(t) {

  t.test('should remove require `debug`', function(t) {
    t.equal(udebug(fixture('./require-1.js')),
            fixture('./require-1-expected.js'), 'require debug are removed (pattern 1)')
    t.equal(udebug(fixture('./require-2.js')),
            fixture('./require-2-expected.js'), 'require debug are removed (pattern 2)')
    t.equal(udebug(fixture('./require-3.js')),
            fixture('./require-3-expected.js'), 'require debug are removed (pattern 3)')
    t.equal(udebug(fixture('./require-4.js')),
            fixture('./require-4-expected.js'), 'require debug are removed (pattern 4)')
    t.equal(udebug(fixture('./require-5.js')),
            fixture('./require-5-expected.js'), 'require debug are removed (pattern 5)')
    t.equal(udebug(fixture('./require-6.js')),
            fixture('./require-6-expected.js'), 'require debug are removed (pattern 6)')
    t.end()
  })

  t.test('should remove calling `debug` imported by require', function(t) {
    t.equal(udebug(fixture('./require-and-call.js')),
            fixture('./require-and-call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./require-and-call-on-scope.js')),
            fixture('./require-and-call-on-scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

  t.test('should remove import `debug`', function(t) {
    t.equal(udebug(fixture('./import-1.js')),
            fixture('./import-1-expected.js'), 'import debug are removed (pattern 1)')
    t.equal(udebug(fixture('./import-2.js')),
            fixture('./import-2-expected.js'), 'import debug are removed (pattern 2)')
    t.equal(udebug(fixture('./import-3.js')),
            fixture('./import-3-expected.js'), 'import debug are removed (pattern 3)')
    t.equal(udebug(fixture('./import-4.js')),
            fixture('./import-4-expected.js'), 'import debug are removed (pattern 4)')
    t.equal(udebug(fixture('./import-5.js')),
            fixture('./import-5-expected.js'), 'import debug are removed (pattern 5)')
    t.equal(udebug(fixture('./import-6.js')),
            fixture('./import-6-expected.js'), 'import debug are removed (pattern 6)')
    t.equal(udebug(fixture('./import-7.js')),
            fixture('./import-7-expected.js'), 'import debug are removed (pattern 6)')
    t.end()
  })

  t.test('should remove calling `debug` imported by import', function(t) {
    t.equal(udebug(fixture('./import-and-call.js')),
            fixture('./import-and-call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./import-and-call-on-scope.js')),
            fixture('./import-and-call-on-scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

})
