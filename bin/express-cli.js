#!/usr/bin/env node
const { program } = require('commander')
const sortedObject = require('sorted-object')
const { join, resolve, sep } = require('path')
const {
  mkdirpSync,
  readFileSync,
  readdirSync
} = require('fs-extra')
const { filter } = require('minimatch')
const { inspect } = require('util')
const ejs = require('ejs')

const around = require('../dist/utils/around')
const before = require('../dist/utils/before')
const confirm = require('../dist/utils/confirm')
const write = require('../dist/utils/write')
const createAppName = require('../dist/utils/createAppName')
const emptyDirectory = require('../dist/utils/emptyDirectory')
const launchedFromCmd = require('../dist/utils/launchedFromCmd')
const renamedOption = require('../dist/utils/renamedOption')

const silentInstallation = require('../dist/silentInstallation')

const exit = process.exit

const {
  MODE_0755,
  VERSION,
  TEMPLATE_DIR
} = require('../dist/utils/consts')

// CLI

around(program, 'optionMissingArgument', function (fn, args) {
  program.outputHelp()
  fn.apply(this, args)
  return { args: [], unknown: [] }
})

before(program, 'outputHelp', function () {
  // track if help was shown for unknown option
  this._helpShown = true
})

before(program, 'unknownOption', function () {
  // allow unknown options if help was shown, to prevent trailing error
  this._allowUnknownOption = this._helpShown

  // show help if not yet shown
  if (!this._helpShown) {
    program.outputHelp()
  }
})

program
  .storeOptionsAsProperties()
  .name('express-dh')
  .version(VERSION, '    --version')
  .usage('[opcoes] [dir]')
  .option('-i, --integrador', 'adiciona os pacotes usados no projeto integrador')
  .option('-e, --ejs', 'adiciona suporte à engine EJS', renamedOption('--ejs', '--view=ejs'))
  .option('    --pug', 'adiciona suporte à engine PUG', renamedOption('--pug', '--view=pug'))
  .option('    --hbs', 'adiciona suporte à engine Handlebars', renamedOption('--hbs', '--view=hbs'))
  .option('-H, --hogan', 'adiciona suporte à engine Hogan.js', renamedOption('--hogan', '--view=hogan'))
  .option('-v, --view <engine>', 'adiciona suporte à engine <engine> (dust|ejs|hbs|hjs|jade|pug|twig|vash) (o padrão é PUG)')
  .option('    --no-view', 'usa HTML estático ao invés de template engine')
  .option('-c, --css <engine>', 'adiciona suporte à engine CSS <engine> (less|stylus|compass|sass) (o padrão é CSS puro, texto plano)')
  .option('    --git', 'adiciona .gitignore')
  .option('    --dotenv', 'adiciona o pacote dotenv, para trabalhar com variáveis de ambiente. Chama automaticamente --git')
  .option('-s, --silent', 'executa instalação silenciosa (entra no diretório, instala as dependências e faz o primeiro commit)')
  .option('-a, --api', 'usar um template de web api sem uma view engine')
  .option('-f, --force', 'força a criação em diretórios não-vazios')
  .parse(process.argv)

if (typeof program.view === 'undefined') {
  program.view = true
}

main()

/**
 * Create application at the given directory.
 *
 * @param {string} name Name of the application
 * @param {string} dir Directory where the app files will be put.
 * @return {void}
 */
