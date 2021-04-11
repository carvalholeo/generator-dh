
const { mkdirSync } = require('fs')
const { tmpdir } = require('os')
const { sync } = require('uid-safe')
const { join } = require('path')

function tmpDir () {
  const dirname = join(tmpdir(), sync(8))

  mkdirSync(dirname, { mode: parseInt('0700', 8) })

  return dirname
}

module.exports = tmpDir
