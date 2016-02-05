var deepEqual  = require('deep-equal'),
    esprima    = require('esprima'),
    estraverse = require('estraverse'),
    espurify   = require('espurify'),
    escodegen  = require('escodegen'),
    syntax     = estraverse.Syntax

var declarationCode = 'require("debug")',
    a_body = esprima.parse(declarationCode).body[0],
    a_requireDebugExp = espurify(a_body.expression)

module.exports = function undebug(code) {
  var ast = esprima.parse(code, {sourceType: 'module'})
  var removes = []

  estraverse.replace(ast, {

    enter: function(node, parent) {
    },

    leave: function(node, parent) {
      if (deepEqual(espurify(node), a_requireDebugExp)) {
        removes.push(parent)
        this.skip()
        return
      }

      if (removes.indexOf(node) > -1) {
        if (node.type === syntax.CallExpression) {
          removes.push(parent)
          this.skip()
        } else {
          this.remove()
        }
        return
      }

      if (node.type === syntax.VariableDeclaration
          && node.declarations.length === 0)
        this.remove()
      return
    }

  })

  return escodegen.generate(ast)
}
