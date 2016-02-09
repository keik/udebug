var d = require('debug')('udebug')

var deepEqual  = require('deep-equal'),
    esprima    = require('esprima'),
    estraverse = require('estraverse'),
    espurify   = require('espurify'),
    escodegen  = require('escodegen'),
    syntax     = estraverse.Syntax

var declarationCode = 'require("debug")',
    a_body = esprima.parse(declarationCode).body[0],
    a_requireDebugExp = espurify(a_body.expression)

module.exports = function udebug(code) {
  var ast = esprima.parse(code, {sourceType: 'module'}),
      removee,
      origAssigned = [[]],
      funcAssigned = [[]]

  var padding = ''

  estraverse.replace(ast, {

    enter: function(node, parent) {
      d(padding += ' ', '[enter]', node.type, node.value || '*', node.name || '*')

      // matched with prototype
      if (deepEqual(espurify(node), a_requireDebugExp)) {
        d('@@ match with prototype @@')
        removee = node
        this.skip()
        return
      }

      switch (node.type) {

      case syntax.BlockStatement:
        origAssigned.push([])
        funcAssigned.push([])
        return

      case syntax.CallExpression:

        // matched with marked function identifier
        if (Array.prototype.concat.apply([], funcAssigned).indexOf(node.callee.name) > -1) {
          d('@@ match with marked func identifier @@')
          removee = node
          this.skip()
        }

        // matched with marked module identifier
        else if (Array.prototype.concat.apply([], origAssigned).indexOf(node.callee.name) > -1) {
          d('@@ match with marked orig identifier @@')
          removee = node
          this.skip()
        }
        return

      }
    },

    leave: function(node, parent) {
      d((padding = padding.substr(1)) + ' ', '[leave]', node.type, node.value || '*', node.name || '*')

      switch (node.type) {

      case syntax.BlockStatement:
        origAssigned.pop()
        funcAssigned.pop()
        return

      case syntax.VariableDeclarator:

        // module
        if (node.init === removee) {
          removee = node
          origAssigned[origAssigned.length - 1].push(node.id.name)
          d('@@ remove module @@')
          this.remove()
        }

        // fn
        else if (node.init && node.init.callee === removee) {
          removee = node
          funcAssigned[origAssigned.length - 1].push(node.id.name)
          d('@@ remove fn @@')
          this.remove()
        }
        return

      case syntax.ExpressionStatement:
        if (node.expression === removee
            // for pattern `require('debug')('MYAPP')('message')`
            || (node.expression && node.expression.callee && node.expression.callee.callee === removee)) {
          d('@@ remove expression @@')
          this.remove()
        }
        return

      case syntax.VariableDeclaration:
        // empty declaration
        if (node.declarations.length === 0) {
          this.remove()
        }
        return

      }
    }
  })

  return escodegen.generate(ast)
}
