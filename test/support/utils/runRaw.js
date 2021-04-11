const { spawn } = require('child_process')

const { BIN_PATH } = require('../consts')

function runRaw (dir, args, callback) {
  const argv = [BIN_PATH].concat(args)
  const binp = process.argv[0]
  let stderr = ''
  let stdout = ''

  const child = spawn(binp, argv, {
    cwd: dir
  })

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', str => {
    stdout += str
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', str => {
    stderr += str
  })

  child.on('close', onclose)
  child.on('error', callback)

  function onclose (code) {
    callback(null, code, stdout, stderr)
  }
}

module.exports = runRaw
