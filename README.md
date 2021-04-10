# Express Generator DH

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" width="50%" height="auto" alt="Logo do Framework Express"/>
    <p style="display: inline-block; padding: 10px; font-size: 1.5rem;">+</p>
    <img src="https://www.digitalhouse.com/ar/logo-DH.png" width="50%" alt="Logo da Digital House" style="background-color: #fff"/>
</div>

Gerador de aplicações [Express](https://www.npmjs.com/package/express), focado nas necessidades dos alunos da [Digital House](https://www.digitalhouse.com/br).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
Linux [![Linux Build][travis-image]][travis-url]
Windows [![Windows Build][appveyor-image]][appveyor-url]

## Instalação

```sh
$ npm install -g express-generator-dh
// Isto vai instalar o express-generator-dh de forma global na sua máquina
```

## Início Rápido

O caminho mais rápido para começar um projeto express é usar o executável `express-dh(1)`, para gerar uma aplicação, como mostraremos abaixo:

Criar o app:

```bash
$ express-dh --view=ejs meuProjeto
// Isto irá criar uma pasta, chamada 'meuProjeto', com suporte à EJS
```

Entrar na pasta deste projeto:

```bash
$ cd meuProjeto
// Isto faz o terminal entrar na pasta criada
```

Instalar as dependências:

```bash
$ npm install
// Faz a instalação das dependências do Express e outros pacotes
```

Iniciar seu app Express.js, no endereço `http://localhost:3000/`:

```bash
$ npm start
// Inicia o servidor para os primeiros testes
```

## Opções da Linha de Comando

Este gerador também pode ser configurado com as seguintes opções da linha de comando.

        --version        exibe a versão do gerador
    -i, --integrador     adiciona os pacotes usados no projeto integrador
    -e, --ejs            adiciona suporte à engine EJS
        --pug            adiciona suporte à engine PUG
        --hbs            adiciona suporte à engine Handlebars
    -H, --hogan          adiciona suporte à engine Hogan.js
    -v, --view <engine>  adiciona suporte à engine <engine> (dust|ejs|hbs|hjs|jade|pug|twig|vash) (o padrão é PUG)
        --no-view        usa HTML estático ao invés de template engine
    -c, --css <engine>   adiciona suporte à engine CSS <engine> (less|stylus|compass|sass) (o padrão é CSS puro, texto plano)
        --git            adiciona .gitignore
    -f, --force          força a criação em diretórios não-vazios
    -h, --help           exibe informações de uso e ajuda

## Licença

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-generator-dh.svg
[npm-url]: https://npmjs.org/package/express-generator-dh
[travis-image]: https://travis-ci.com/carvalholeo/generator-dh.svg?branch=main
[travis-url]: https://travis-ci.com/carvalholeo/generator-dh
[appveyor-image]: https://img.shields.io/appveyor/build/carvalholeo/generator-dh?label=windows
[appveyor-url]: https://ci.appveyor.com/project/carvalholeo/generator-dh
[downloads-image]: https://img.shields.io/npm/dm/express-generator-dh
[downloads-url]: https://www.npmjs.com/package/express-generator-dh
