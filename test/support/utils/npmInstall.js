const { exec } = require('child_process')
const childEnvironment = require('./childEnvironment')

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

module.exports = npmInstall
