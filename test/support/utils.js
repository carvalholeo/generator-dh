'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const uid = require('uid-safe')
const { exec, spawn } = require('child_process')
const assert = require('assert')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

function childEnvironment () {
  const env = Object.create(null)

  // copy the environment except for npm veriables
  for (const key in process.env) {
    if (key.substr(0, 4) !== 'npm_') {
      env[key] = process.env[key]
    }
  }

  return env
}

function parseCreatedFiles (output, dir) {
  const files = []
  const lines = output.split(/[\r\n]+/)
  let match

  for (let i = 0; i < lines.length; i++) {
    match = /create.*?: (.*)$/.exec(lines[i])
    if (match) {
      let file = match[1]

      if (dir) {
        file = path.resolve(dir, file)
        file = path.relative(dir, file)
      }

      file = file.replace(/\\/g, '/')
      files.push(file)
    }
  }

  return files
}

function stripColors (str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1b\[(\d+)m/g, '_color_$1_')
}

function stripWarnings (str) {
  return str.replace(/\n(?:\x20{2}warning: [^\n]+\n)+\n/g, '')
}

function tmpDir () {
  const dirname = path.join(os.tmpdir(), uid.sync(8))

  fs.mkdirSync(dirname, { mode: parseInt('0700', 8) })

  return dirname
}

function npmInstall (dir, callback) {
  const env = childEnvironment()

  exec('npm install', { cwd: dir, env: env }, function (err, stderr) {
    if (err) {
      err.message += stderr
      callback(err)
      return
    }

    callback()
  })
}

function run (dir, args, callback) {
  runRaw(dir, args, function (err, code, stdout, stderr) {
    if (err) {
      return callback(err)
    }

    process.stderr.write(stripWarnings(stderr))

    try {
      assert.strictEqual(stripWarnings(stderr), '')
      assert.strictEqual(code, 0)
    } catch (e) {
      return callback(e)
    }

    callback(null, stripColors(stdout))
  })
}

function runRaw (dir, args, callback) {
  const argv = [BIN_PATH].concat(args)
  const binp = process.argv[0]
  let stderr = ''
  let stdout = ''

  const child = spawn(binp, argv, {
    cwd: dir
  })

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', function ondata (str) {
    stdout += str
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', function ondata (str) {
    stderr += str
  })

  child.on('close', onclose)
  child.on('error', callback)

  function onclose (code) {
    callback(null, code, stdout, stderr)
  }
}

function setupTestEnvironment (name) {
  const ctx = {}

  before('create environment', function (done) {
    ctx.dir = path.join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    rimraf(ctx.dir, done)
  })

  return ctx
}

module.exports = {
  childEnvironment,
  parseCreatedFiles,
  stripColors,
  stripWarnings,
  tmpDir,
  npmInstall,
  run,
  runRaw,
  setupTestEnvironment
}

const {
  BIN_PATH,
  TEMP_DIR
} = require('./consts')
