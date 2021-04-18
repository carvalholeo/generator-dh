const RE = require('re2')

function stripWarnings (str) {
  const sanitized = new RE(/\n(?:\x20{2}warning: [^\n]+\n)+\n/g)
  return str.replace(sanitized, '')
}

module.exports = stripWarnings
