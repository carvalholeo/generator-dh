const { rm } = require('fs-extra')
const {
  strictEqual,
  ok
} = require('assert')

const {
  setupTestEnvironment,
  parseCreatedFiles,
  run
} = require('../support/utils')

const {
  TEMP_DIR
} = require('../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    rm(TEMP_DIR, {
      force: true,
      recursive: true
    })
      .then(() => done())
      .catch(error => done(error))
  })

  describe('-h', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should print usage', function (done) {
      run(ctx.dir, ['-h'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        const files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(files.length, 0, 'should not have any file')
        ok(/Usage: express-dh /.test(stdout))
        ok(/--help/.test(stdout))
        ok(/--version/.test(stdout))
        return done()
      })
    })
  })
})
