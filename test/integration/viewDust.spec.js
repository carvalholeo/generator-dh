const { remove } = require('fs-extra')
const request = require('supertest')
const {
  strictEqual,
  notStrictEqual
} = require('assert')

const AppRunner = require('../support/app-runner')
const {
  setupTestEnvironment,
  parseCreatedFiles,
  npmInstall,
  run
} = require('../support/utils')

const {
  APP_START_STOP_TIMEOUT,
  NPM_INSTALL_TIMEOUT,
  TEMP_DIR
} = require('../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    remove(TEMP_DIR, done)
  })

  describe('--view <engine>', function () {
    describe('dust', function () {
      const ctx = setupTestEnvironment(this.fullTitle())

      it('should create basic app with dust templates', function (done) {
        run(ctx.dir, ['--view', 'dust'], function (err, stdout) {
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

      it('should have dust templates', function () {
        notStrictEqual(ctx.files.indexOf('views/error.dust'), -1, 'should have views/error.dust file')
        notStrictEqual(ctx.files.indexOf('views/index.dust'), -1, 'should have views/index.dust file')
      })

      it('should have installable dependencies', function (done) {
        this.timeout(NPM_INSTALL_TIMEOUT)
        npmInstall(ctx.dir, done)
      })

      describe('npm start', function () {
        before('start app', function () {
          this.app = new AppRunner(ctx.dir)
        })

        after('stop app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.stop(done)
        })

        it('should start app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.start(done)
        })

        it('should respond to HTTP request', function (done) {
          request(this.app)
            .get('/')
            .expect(200, /<title>Express<\/title>/, done)
        })

        it('should generate a 404', function (done) {
          request(this.app)
            .get('/does_not_exist')
            .expect(404, /<h1>Not Found<\/h1>/, done)
        })
      })
    })
  })
})
