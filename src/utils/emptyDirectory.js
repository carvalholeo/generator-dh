const { readdir } = require('fs')
/**
 * Check if the given directory `dir` is empty.
 *
 * @param {String} dir
 * @param {Function} fn
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
