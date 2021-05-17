"use strict";

var _require = require('readline'),
    createInterface = _require.createInterface;

var jsStringEscape = require('js-string-escape');
/**
 * Prompt for confirmation on STDOUT/STDIN
 * @param {string} msg Text to be prompted to user
 * @param {function} callback Function to be called when this function were finished
 * @return {void}
 */


function confirm(msg, callback) {
  var rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true|s|sim|aceito|vai$/i.test(jsStringEscape(input)));
  });
}

module.exports = confirm;