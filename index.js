var d = require('debug')('udebug')

var esprima    = require('esprima'),
    estraverse = require('estraverse'),
    escodegen  = require('escodegen'),
    syntax     = estraverse.Syntax,
    convert    = require('convert-source-map'),
    merge      = require('merge-source-map')

module.exports = udebug

/**
 * @param {string} code target code
 * @param {object} opts options
 * @param {string} opts.filepath filepath to attach source map
 * @param {boolean} opts.debug attach source map or not
 * @returns {string} transformed code
 */
function udebug(code, opts) {

  opts = opts || {}

  var ast = esprima.parse(code, {
    sourceType: 'module',
    range: true,
    comment: true,
    tokens: true,
    loc: opts.debug
  })

  var removee,
      assigned = [[]]

  var _padding = '' // for logging

  estraverse.replace(ast, {

    enter: function(node, parent) {
      d(_padding += ' ', '[enter]', node.type, node.value || '*', node.name || '*')

      switch (node.type) {
      case syntax.ImportDeclaration:
        if (node.source.value === 'debug') {
          removee = node
          this.skip()
        }
        break
      case syntax.BlockStatement:
        assigned.push([])
        break
      case syntax.CallExpression:
        if (node.callee.name === 'require'
            && node.arguments[0] && node.arguments[0].value === 'debug')
          removee = node
        break
      case syntax.Identifier:
        if (Array.prototype.concat.apply([], assigned).indexOf(node.name) > -1) {
          // parent node of marked identifer will be removed basically,
          // except in the case that parent MemberExpression's root object is no-marked
          if (parent.type === syntax.MemberExpression && parent.object) {
            if (Array.prototype.concat.apply([], assigned).indexOf(parent.object.name) > -1)
              removee = node
          } else
            removee = node
        }
        break
      }
    },

    leave: function(node, parent) {
      d((_padding = _padding.substr(1)) + ' ', '[leave]', node.type, node.value || '*', node.name || '*')
      if (node === removee) {
        d('@@ remove' + node.type + ' @@')
        this.remove()
        switch(node.type) {
        case syntax.ImportDeclaration:
          node.specifiers.forEach(function(specifier) {
            assigned[assigned.length - 1].push(specifier.local.name)
          })
          break
        case syntax.VariableDeclarator:
          assigned[assigned.length - 1].push(node.id.name)
          break
        case syntax.AssignmentExpression:
          assigned[assigned.length - 1].push(node.left.name)
          removee = parent
          break
        case syntax.Identifier:
        case syntax.CallExpression:
        case syntax.MemberExpression:
          removee = parent
          break
        }
      }

      switch (node.type) {
      case syntax.BlockStatement:
        assigned.pop()
        break
      case syntax.VariableDeclaration:
        if (node.declarations.length === 0) {
          d('@@ remove empty declaration @@')
          this.remove()
        }
        break
      }
    }
  })

  ast = estraverse.attachComments(ast, ast.comments, ast.tokens)
  var gen = escodegen.generate(ast, {
    comment: true,
    sourceMap: opts.debug && opts.filepath,
    sourceContent: opts.debug && code,
    sourceMapWithCode: true
  })

  var origMap = convert.fromSource(code) && convert.fromSource(code).toObject(),
      newMap  = gen.map && gen.map.toString(),
      mergedMap = merge(origMap, JSON.parse(newMap)),
      mapComment = mergedMap ? convert.fromObject(mergedMap).toComment() : ''

  return gen.code + '\n' + mapComment
}
