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

  describe('--api', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create web api app without view engine', function (done) {
      run(ctx.dir, ['--api'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 11, 'should have 11 files')
        done()
      })
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      notStrictEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      notStrictEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
    })

    it('should not have views directory', function () {
      strictEqual(ctx.files.indexOf('views'), -1, 'should not have views directory')
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

      it('should respond to HTTP GET request', function (done) {
        request(this.app)
          .get('/api/values')
          .expect(200, ['value1', 'value2'], done)
      })

      it('should respond to HTTP GET request with id', function (done) {
        request(this.app)
          .get('/api/values/5')
          .expect(200, 'value', done)
      })

      it('should respond to HTTP POST request', function (done) {
        request(this.app)
          .post('/api/values')
          .expect(200, '', done)
      })

      it('should respond to HTTP PUT request with id', function (done) {
        request(this.app)
          .put('/api/values/5')
          .expect(200, '', done)
      })

      it('should respond to HTTP DELETE request with id', function (done) {
        request(this.app)
          .delete('/api/values/5')
          .expect(200, '', done)
      })

      it('should generate a 404', function (done) {
        request(this.app)
          .get('/api/does_not_exist')
          .expect(404, { 'message': 'Not Found' }, done)
      })
    })
  })

})
