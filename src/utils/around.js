/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  const old = obj[method]

  obj[method] = function () {
    const args = []
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    return fn.call(this, old, args)
  }
}

module.exports = around
