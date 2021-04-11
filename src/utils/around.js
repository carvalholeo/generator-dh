/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  const old = obj[method]

  obj[method] = function () {
    const args = new Array(arguments.length)
    for (let i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    return fn.call(this, old, args)
  }
}

module.exports = around
