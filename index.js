var remove = require('remove-module')

module.exports = udebug

/**
 * @param {string} code target code
 * @param {object} opts options
 * @param {string} opts.filepath filepath to attach source map
 * @param {boolean} opts.debug attach source map or not
 * @returns {string} transformed code
 */
function udebug(code, opts) {
  return remove('debug', code, opts)
}
