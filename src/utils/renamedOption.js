const { format } = require('util')

const warning = require('./warning')

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName Name original of program option
 * @param {String} newName New name of program option
 * @return {void}
 */
function renamedOption (originalName, newName) {
  /**
   * Workaround to show only the correspondent message on user terminal
   * @return {void}
   */
  return () => {
    warning(format("option `%s' has been renamed to `%s'", originalName, newName))
  }
}

module.exports = renamedOption
