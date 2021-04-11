const { resolve, dirname } = require('path')
const tmpDir = require('./utils/tmpDir')

const PKG_PATH = resolve(__dirname, '..', '..', 'package.json')

const TEMP_DIR = tmpDir()
const BIN_PATH = resolve(dirname(PKG_PATH), require(PKG_PATH).bin['express-dh'])
const APP_START_STOP_TIMEOUT = 10000
const NPM_INSTALL_TIMEOUT = 300000 // 5 minutes
const TIME_SLEEP = 3000

module.exports = {
  BIN_PATH,
  TEMP_DIR,
  APP_START_STOP_TIMEOUT,
  NPM_INSTALL_TIMEOUT,
  TIME_SLEEP
}
