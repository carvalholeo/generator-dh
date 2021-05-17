"use strict";

var _require = require('fs'),
    writeFileSync = _require.writeFileSync;

var _require2 = require('./consts'),
    MODE_0666 = _require2.MODE_0666;
/**
 * echo str > file.
 * Used to show what and where files were created.
 * @param {String} file Pathname were data will be write
 * @param {String} str File to be created
 * @param {Number} mode Mode of the file, used to permission filesystem in Linux
 * @return {void}
 */


function write(file, str, mode) {
  writeFileSync(file, str, {
    mode: mode || MODE_0666
  });
  console.log("   \x1B[36mcreate\x1B[0m : ".concat(file));
}

module.exports = write;