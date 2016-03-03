var d = require('debug')('udebug')

var deepEqual  = require('deep-equal'),
    esprima    = require('esprima'),
    estraverse = require('estraverse'),
    espurify   = require('espurify'),
    escodegen  = require('escodegen'),
    syntax     = estraverse.Syntax

module.exports = function udebug(code) {
  var ast = esprima.parse(code, {sourceType: 'module', range: true, comment: true, tokens: true}),
      removee,
      assigned = [[]]

  var padding = ''

  estraverse.replace(ast, {

    enter: function(node, parent) {
      d(padding += ' ', '[enter]', node.type, node.value || '*', node.name || '*')

      switch (node.type) {

      case syntax.ImportDeclaration:
        if (node.source.value === 'debug') {
          removee = node
          this.skip()
        }
        return

      case syntax.BlockStatement:
        assigned.push([])
        return

      case syntax.CallExpression:
        if (node.callee.name === 'require'
            && node.arguments[0] && node.arguments[0].value === 'debug')
          removee = node
        return

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
        return
      }
    },

    leave: function(node, parent) {
      d((padding = padding.substr(1)) + ' ', '[leave]', node.type, node.value || '*', node.name || '*')
      if (node === removee) {
        d('@@ remove' + node.type + ' @@')
        this.remove()
        switch(node.type) {
        case syntax.ImportDeclaration:
          node.specifiers.forEach((specifier) => {
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
        return

      case syntax.VariableDeclaration:
        // empty declaration
        if (node.declarations.length === 0) {
          d('@@ remove empty declaration @@')
          this.remove()
        }
        return
      }
    }
  })

  ast = estraverse.attachComments(ast, ast.comments, ast.tokens)
  return escodegen.generate(ast, {comment: true}) + '\n'
}
