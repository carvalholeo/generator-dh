const { rm } = require('fs-extra')
const {
  strictEqual,
  notStrictEqual
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

  describe('--ejs', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with ejs templates', function (done) {
      run(ctx.dir, ['--ejs'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 15, 'should have 15 files')
        return done()
      })
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      notStrictEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      notStrictEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
    })

    it('should have ejs templates', function () {
      notStrictEqual(ctx.files.indexOf('views/error.ejs'), -1, 'should have views/error.ejs file')
      notStrictEqual(ctx.files.indexOf('views/index.ejs'), -1, 'should have views/index.ejs file')
    })
  })

})
