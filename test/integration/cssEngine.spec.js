const rimraf = require('rimraf')
const {
  strictEqual,
  ok
} = require('assert')

const {
  setupTestEnvironment,
  runRaw
} = require('../support/utils')

const {
  TEMP_DIR
} = require('../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    rimraf(TEMP_DIR, done)
  })

  describe('--css <engine>', function () {
    describe('(no engine)', function () {
      const ctx = setupTestEnvironment(this.fullTitle())

      it('should exit with code 1', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code) {
          if (err) {
            return done(err)
          }
          strictEqual(code, 1)
          return done()
        })
      })

      it('should print usage', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code, stdout) {
          if (err) {
            return done(err)
          }
          ok(/Usage: express-dh /.test(stdout))
          ok(/--help/.test(stdout))
          ok(/--version/.test(stdout))
          return done()
        })
      })

      it('should print argument missing', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code, stdout, stderr) {
          if (err) {
            return done(err)
          }
          ok(/error: option .* argument missing/.test(stderr))
          return done()
        })
      })
    })
  })
})
