#!/usr/bin/env node

const ejs = require('ejs')
const fs = require('fs')
const minimatch = require('minimatch')
const mkdirp = require('mkdirp')
const path = require('path')
const program = require('commander')
const readline = require('readline')
const sortedObject = require('sorted-object')
const util = require('util')

const MODE_0666 = parseInt('0666', 8)
const MODE_0755 = parseInt('0755', 8)
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')
const VERSION = require('../package').version

const _exit = process.exit

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit

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
  .name('express-dh')
  .version(VERSION, '    --version')
  .usage('[options] [dir]')
  .option('-i, --integrador', 'adiciona os pacotes usados no projeto integrador')
  .option('-e, --ejs', 'adiciona suporte à engine EJS', renamedOption('--ejs', '--view=ejs'))
  .option('    --pug', 'adiciona suporte à engine PUG', renamedOption('--pug', '--view=pug'))
  .option('    --hbs', 'adiciona suporte à engine Handlebars', renamedOption('--hbs', '--view=hbs'))
  .option('-H, --hogan', 'adiciona suporte à engine Hogan.js', renamedOption('--hogan', '--view=hogan'))
  .option('-v, --view <engine>', 'adiciona suporte à engine <engine> (dust|ejs|hbs|hjs|jade|pug|twig|vash) (o padrão é PUG)')
  .option('    --no-view', 'usa HTML estático ao invés de template engine')
  .option('-c, --css <engine>', 'adiciona suporte à engine CSS <engine> (less|stylus|compass|sass) (o padrão é CSS puro, texto plano)')
  .option('    --git', 'adiciona .gitignore')
  .option('-f, --force', 'força a criação em diretórios não-vazios')
  .parse(process.argv)

if (!exit.exited) {
  main()
}

/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  const old = obj[method]

  obj[method] = function () {
    const args = new Array(arguments.length)
    for (let i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    return fn.call(this, old, args)
  }
}

/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
  const old = obj[method]

  obj[method] = function () {
    fn.call(this)
    old.apply(this, arguments)
  }
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    callback(/^y|yes|ok|true|s|sim|aceito|vai$/i.test(input))
  })
}

/**
 * Copy file from template directory.
 */

function copyTemplate (from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti (fromDir, toDir, nameGlob) {
  fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
    .filter(minimatch.filter(nameGlob, { matchBase: true }))
    .forEach(function (name) {
      copyTemplate(path.join(fromDir, name), path.join(toDir, name))
    })
}

/**
 * Create application at the given directory.
 *
 * @param {string} name
 * @param {string} dir
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
      resave: false,
      saveUninitialized: true,
    })`)

    // Adiciona configuração do method-override
    app.locals.modules.methodOverride = 'method-override'
    app.locals.uses.push('methodOverride("_method")')

    // Adiciona configurações no package.json
    pkg.scripts.dev = 'npx nodemon ./bin/www'

    // Adiciona configuração de .gitignore
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
  copyTemplateMulti('js/routes', `${dir}/routes`, '*.js')

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
  } else {
    // Copy extra public files
    copyTemplate('js/index.html', path.join(dir, 'public/index.html'))
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

  // Index router mount
  app.locals.localModules.indexRouter = './routes/index'
  app.locals.mounts.push({ path: '/', code: 'indexRouter' })

  // User router mount
  app.locals.localModules.usersRouter = './routes/users'
  app.locals.mounts.push({ path: '/users', code: 'usersRouter' })

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

  // Static files
  app.locals.uses.push("express.static(path.join(__dirname, 'public'))")

  if (program.git) {
    copyTemplate('js/gitignore', path.join(dir, '.gitignore'))
  }

  // sort dependencies like npm(1)
  pkg.dependencies = sortedObject(pkg.dependencies)

  // write files
  write(path.join(dir, 'app.js'), app.render())
  write(path.join(dir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)
  mkdir(dir, 'bin')
  write(path.join(dir, 'bin/www'), www.render(), MODE_0755)

  const prompt = launchedFromCmd() ? '>' : '$'

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

  console.log()
}

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */

function createAppName (pathName) {
  return path.basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

/**
 * Check if the given directory `dir` is empty.
 *
 * @param {String} dir
 * @param {Function} fn
 */

function emptyDirectory (dir, fn) {
  fs.readdir(dir, function (err, files) {
    if (err && err.code !== 'ENOENT') {
      throw err
    }
    fn(!files || !files.length)
  })
}

/**
 * Graceful exit for async STDIO
 */

function exit (code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done () {
    if (!(draining--)) {
      _exit(code)
    }
  }

  let draining = 0
  const streams = [process.stdout, process.stderr]

  exit.exited = true

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1
    stream.write('', done)
  })

  done()
}

/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

/**
 * Load template file.
 */

function loadTemplate (name) {
  const contents = fs.readFileSync(
    path.join(__dirname,
      '..',
      'templates',
      `${name}.ejs`
    ),
    'utf-8'
  )
  const locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals, {
      escape: util.inspect
    })
  }

  return {
    locals: locals,
    render: render
  }
}

/**
 * Main program.
 */

function main () {
  // Path
  const destinationPath = program.args.shift() || '.'

  // App name
  const appName = createAppName(path.resolve(destinationPath)) || 'hello-world'

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
  if (program.view === true) {
    program.view = 'pug'
  }

  // Generate application
  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createApplication(appName, destinationPath)
    } else {
      confirm('pasta destino não está vazio, deseja continuar? [s/N] ', function (ok) {
        if (ok) {
          process.stdin.destroy()
          createApplication(appName, destinationPath)
        } else {
          console.error('aborting')
          exit(1)
        }
      })
    }
  })
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

function mkdir (base, dir) {
  const loc = path.join(base, dir)

  console.log(`   \x1b[36mcreate\x1b[0m : ${loc}${path.sep}`)
  mkdirp.sync(loc, MODE_0755)
}

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName
 * @param {String} newName
 */

function renamedOption (originalName, newName) {
  return function (val) {
    warning(util.format("option `%s' has been renamed to `%s'", originalName, newName))
    return val
  }
}

/**
 * Display a warning similar to how errors are displayed by commander.
 *
 * @param {String} message
 */

function warning (message) {
  console.error()
  message.split('\n').forEach(function (line) {
    console.error('  warning: %s', line)
  })
  console.error()
}

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

function write (file, str, mode) {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
  console.log(`   \x1b[36mcreate\x1b[0m : ${file}`)
}
