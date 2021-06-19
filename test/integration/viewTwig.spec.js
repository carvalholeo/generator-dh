const { readFileSync, rm } = require('fs-extra')
const { resolve } = require('path')
const request = require('supertest')
const {
  strictEqual,
  notStrictEqual,
  ok
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
    rm(TEMP_DIR, {
      force: true,
      recursive: true
    })
      .then(() => done())
      .catch(error => done(error))
  })

  describe('--view <engine>', function () {
    describe('twig', function () {
      const ctx = setupTestEnvironment(this.fullTitle())

      it('should create basic app with twig templates', function (done) {
        run(ctx.dir, ['--view', 'twig'], function (err, stdout) {
          if (err) {
            return done(err)
          }
          ctx.files = parseCreatedFiles(stdout, ctx.dir)
          strictEqual(ctx.files.length, 16, 'should have 16 files')
          return done()
        })
      })

      it('should have basic files', function () {
        notStrictEqual(ctx.files.indexOf('bin/www'), -1)
        notStrictEqual(ctx.files.indexOf('app.js'), -1)
        notStrictEqual(ctx.files.indexOf('package.json'), -1)
      })

      it('should have twig in package dependencies', function () {
        const file = resolve(ctx.dir, 'package.json')
        const contents = readFileSync(file, 'utf8')
        const dependencies = JSON.parse(contents).dependencies
        ok(typeof dependencies.twig === 'string')
      })

      it('should have twig templates', function () {
        notStrictEqual(ctx.files.indexOf('views/error.twig'), -1)
        notStrictEqual(ctx.files.indexOf('views/index.twig'), -1)
        notStrictEqual(ctx.files.indexOf('views/layout.twig'), -1)
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
