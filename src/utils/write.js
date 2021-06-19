const { writeFileSync } = require('fs-extra')

const { MODE_0666 } = require('./consts')

/**
 * echo str > file.
 * Used to show what and where files were created.
 * @param {String} file Pathname were data will be write
 * @param {String} str File to be created
 * @param {Number} mode Mode of the file, used to permission filesystem in Linux
 * @return {void}
 */
function write (file, str, mode) {
  writeFileSync(file, str, { mode: mode || MODE_0666 })
  console.log(`   \x1b[36mcreate\x1b[0m : ${file}`)
}

module.exports = write