function createApplication (name, dir) {
  console.log()

  // Package
  const pkg = {
    name: name,
    version: '0.0.0',
    private: true,
    scripts: {
      start: 'node ./bin/www'
    },
    dependencies: {
      debug: '~4.3.1',
      express: '~4.17.1'
    },
    devDependencies: {

    }
  }

  // JavaScript
  const app = loadTemplate('js/app.js')
  const www = loadTemplate('js/www')

  // App name
  www.locals.name = name

  // App modules
  app.locals.localModules = Object.create(null)
  app.locals.modules = Object.create(null)
  app.locals.mounts = []
  app.locals.uses = []
  app.locals.dotenv = false

  // Request logger
  app.locals.modules.logger = 'morgan'
  app.locals.uses.push("logger('dev')")
  pkg.dependencies.morgan = '~1.10.0'

  // Body parsers
  app.locals.uses.push('express.json()')
  app.locals.uses.push('express.urlencoded({ extended: false })')

  // Cookie parser
  app.locals.modules.cookieParser = 'cookie-parser'
  app.locals.uses.push('cookieParser()')
  pkg.dependencies['cookie-parser'] = '~1.4.5'

  if (dir !== '.') {
    mkdir(dir, '.')
  }

  mkdir(dir, 'public')
  mkdir(dir, 'public/javascripts')
  mkdir(dir, 'public/images')
  mkdir(dir, 'public/stylesheets')

  if (program.integrador) {
    // Adiciona dependências de produção
    pkg.dependencies['express-session'] = '~1.17.1'
    pkg.dependencies['express-validator'] = '~6.10.0'
    pkg.dependencies['method-override'] = '~3.0.0'
    pkg.dependencies.sequelize = '~6.6.2'
    pkg.dependencies.mysql2 = '~2.2.5'
    pkg.dependencies.mariadb = '~2.5.3'
    pkg.dependencies.axios = '~0.21.1'
    pkg.dependencies.bcrypt = '~5.0.1'
    pkg.dependencies.multer = '~1.4.2'

    // Adiciona dependências de desenvolvimento
    pkg.devDependencies.nodemon = '~2.0.7'
    pkg.devDependencies['sequelize-cli'] = '~6.2.0'

    // Adiciona configuração do express-session
    app.locals.modules.session = 'express-session'
    app.locals.uses.push(`session({
  secret: 'senha super secreta',
  resave: true,
  saveUninitialized: true,
})`)

    // Adiciona configuração do method-override
    app.locals.modules.methodOverride = 'method-override'
    app.locals.uses.push('methodOverride("_method")')

    // Adiciona configurações no package.json
    pkg.scripts.dev = 'npx nodemon ./bin/www'

    // Adiciona configuração de .gitignore e de EJS
    program.git = true
    program.view = 'ejs'
  }

  if (program.dotenv) {
    program.git = true
    app.locals.dotenv = true
    pkg.dependencies.dotenv = '~8.2.0'
    copyTemplate('js/env', join(dir, '.env'))
    copyTemplate('js/env.example', join(dir, '.env.example'))
  }

  if (program.silent) {
    program.git = true
  }

  // copy css templates
  const stylesheetDirectory = `${dir}/public/stylesheets`
  switch (program.css) {
    case 'less':
      copyTemplateMulti('css', stylesheetDirectory, '*.less')
      break
    case 'stylus':
      copyTemplateMulti('css', stylesheetDirectory, '*.styl')
      break
    case 'compass':
      copyTemplateMulti('css', stylesheetDirectory, '*.scss')
      break
    case 'sass':
      copyTemplateMulti('css', stylesheetDirectory, '*.sass')
      break
    default:
      copyTemplateMulti('css', stylesheetDirectory, '*.css')
      break
  }

  // copy route templates
  mkdir(dir, 'routes')
  if (program.api) {
    copyTemplateMulti('js/routes/api', `${dir}/routes`, '*.js')
  } else {
    copyTemplateMulti('js/routes', `${dir}/routes`, '*.js')
  }

  if (program.view) {
    // Copy view templates
    mkdir(dir, 'views')
    pkg.dependencies['http-errors'] = '~1.8.0'
    const viewsDirectory = `${dir}/views`
    switch (program.view) {
      case 'dust':
        copyTemplateMulti('views', viewsDirectory, '*.dust')
        break
      case 'ejs':
        copyTemplateMulti('views', viewsDirectory, '*.ejs')
        break
      case 'hbs':
        copyTemplateMulti('views', viewsDirectory, '*.hbs')
        break
      case 'hjs':
        copyTemplateMulti('views', viewsDirectory, '*.hjs')
        break
      case 'pug':
        copyTemplateMulti('views', viewsDirectory, '*.pug')
        break
      case 'twig':
        copyTemplateMulti('views', viewsDirectory, '*.twig')
        break
      case 'vash':
        copyTemplateMulti('views', viewsDirectory, '*.vash')
        break
    }
  } else if (program.api) {
    pkg.dependencies['http-errors'] = '~1.8.0'
    pkg.dependencies['express-validator'] = '~6.10.0'
    pkg.dependencies.jsonwebtoken = '^8.5.1'
    pkg.dependencies.helmet = '^4.4.1'
    pkg.dependencies.cors = '^2.8.5'
  } else {
    // Copy extra public files
    copyTemplate('js/index.html', join(dir, 'public/index.html'))
  }

  // CSS Engine support
  switch (program.css) {
    case 'compass':
      app.locals.modules.compass = 'node-compass'
      app.locals.uses.push("compass({ mode: 'expanded' })")
      pkg.dependencies['node-compass'] = '0.2.4'
      break
    case 'less':
      app.locals.modules.lessMiddleware = 'less-middleware'
      app.locals.uses.push("lessMiddleware(path.join(__dirname, 'public'))")
      pkg.dependencies['less-middleware'] = '~3.1.0'
      break
    case 'sass':
      app.locals.modules.sassMiddleware = 'node-sass-middleware'
      app.locals.uses.push("sassMiddleware({\n  src: path.join(__dirname, 'public'),\n  dest: path.join(__dirname, 'public'),\n  indentedSyntax: true, // true = .sass and false = .scss\n  sourceMap: true\n})")
      pkg.dependencies['node-sass-middleware'] = '0.11.0'
      break
    case 'stylus':
      app.locals.modules.stylus = 'stylus'
      app.locals.uses.push("stylus.middleware(path.join(__dirname, 'public'))")
      pkg.dependencies.stylus = '0.54.8'
      break
  }

  if (program.api) {
    // Value router mount
    app.locals.localModules.apiRouter = './routes/values'
    app.locals.mounts.push({ path: '/api', code: 'apiRouter' })
  } else {
    // Index router mount
    app.locals.localModules.indexRouter = './routes/index'
    app.locals.mounts.push({ path: '/', code: 'indexRouter' })

    // User router mount
    app.locals.localModules.usersRouter = './routes/users'
    app.locals.mounts.push({ path: '/users', code: 'usersRouter' })
  }

  // Template support
  switch (program.view) {
    case 'dust':
      app.locals.modules.adaro = 'adaro'
      app.locals.view = {
        engine: 'dust',
        render: 'adaro.dust()'
      }
      pkg.dependencies.adaro = '~1.0.4'
      break
    case 'ejs':
      app.locals.view = { engine: 'ejs' }
      pkg.dependencies.ejs = '~3.1.6'
      break
    case 'hbs':
      app.locals.view = { engine: 'hbs' }
      pkg.dependencies.hbs = '~4.1.1'
      break
    case 'hjs':
      app.locals.view = { engine: 'hjs' }
      pkg.dependencies.hjs = '~0.0.6'
      break
    case 'pug':
      app.locals.view = { engine: 'pug' }
      pkg.dependencies.pug = '3.0.2'
      break
    case 'twig':
      app.locals.view = { engine: 'twig' }
      pkg.dependencies.twig = '~1.15.4'
      break
    case 'vash':
      app.locals.view = { engine: 'vash' }
      pkg.dependencies.vash = '~0.13.0'
      break
    default:
      app.locals.view = false
      break
  }

  app.locals.api = program.api

  // Static files
  app.locals.uses.push("express.static(path.join(__dirname, 'public'))")

  if (program.git) {
    copyTemplate('js/gitignore', join(dir, '.gitignore'))
  }

  // sort dependencies like npm(1)
  pkg.dependencies = sortedObject(pkg.dependencies)

  // write files
  write(join(dir, 'app.js'), app.render())
  write(join(dir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)
  mkdir(dir, 'bin')
  write(join(dir, 'bin/www'), www.render(), MODE_0755)

  const prompt = launchedFromCmd() ? '>' : '$'

  if (program.silent) {
    silentInstallation(dir)
  } else {
    if (dir !== '.') {
      console.log()
      console.log('   change directory:')
      console.log('     %s cd %s', prompt, dir)
    }

    console.log()
    console.log('   install dependencies:')
    console.log('     %s npm install', prompt)
    console.log()
    console.log('   run the app:')

    if (launchedFromCmd()) {
      console.log('     %s SET DEBUG=%s:* & npm start', prompt, name)
    } else {
      console.log('     %s DEBUG=%s:* npm start', prompt, name)
    }
  }

  console.log()
}

/**
 * Main program.
 * @return {void}
 */
function main () {
  // Path
  const destinationPath = program.args.shift() || '.'

  // App name
  const appName = createAppName(resolve(destinationPath)) || 'hello-world'

  // View engine
  if (program.view === true) {
    if (program.ejs) {
      program.view = 'ejs'
    }
    if (program.hbs) {
      program.view = 'hbs'
    }
    if (program.hogan) {
      program.view = 'hjs'
    }
    if (program.pug) {
      program.view = 'pug'
    }
  }

  // Default view engine
  if (program.view === true && !program.api) {
    program.view = 'pug'
  } else if (program.api) {
    program.view = false
  }

  // Generate application
  emptyDirectory(destinationPath, (empty) => {
    if (empty || program.force) {
      createApplication(appName, destinationPath)
    } else {
      confirm('a pasta destino não está vazio, deseja continuar? [s/N] ', (ok) => {
        if (ok) {
          process.stdin.destroy()
          createApplication(appName, destinationPath)
        } else {
          console.error('cancelando')
          exit(1)
        }
      })
    }
  })
}

/**
 * Copy file from template directory.
 * @param {string} from Directory where are the files to copied from.
 * @param {string} to Directory where are the files will be copied to.
 * @return {void}
 */
function copyTemplate (from, to) {
  write(to, readFileSync(join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Load template file.
 * @param {string} name Name of template to be load
 * @return {JSON} Returns an object with local params and render method
 */
function loadTemplate (name) {
  const contents = readFileSync(
    join(
      __dirname,
      '..',
      'templates',
      `${name}.ejs`
    ),
    'utf-8'
  )
  const locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals, {
      escape: inspect
    })
  }

  return {
    locals: locals,
    render: render
  }
}

/**
 * Copy multiple files from template directory.
 * @param {string} fromDir Directory where come the files
 * @param {string} toDir Directory where go the files
 * @param {string} nameGlob Pattern to use in array filter method
 * @return {void}
 */
function copyTemplateMulti (fromDir, toDir, nameGlob) {
  readdirSync(join(TEMPLATE_DIR, fromDir))
    .filter(filter(nameGlob, { matchBase: true }))
    .forEach(name => {
      copyTemplate(join(fromDir, name), join(toDir, name))
    })
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base Base directory
 * @param {string} dir Recursive directory
 * @return {void}
 */
function mkdir (base, dir) {
  const loc = join(base, dir)

  console.log(`   \x1b[36mcreate\x1b[0m : ${loc}${sep}`)
  mkdirpSync(loc, MODE_0755)
}
