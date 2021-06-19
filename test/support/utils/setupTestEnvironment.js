const { join } = require('path')
const { mkdirp, remove } = require('fs-extra')

const { TEMP_DIR } = require('../consts')

function setupTestEnvironment (name) {
  const ctx = {}

  before('create environment', done => {
    ctx.dir = join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    remove(ctx.dir, done)
  })

  return ctx
}

module.exports = setupTestEnvironment
