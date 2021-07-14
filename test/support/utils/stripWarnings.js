function stripWarnings (str) {
  const sanitized = new RegExp(/\n(?:\x20{2}warning: [^\n]+\n{2})/g)
  return str.replace(sanitized, '')
}

module.exports = stripWarnings
