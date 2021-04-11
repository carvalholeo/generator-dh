function stripWarnings (str) {
  return str.replace(/\n(?:\x20{2}warning: [^\n]+\n)+\n/g, '')
}

module.exports = stripWarnings
