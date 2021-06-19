const { readdir } = require('fs-extra')
/**
 * Check if the given directory `dir` is empty.
 *
 * @param {String} dir Directory to be verified if is empty
 * @param {Function} fn Callback function called when this function were finished
 * @return {void}
 */
function emptyDirectory (dir, fn) {
  readdir(dir, function (err, files) {
    if (err && err.code !== 'ENOENT') {
      throw err
    }
    fn(!files || !files.length)
  })
}

module.exports = emptyDirectory
