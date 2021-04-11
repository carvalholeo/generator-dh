/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
  const old = obj[method]

  obj[method] = function () {
    fn.call(this)
    old.apply(this, arguments)
  }
}

module.exports = before
