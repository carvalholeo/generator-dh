const { resolve, relative } = require('path')
const RE = require('re2')

function parseCreatedFiles (output, dir) {
  const files = []
  const lines = output.split(/[\r\n]+/)
  let match

  for (let i = 0; i < lines.length; i++) {
    const sanitized = new RE(/create.*?: (.*)$/)
    match = sanitized.exec(lines[i])
    if (match) {
      let file = match[1]

      if (dir) {
        file = resolve(dir, file)
        file = relative(dir, file)
      }

      file = file.replace(/\\/g, '/')
      files.push(file)
    }
  }

  return files
}

module.exports = parseCreatedFiles
