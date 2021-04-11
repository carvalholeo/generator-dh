const { join } = require('path')

const MODE_0666 = parseInt('0666', 8)
const MODE_0755 = parseInt('0755', 8)
const TEMPLATE_DIR = join(__dirname, '..', '..', 'templates')
const VERSION = require('../../package.json').version

module.exports = {
  MODE_0666,
  MODE_0755,
  TEMPLATE_DIR,
  VERSION
}
