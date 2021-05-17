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
    let output = ''

    it('should create basic app with all dependencies installed', function (done) {
      runRaw(ctx.dir, ['--silent'], function (err, code, stdout) {
        if (err) {
          return done(err)
        }

        output = stdout

        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 17, 'should have 17 files')

        return done()
      })
    })

    it('should have basic files', function () {
      const currentFiles = readdirSync(ctx.dir)
      const { files } = ctx

      notStrictEqual(files.indexOf('bin/www'), -1, 'should have bin/www file')
      notStrictEqual(files.indexOf('app.js'), -1, 'should have app.js file')
      notStrictEqual(files.indexOf('package.json'), -1, 'should have package.json file')
      notStrictEqual(currentFiles.indexOf('package-lock.json'), -1, 'should have package-lock.json file')
      notStrictEqual(currentFiles.indexOf('.git'), -1, 'should have .git folder')
      notStrictEqual(currentFiles.indexOf('node_modules'), -1, 'should have node_modules folder')
    })

    it('should show messages about installation', function (done) {
        ok(/ instalando dependências do NPM/.test(output))
        ok(/ inicializando repositório Git/.test(output))
        ok(/ adicionando arquivos ao Git/.test(output))
        ok(/ fazendo primeiro commit dos arquivos/.test(output))
        ok(/ Instalação concluída!/.test(output))

        return done()
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
