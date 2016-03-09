#!/usr/bin/env node

var udebug = require('../')

var fs = require('fs'),
    opts = require('minimist')(
      process.argv.slice(2), {
        boolean: ['h', 'v', 'd'],
        default: {h: false, v: false, d: false},
        alias: {
          o: 'outfile',
          h: 'help',
          v: 'version',
          d: 'debug'
        }
      }),
    filepath = opts._[0],
    out = (typeof opts.o === 'string')
      ? fs.createWriteStream(opts.o).on('close', () => process.exit(1))
      : process.stdout

main()

function main() {
  if (opts.v) {
    process.stdout.write(
      `udebug v${ require('../package.json').version }\n`)
    return
  }

  if (opts.h) {
    help()
    return
  }

  if (process.stdin.isTTY && filepath) {
    out.write(udebug(fs.readFileSync(filepath, 'utf8'), {
      filepath: filepath,
      debug: opts.d
    }))
  }
  else if (!process.stdin.isTTY) {
    var data = ''
    process.stdin
      .on('readable', () => {
        var chunk
        while ((chunk = process.stdin.read()))
          data += chunk
      })
      .on('end', () => out.write(udebug(data)))
  } else {
    help()
  }
}

function help() {
  fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', () => process.exit(1))
}
