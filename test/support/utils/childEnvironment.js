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

module.exports = childEnvironment
