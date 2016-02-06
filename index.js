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
  var removee
  var assignedIds = []
debugger
  estraverse.replace(ast, {

    enter: function(node, parent) {
    },

    leave: function(node, parent) {
      console.log(node.type, node.value || '*', node.name || '*');
      console.log(removee, assignedIds)
      if (deepEqual(espurify(node), a_requireDebugExp)) {
        console.log('0-0')
        removee = parent
        console.log('aaa', parent.type);
        if (parent.type === syntax.VariableDeclarator)
          assignedIds.push(parent.id.name)
        this.skip()
        return
      }

      if (node === removee) {
        if (node.type === syntax.CallExpression) {
          console.log('0-1')
          removee = parent
          if (parent.type === syntax.VariableDeclarator)
            assignedIds.push(parent.id.name)
          this.skip()
        } else {
          this.remove()
          removee = null
        }
        return
      }

      if (node.type === syntax.VariableDeclaration
          && node.declarations.length === 0) {
        console.log(2)
        this.remove()
        removee = null
        return
      }
    }

  })

  return escodegen.generate(ast)
}


var code = `
var d1 = require("debug")
require('debug')('a')
var d2 = require('debug')('a')
var d3 = require("debug"),
    fs = require('fs'),
    d4 = require("debug"),
    d5 = require("debug")('a')
`
console.log(module.exports(code))
