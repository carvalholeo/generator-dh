const validateNpmName = require('validate-npm-package-name')
const { readFileSync, rm } = require('fs-extra')
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
    rm(TEMP_DIR, {
      force: true,
      recursive: true
    })
      .then(() => done())
      .catch(error => done(error))
  })

})
