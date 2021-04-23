const rimraf = require('rimraf')
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
    rimraf(TEMP_DIR, done)
  })

  describe('--dotenv', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with git files', function (done) {
      run(ctx.dir, ['--dotenv'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 19, 'should have 19 files')
        return done()
      })
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      notStrictEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      notStrictEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
    })

    it('should have .gitignore', function () {
      notStrictEqual(ctx.files.indexOf('.gitignore'), -1, 'should have .gitignore file')
    })

    it('should have .env', function () {
      notStrictEqual(ctx.files.indexOf('.env'), -1, 'should have .env file')
    })

    it('should have .env.example', function () {
      notStrictEqual(ctx.files.indexOf('.env.example'), -1, 'should have .env.example file')
    })
  })

})
