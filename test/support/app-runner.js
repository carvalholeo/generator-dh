'use strict'

const exec = require('child_process').exec
const kill = require('tree-kill')
const { connect } = require('net')
const childEnvironment = require('./utils/childEnvironment')

class AppRunner {
  constructor (dir) {
    this.child = null
    this.dir = dir
    this.host = '127.0.0.1'
    this.port = 3000
  }

  address () {
    return { port: this.port }
  }

  start (callback) {
    const app = this
    let done = false
    const env = childEnvironment()

    env.PORT = String(app.port)

    this.child = exec('npm start', {
      cwd: this.dir,
      env: env
    })

    this.child.stderr.pipe(process.stderr, { end: false })

    this.child.on('exit', function onExit (code) {
      app.child = null

      if (!done) {
        done = true
        callback(new Error(`Unexpected app exit with code ${code}`))
      }
    })

    function tryConnect () {
      if (done || !app.child) {
        return
      }
      const socket = connect(app.port, app.host)

      socket.on('connect', function onConnect () {
        socket.end()

        if (!done) {
          done = true
          callback(null)
        }
      })

      socket.on('error', function onError (err) {
        socket.destroy()

        if (err.syscall !== 'connect') {
          return callback(err)
        }

        setImmediate(tryConnect)
      })
    }

    setImmediate(tryConnect)
  }

  stop (callback) {
    if (!this.child) {
      setImmediate(callback)
      return
    }

    this.child.stderr.unpipe()
    this.child.removeAllListeners('exit')

    kill(this.child.pid, 'SIGTERM', callback)

    this.child = null
  }
}

module.exports = AppRunner
