"use strict";

var _require = require('path'),
    join = _require.join;

var MODE_0666 = parseInt('0666', 8);
var MODE_0755 = parseInt('0755', 8);
var TEMPLATE_DIR = join(__dirname, '..', '..', 'templates');

var VERSION = require('../../package.json').version;

module.exports = {
  MODE_0666: MODE_0666,
  MODE_0755: MODE_0755,
  TEMPLATE_DIR: TEMPLATE_DIR,
  VERSION: VERSION
};