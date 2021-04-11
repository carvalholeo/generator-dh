const { strictEqual } = require('assert')
const stripColors = require('./stripColors')
const stripWarnings = require('./stripWarnings')
const runRaw = require('./runRaw')

function run (dir, args, callback) {
  runRaw(dir, args, (err, code, stdout, stderr) => {
    if (err) {
      return callback(err)
    }

    process.stderr.write(stripWarnings(stderr))

    try {
      strictEqual(stripWarnings(stderr), '')
      strictEqual(code, 0)
    } catch (e) {
      return callback(e)
    }

    return callback(null, stripColors(stdout))
  })
}

module.exports = run
