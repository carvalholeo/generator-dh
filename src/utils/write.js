const { writeFileSync } = require('fs')

const { MODE_0666 } = require('./consts')

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

function write (file, str, mode) {
  writeFileSync(file, str, { mode: mode || MODE_0666 })
  console.log(`   \x1b[36mcreate\x1b[0m : ${file}`)
}

module.exports = write
