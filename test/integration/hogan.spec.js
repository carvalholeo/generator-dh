const { readFileSync, rm } = require('fs-extra')
const { resolve } = require('path')

const {
  strictEqual,
  notStrictEqual,
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

  describe('--hogan', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with hogan templates', function (done) {
      run(ctx.dir, ['--hogan'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 15, 'should have 15 files')
        return done()
      })
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('bin/www'), -1)
      notStrictEqual(ctx.files.indexOf('app.js'), -1)
      notStrictEqual(ctx.files.indexOf('package.json'), -1)
    })

    it('should have hjs in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.hjs === 'string')
    })

    it('should have hjs templates', function () {
      notStrictEqual(ctx.files.indexOf('views/error.hjs'), -1)
      notStrictEqual(ctx.files.indexOf('views/index.hjs'), -1)
    })
  })

})
