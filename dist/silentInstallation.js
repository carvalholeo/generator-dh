"use strict";

var _require = require("child_process"),
    exec = _require.exec,
    execSync = _require.execSync;
/**
 * Function to execute a silent installation of the app
 * @param {string} directory Directory to enter and make the install
 * @return {void} This function doesn't return anything
 */


function silentInstallation(directory) {
  var options = {
    cwd: directory,
    windowsHide: true,
    stdio: ['ignore', 'ignore', 'ignore']
  };
  var command = 'npm';
  var args = ['install', '--save', '--save-exact', '--loglevel', 'error'].toString().replace(/,/g, ' ');
  var updateArg = ['update', '--save', '--save-exact', '--loglevel', 'error'].toString().replace(/,/g, ' ');
  var npm = "".concat(command, " ").concat(args);
  var update = "".concat(command, " ").concat(updateArg);
  var initGit = 'git init -q -b main';
  var addFilesToGit = 'git add --all';
  var commitFiles = 'git commit -m "Primeiro commit"';
  exec('dir', options, function (error) {
    if (error) {
      throw new Error(error);
    }

    console.log();

    try {
      console.log("   \x1B[36ma\xE7\xE3o \x1B[0m: instalando depend\xEAncias do NPM");
      execSync(npm, options);
      execSync(update, options);
      console.log("   \x1B[36ma\xE7\xE3o \x1B[0m: inicializando reposit\xF3rio Git");
      execSync(initGit, options);
      console.log("   \x1B[36ma\xE7\xE3o \x1B[0m: adicionando arquivos ao Git");
      execSync(addFilesToGit, options);
      console.log("   \x1B[36ma\xE7\xE3o \x1B[0m: fazendo primeiro commit dos arquivos");
      execSync(commitFiles, options);
      console.log();
      console.log("  \x1B[36m Instala\xE7\xE3o conclu\xEDda! \x1B[0m");
    } catch (e) {
      console.error();
      console.error();
      console.error("Erro durante a tentativa de fazer instala\xE7\xE3o silenciosa.\nProvavelmente, um dos seguintes cen\xE1rios aconteceram:\n    1. o diret\xF3rio tem um reposit\xF3rio Git inicializado\n    2. o Git n\xE3o foi configurado corretamente (veja o manual do Git, em especial sobre o 'git config')\n    3. voc\xEA n\xE3o possui as permiss\xF5es para criar arquivos ou falta espa\xE7o no disco\n    4. o NPM n\xE3o consegui se conectar ao servidor para baixar as depend\xEAncias.\n\nPor favor, execute uma instala\xE7\xE3o comum e verifique se o erro persiste.\n\nAdicionalmente, verifique qual a a\xE7\xE3o executada antes do erro aparecer no console e considere a possibilidade de criar uma issue no repo do projeto no GitHub.");
    }
  });
}

module.exports = silentInstallation;