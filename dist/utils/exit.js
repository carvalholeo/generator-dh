"use strict";

var _exit = process.exit;
/**
 * Graceful exit for async STDIO
 * @param {Number} code Code of exit
 * @return {void}
 */

function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  var done = function done() {
    draining--;

    if (!draining) {
      _exit(code);
    }
  };

  var draining = 0;
  var streams = [process.stdout, process.stderr];
  exit.exited = true;
  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });
  done();
}

module.exports = exit;