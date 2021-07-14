const { resolve, relative } = require('path')

function parseCreatedFiles (output, dir) {
  const files = []
  const lines = output.split(/[\r\n]+/)
  let match

  lines.forEach(line => {
    const sanitized = new RegExp(/create.*?: (.*)$/)
    match = sanitized.exec(line)
    if (match) {
      let file = match[1]

      if (dir) {
        file = resolve(dir, file)
        file = relative(dir, file)
      }

      file = file.replace(/\\/g, '/')
      files.push(file)
    }
  })
  return files
}

module.exports = parseCreatedFiles
