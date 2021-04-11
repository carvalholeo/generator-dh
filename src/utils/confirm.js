const { createInterface } = require('readline')

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, input => {
    rl.close()
    callback(/^y|yes|ok|true|s|sim|aceito|vai$/i.test(input))
  })
}

module.exports = confirm
