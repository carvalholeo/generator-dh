const { createInterface } = require('readline')
const jsStringEscape = require('js-string-escape')

/**
 * Prompt for confirmation on STDOUT/STDIN
 * @param {string} msg Text to be prompted to user
 * @param {function} callback Function to be called when this function were finished
 * @return {void}
 */
function confirm (msg, callback) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, input => {
    rl.close()
    callback(/^y|yes|ok|true|s|sim|aceito|vai$/i.test(jsStringEscape(input)))
  })
}

module.exports = confirm
