/**
 * Determine if launched from cmd.exe
 * @return {Boolean} Return true if the process were lauched from PowerShell or Windows CMD
 */
function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

module.exports = launchedFromCmd
