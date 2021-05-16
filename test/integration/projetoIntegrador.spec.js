const rimraf = require('rimraf')
const {
  strictEqual,
  notStrictEqual,
  ok
} = require('assert')
const { resolve } = require('path')
const { readFileSync } = require('fs')

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

  describe('--integrador, -i', function () {
    const ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with ejs templates', function (done) {
      run(ctx.dir, ['--integrador'], function (err, stdout) {
        if (err) {
          return done(err)
        }
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
        strictEqual(ctx.files.length, 16, 'should have 16 files')
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

    it('should have .gitignore', function () {
      notStrictEqual(ctx.files.indexOf('.gitignore'), -1, 'should have .gitignore file')
    })

    it('should have sequelize in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.sequelize === 'string')
    })

    it('should have mysql2 in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.mysql2 === 'string')
    })

    it('should have mariadb in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.mariadb === 'string')
    })

    it('should have axios in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.axios === 'string')
    })

    it('should have bcrypt in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.bcrypt === 'string')
    })

    it('should have multer in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies.multer === 'string')
    })

    it('should have express-session in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies['express-session'] === 'string')
    })

    it('should have express-validator in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies['express-validator'] === 'string')
    })

    it('should have method-override in package dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).dependencies
      ok(typeof dependencies['method-override'] === 'string')
    })

    it('should have sequelize-cli in package dev dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).devDependencies
      ok(typeof dependencies['sequelize-cli'] === 'string')
    })

    it('should have nodemon in package dev dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const dependencies = JSON.parse(contents).devDependencies
      ok(typeof dependencies.nodemon === 'string')
    })

    it('should have npx start in package dev dependencies', function () {
      const file = resolve(ctx.dir, 'package.json')
      const contents = readFileSync(file, 'utf8')
      const scripts = JSON.parse(contents).scripts
      ok(typeof scripts.dev === 'string')
    })
  })

})
