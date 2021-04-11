/**
 * Display a warning similar to how errors are displayed by commander.
 *
 * @param {String} message
 */

function warning (message) {
  console.error()
  message.split('\n').forEach(line => {
    console.error('  warning: %s', line)
  })
  console.error()
}

module.exports = warning
