const rimraf = require('rimraf')

const {
  strictEqual,
  notStrictEqual,
  ok
} = require('assert')

const {
  setupTestEnvironment,
  runRaw,
  parseCreatedFiles
} = require('../support/utils')

const {
  TEMP_DIR
} = require('../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    rimraf(TEMP_DIR, done)
  })

  describe('<dir>', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app in directory', function (done) {
      runRaw(ctx.dir, ['foo'], function (err, code, stdout, stderr) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        ctx.stderr = stderr
        ctx.stdout = stdout
        strictEqual(ctx.files.length, 17, 'should have 17 files')
        return done()
      })
    })

    it('should provide change directory instructions', function () {
      ok(/cd foo/.test(ctx.stdout))
    })

    it('should provide install instructions', function () {
      ok(/npm install/.test(ctx.stdout))
    })

    it('should provide debug instructions', function () {
      ok(/DEBUG=foo:\* (?:& )?npm start/.test(ctx.stdout))
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('foo/bin/www'), -1)
      notStrictEqual(ctx.files.indexOf('foo/app.js'), -1)
      notStrictEqual(ctx.files.indexOf('foo/package.json'), -1)
    })

    it('should have pug templates', function () {
      notStrictEqual(ctx.files.indexOf('foo/views/error.pug'), -1)
      notStrictEqual(ctx.files.indexOf('foo/views/index.pug'), -1)
      notStrictEqual(ctx.files.indexOf('foo/views/layout.pug'), -1)
    })
  })
})
