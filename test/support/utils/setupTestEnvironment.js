const { join } = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const { TEMP_DIR } = require('../consts')

function setupTestEnvironment (name) {
  const ctx = {}

  before('create environment', done => {
    ctx.dir = join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    rimraf(ctx.dir, done)
  })

  return ctx
}

module.exports = setupTestEnvironment
