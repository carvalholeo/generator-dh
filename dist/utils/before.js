"use strict";

/**
 * Install a before function; AOP.
 * @param {object} obj Commander instance to be used.
 * @param {string} method Name of the method to be apllied
 * @param {function} fn Callback to be called when function finish
 * @return {void}
 */
function before(obj, method, fn) {
  var old = obj[method];

  obj[method] = function () {
    fn.call(this);
    old.apply(this, arguments);
  };
}

module.exports = before;