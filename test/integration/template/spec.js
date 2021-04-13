const rimraf = require('rimraf')
const validateNpmName = require('validate-npm-package-name')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const request = require('supertest')
const {
  strictEqual,
  notStrictEqual,
  ok
} = require('assert')

const AppRunner = require('../../support/app-runner')
const {
  setupTestEnvironment,
  runRaw,
  parseCreatedFiles,
  npmInstall,
  run
} = require('../../support/utils')

const {
  APP_START_STOP_TIMEOUT,
  NPM_INSTALL_TIMEOUT,
  TEMP_DIR
} = require('../../support/consts')

describe('express-dh(1)', function () {
  after(function (done) {
    this.timeout(60000)
    rimraf(TEMP_DIR, done)
  })

})
