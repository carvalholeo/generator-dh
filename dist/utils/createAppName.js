"use strict";

var _require = require('path'),
    basename = _require.basename;

var RE = require('re2');
/**
 * Create an app name from a directory path, fitting npm naming requirements.
 * @param {String} pathName Path name of the application
 * @return {string} Return a string sanitized for the app name provided
 */


function createAppName(pathName) {
  var sanitized = new RE(/^[-_.]+|-+$/g);
  return basename(pathName).replace(/[^A-Za-z0-9.-]+/g, '-').replace(sanitized, '').toLowerCase();
}

module.exports = createAppName;