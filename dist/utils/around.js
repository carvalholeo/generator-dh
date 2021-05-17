'use strict'; // @ts-check

/**
 * Install an around function; AOP.
 * @param {object} obj Commander instance to be used.
 * @param {string} method Name of the method to be apllied
 * @param {function} fn Callback to be called when function finish
 * @return {void}
 */

function around(obj, method, fn) {
  var old = obj[method];

  obj[method] = function () {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    return fn.call(this, old, args);
  };
}

module.exports = around;