const { basename } = require('path')

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 * @param {String} pathName Path name of the application
 * @return {string} Return a string sanitized for the app name provided
 */
function createAppName (pathName) {
  const sanitized = new RegExp(/^[-_.]+|-+$/g)
  return basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(sanitized, '')
    .toLowerCase()
}

module.exports = createAppName
