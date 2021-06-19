const validateNpmName = require('validate-npm-package-name')
const { readFileSync, remove } = require('fs-extra')
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
  runRaw,
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

  describe('(no args)', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app', function (done) {
      runRaw(ctx.dir, [], function (err, code, stdout, stderr) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        ctx.stderr = stderr
        ctx.stdout = stdout
        strictEqual(ctx.files.length, 16, 'should have 16 files')
        return done()
      })
    })

    it('should provide debug instructions', function () {
      ok(/DEBUG=express-dh-1-no-args:\* (?:& )?npm start/.test(ctx.stdout))
    })

    it('should have basic files', function () {
      notStrictEqual(ctx.files.indexOf('bin/www'), -1)
      notStrictEqual(ctx.files.indexOf('app.js'), -1)
      notStrictEqual(ctx.files.indexOf('package.json'), -1)
    })

    it('should have a package.json file', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      strictEqual(contents, '{\n' +
        '  "name": "express-dh-1-no-args",\n' +
        '  "version": "0.0.0",\n' +
        '  "private": true,\n' +
        '  "scripts": {\n' +
        '    "start": "node ./bin/www"\n' +
        '  },\n' +
        '  "dependencies": {\n' +
        '    "cookie-parser": "~1.4.5",\n' +
        '    "debug": "~4.3.1",\n' +
        '    "express": "~4.17.1",\n' +
        '    "http-errors": "~1.8.0",\n' +
        '    "morgan": "~1.10.0",\n' +
        '    "pug": "3.0.2"\n' +
        '  },\n' +
        '  "devDependencies": {}\n' +
        '}\n')
    })

    it('should have installable dependencies', function (done) {
      this.timeout(NPM_INSTALL_TIMEOUT)
      npmInstall(ctx.dir, done)
    })

    it('should export an express app from app.js', function () {
      const file = resolve(ctx.dir, 'app.js')
      const app = require(file)
      strictEqual(typeof app, 'function')
      strictEqual(typeof app.handle, 'function')
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

    describe('when directory contains spaces', function () {
      const ctx0 = setupTestEnvironment('foo bar (BAZ!)')

      it('should create basic app', function (done) {
        run(ctx0.dir, [], function (err, output) {
          if (err) {
            return done(err)
          }
          strictEqual(parseCreatedFiles(output, ctx0.dir).length, 16, 'should have 16 files')
          return done()
        })
      })

      it('should have a valid npm package name', function () {
        const file = resolve(ctx0.dir, 'package.json')
        const contents = readFileSync(file, 'utf8')
        const name = JSON.parse(contents).name
        ok(validateNpmName(name).validForNewPackages, `package name "${name}" is valid`)
        strictEqual(name, 'foo-bar-baz')
      })
    })

    describe('when directory is not a valid name', function () {
      const ctx1 = setupTestEnvironment('_')

      it('should create basic app', function (done) {
        run(ctx1.dir, [], function (err, output) {
          if (err) {
            return done(err)
          }
          strictEqual(parseCreatedFiles(output, ctx1.dir).length, 16, 'should have 16 files')
          return done()
        })
      })

      it('should default to name "hello-world"', function () {
        const file = resolve(ctx1.dir, 'package.json')
        const contents = readFileSync(file, 'utf8')
        const name = JSON.parse(contents).name
        ok(validateNpmName(name).validForNewPackages)
        strictEqual(name, 'hello-world')
      })
    })
  })
})
