const { format } = require('util')

const warning = require('./warning')

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName
 * @param {String} newName
 */

function renamedOption (originalName, newName) {
  return function (val) {
    warning(format("option `%s' has been renamed to `%s'", originalName, newName))
    return val
  }
}

module.exports = renamedOption
