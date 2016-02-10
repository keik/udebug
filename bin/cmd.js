#!/usr/bin/env node

var udebug = require('../')

var fs = require('fs'),
    opts = require('minimist')(
      process.argv.slice(2), {
        boolean: ['h', 'v'],
        alias: {o: 'outfile', h: 'help', v: 'version'},
        default: {o: false, h: false}
      }),
    fileName = opts._[0],
    cmd = opts.c,
    out = (typeof opts.o === 'string')
      ? fs.createWriteStream(opts.o).on('close', () => process.exit(1))
      : process.stdout

if (opts.v) {
  return process.stdout.write(
    `udebug v${ require('../package.json').version }\n`)
}

if (opts.h) {
  return help()
}

if (process.stdin.isTTY && fileName) {
  return out.write(udebug(fs.readFileSync(fileName)))
}
else if (!process.stdin.isTTY) {
  var data = ''
  return process.stdin
    .on('readable', () => {
      var chunk
      while ((chunk = process.stdin.read()))
        data += chunk
    })
    .on('end', () => out.write(udebug(data)))
}
else {
  help()
}

function help() {
  fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', () => process.exit(1))
}
