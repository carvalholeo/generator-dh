const path = require('path')
const utils = require('./utils')

const PKG_PATH = path.resolve(__dirname, '..', '..', 'package.json')

const TEMP_DIR = utils.tmpDir()
const BIN_PATH = path.resolve(path.dirname(PKG_PATH), require(PKG_PATH).bin['express-dh'])
const APP_START_STOP_TIMEOUT = 10000
const NPM_INSTALL_TIMEOUT = 300000 // 5 minutes

module.exports = {
  BIN_PATH,
  TEMP_DIR,
  APP_START_STOP_TIMEOUT,
  NPM_INSTALL_TIMEOUT
}
