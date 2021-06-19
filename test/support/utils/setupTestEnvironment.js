const { join } = require('path')
const { mkdirp, rm } = require('fs-extra')

const { TEMP_DIR } = require('../consts')

function setupTestEnvironment (name) {
  const ctx = {}

  before('create environment', done => {
    ctx.dir = join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    rm(ctx.dir, {
      force: true,
      recursive: true
    })
      .then(() => done())
      .catch(error => done(error))
  })

  return ctx
}

module.exports = setupTestEnvironment
