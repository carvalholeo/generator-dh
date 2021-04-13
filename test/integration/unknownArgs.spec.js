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

  describe('(unknown args)', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should exit with code 1', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code) {
        if (err) {
          return done(err)
        }
        strictEqual(code, 1)
        return done()
      })
    })

    it('should print usage', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) {
          return done(err)
        }
        ok(/Usage: express-dh /.test(stdout))
        ok(/--help/.test(stdout))
        ok(/--version/.test(stdout))
        ok(/error: unknown option/.test(stderr))
        return done()
      })
    })

    it('should print unknown option', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) {
          return done(err)
        }
        ok(/error: unknown option/.test(stderr))
        return done()
      })
    })
  })
})
