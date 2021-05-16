const { exec, execSync } = require("child_process")

/**
 * Function to execute a silent installation of the app
 * @param {string} directory Directory to enter and make the install
 * @return {void} This function doesn't return anything
 */
function silentInstallation (directory) {
  const options = {
    cwd: directory,
    windowsHide: true,
    stdio: ['ignore', 'ignore', 'ignore']
  }

  const command = 'npm'
  const args = [
    'install',
    '--save',
    '--save-exact',
    '--loglevel',
    'error'
  ]
    .toString()
    .replace(/,/g, ' ')

  const updateArg = [
    'update',
    '--save',
    '--save-exact',
    '--loglevel',
    'error'
  ]
    .toString()
    .replace(/,/g, ' ')

  const npm = `${command} ${args}`
  const update = `${command} ${updateArg}`
  const initGit = 'git init -q -b main'
  const addFilesToGit = 'git add --all'
  const commitFiles = 'git commit -m "Primeiro commit"'

  exec('dir', options, (error) => {
    if (error) {
      throw new Error(error)
    }

    console.log()

    try {
      console.log(`   \x1b[36mação \x1b[0m: instalando dependências do NPM`)
      execSync(npm, options)
      execSync(update, options)

      console.log(`   \x1b[36mação \x1b[0m: inicializando repositório Git`)
      execSync(initGit, options)

      console.log(`   \x1b[36mação \x1b[0m: adicionando arquivos ao Git`)
      execSync(addFilesToGit, options)

      console.log(`   \x1b[36mação \x1b[0m: fazendo primeiro commit dos arquivos`)
      execSync(commitFiles, options)

      console.log()
      console.log(`  \x1b[36m Instalação concluída! \x1b[0m`)

    } catch (e) {
      console.error()
      console.error()
      console.error(`Erro durante a tentativa de fazer instalação silenciosa.
Provavelmente, um dos seguintes cenários aconteceram:
    1. o diretório tem um repositório Git inicializado
    2. o Git não foi configurado corretamente (veja o manual do Git, em especial sobre o 'git config')
    3. você não possui as permissões para criar arquivos ou falta espaço no disco
    4. o NPM não consegui se conectar ao servidor para baixar as dependências.

Por favor, execute uma instalação comum e verifique se o erro persiste.

Adicionalmente, verifique qual a ação executada antes do erro aparecer no console e considere a possibilidade de criar uma issue no repo do projeto no GitHub.`)
    }
  })
}

module.exports = silentInstallation
