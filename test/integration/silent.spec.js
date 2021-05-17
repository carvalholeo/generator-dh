const rimraf = require('rimraf')
const request = require('supertest')
const { readdirSync } = require('fs')
const {
  strictEqual,
  notStrictEqual,
  ok
} = require('assert')

const AppRunner = require('../support/app-runner')
const {
  setupTestEnvironment,
  parseCreatedFiles,
  runRaw
} = require('../support/utils')

const {
  APP_START_STOP_TIMEOUT,
  TEMP_DIR
} = require('../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    rimraf(TEMP_DIR, done)
  })
  describe('--silent', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with all dependencies installed', function (done) {
      runRaw(ctx.dir, ['--silent'], function (err, code, stdout, stderr) {
        if (err || stderr) {
          return done(err)
        }

        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 17, 'should have 17 files')

        ok(/ instalando dependências do NPM/.test(stdout))
        ok(/ inicializando repositório Git/.test(stdout))
        ok(/ adicionando arquivos ao Git/.test(stdout))
        ok(/ fazendo primeiro commit dos arquivos/.test(stdout))
        ok(/ Instalação concluída!/.test(stdout))

        return done()
      })
    })

    it('should have basic files', function () {
      const files = readdirSync(ctx.dir)

      notStrictEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      notStrictEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      notStrictEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
      notStrictEqual(files.indexOf('package-lock.json'), -1, 'should have package-lock.json file')
      notStrictEqual(files.indexOf('.git'), -1, 'should have .git folder')
      notStrictEqual(files.indexOf('node_modules'), -1, 'should have node_modules folder')
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

      it('should respond with stylesheet', function (done) {
        request(this.app)
          .get('/stylesheets/style.css')
          .expect(200, /sans-serif/, done)
      })
    })
  })
})