var test              = require('tape'),
    read              = require('fs').readFileSync,
    path              = require('path'),
    convert           = require('convert-source-map'),
    sourceMap         = require('source-map'),
    SourceMapConsumer = sourceMap.SourceMapConsumer,

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
    t.equal(udebug(fixture('./require-7.js')),
            fixture('./require-7-expected.js'), 'require debug are removed (pattern 7)')
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
            fixture('./import-7-expected.js'), 'import debug are removed (pattern 7)')
    t.end()
  })

  t.test('should remove calling `debug` imported by import', function(t) {
    t.equal(udebug(fixture('./import-and-call.js')),
            fixture('./import-and-call-expected.js'), 'calling debug are removed')
    t.equal(udebug(fixture('./import-and-call-on-scope.js')),
            fixture('./import-and-call-on-scope-expected.js'), 'calling debug are removed with scope sensitive')
    t.end()
  })

  t.test('should bundle source map with `debug` option', function(t) {
    var transformed = udebug(fixture('./source-map.js'), {
      filepath: './source-map.js',
      debug: true
    })

    /*
     * original:
     *
     *   0123456789012345678901234
     * 1 var debug = require('debug'),
     * 2     fs    = require('fs')
     * 3 var d = ('myapp')
     * 4 d(1)
     * 5 console.log(2)
     */

    /*
     * transformed:
     *
     *   0123456789012345678901234
     * 1 var fs = require('fs');
     * 2 console.log(2);
     */

    var map = convert.fromSource(transformed).toObject(),
        con = new SourceMapConsumer(map),
        origPos

    origPos = con.originalPositionFor({line: 1, column: 4})
    t.equal(origPos.line, 2)
    t.equal(origPos.column, 4)
    origPos = con.originalPositionFor({line: 1, column: 9})
    t.equal(origPos.line, 2)
    t.equal(origPos.column, 12)
    origPos = con.originalPositionFor({line: 1, column: 17})
    t.equal(origPos.line, 2)
    t.equal(origPos.column, 20)
    origPos = con.originalPositionFor({line: 2, column: 0})
    t.equal(origPos.line, 5)
    t.equal(origPos.column, 0)
    origPos = con.originalPositionFor({line: 2, column: 8})
    t.equal(origPos.line, 5)
    t.equal(origPos.column, 8)
    origPos = con.originalPositionFor({line: 2, column: 12})
    t.equal(origPos.line, 5)
    t.equal(origPos.column, 12)
    t.end()
  })

})
