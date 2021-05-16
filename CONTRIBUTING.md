
# Express Generator DH

## Contibuindo com o projeto

:+1::tada: Antes de mais nada, muito obrigado por tirar um tempo para contribuir! :tada::+1:

A seguir, você tem um conjunto de diretrizes para contribuir com o Express Generator DH, que está hospedado no repositório do [Léo Carvalho](https://github.com/carvalholeo) no GitHub (à época da criação, abril de 2021, professor da Digital House). Em geral, há mais diretrizes do que regras. Use o bom senso e sinta-se livre para propor mudanças a este documento por meio de um pull request.

#### Índice

[Código de Conduta](#código-de-conduta)

[Eu não quero ler tudo isso, eu só tenho uma pergunta!!!](#eu-não-quero-ler-tudo-isso-eu-só-tenho-uma-pergunta)

[O que eu preciso saber antes de começar?](#o-que-eu-preciso-saber-antes-de-começar)

* [Como eu posso contribuir?](#como-eu-posso-contribuir)
  * [Relatando bugs](#relatando-bugs)
  * [Sua primeira contribuição](#sua-primeira-contribuição)
  * [Pull Requests](#pull-requests)

* [Diretrizes de estilo](#diretrizes-de-estilo)
  * [Mensagens do Git Commit](#mensagens-do-git-commit)
  * [Guia de estilo JavaScript](#guia-de-estilo-javascript)
  * [Guia de estilo de especificações](#guia-de-estilo-de-especificações)

* [Notas adicionais](#notas-adicionais)
  * [Rótulos de Issues e Pull Requests](#rótulos-de-issues-e-pull-requests)

## Código de Conduta

Este projeto e todos os que contém o sufixo ``-dh`` no nome do repositório (e que estão no repositório do Léo Carvalho), são regidos pelo [Código de Conduta](CODE_OF_CONDUCT.md). Ao contribuir (discutindo mudanças, melhorias ou qualquer outo processo), espera-se que você siga este código. Por favor, ao perceber comportamentos inaceitáveis, relate para [leo@leocarvalho.dev](mailtto:leo@leocarvalho.dev).

## Eu não quero ler tudo isso, eu só tenho uma pergunta!!!

> **Atenção:** Não abra um nova issue para fazer uma pergunta. Sério. Você vai ter uma resposta mais rápida se usar os recursos abaixo.

Nós temos um canal de mensagens com FAQ e onde a comunidade pode conversar e trocar conselhos úteis para suas questões, além de poder conversar por áudio.

| Canal | Descrição |
| --- | --- |
| `#chat` | Discussões em geral |
| `#faq` | Perguntas frequentes |
| `#dúvidas` | Dúvidas em geral da comunidade |
| `#sugestões` | Sugestões de novos pacotes e recursos |

Esperamos que você entenda que é um serviço de chat assíncrono, ou seja, pode levar um tempo para alguém responder &mdash; SEJA PACIENTE!

Para entrar no nosso servidor no Discord, [acesse o link de convite][convite-discord] (o [Código de Conduta](#código-de-conduta) daqui se aplica no sevidor, também).

## O que eu preciso saber antes de começar?

Sendo um projeto Open Source, além da [licença](LICENSE), é sempre bom lembrar das seguintes coisas:

* Este projeto é usado, principalmente, por alunos da Digital House. Isso significa que será usado numa iniciativa comercial, com vistas a ter lucro. Mantenha isso em mente antes de dar um pull request.
* O Express Generator DH foi pensado para ser open source, assim como o Express Generator original.
* Seja cordial. Estamos em um ambiente que independe de fuso horário, então seja paciente no tempo das respostas. Também lembre-se há pessoas com diferentes níveis de conhecimento, então tenha empatia: você também já foi iniciante.
* Reportes de segurança devem seguir o que está descrito na [política de segurança](SECURITY.md)
* Mantenha o bom humor.

## Como eu posso contribuir?

### Relatando bugs

Esta seção vai te guiar sobre o envio de bugs e falhas do projeto. Seguir essas diretrizes ajuda os mantenedores e a comunidade a entender o problema que você está passando :pencil:, reproduzir o comportamento nos nossos ambientes :computer: :computer: e encontrar relatos semelhantes :mag_right:.

Antes de criar relatos de bugs, por favor, verifique [esta lista](#antes-de-enviar-um-relato-de-bug), pois você pode descobrir que não precisa criar um novo. Ao criar um relato de bug, por favor, [envie o máximo de detalhes que você puder](#como-enviar-um-bom-relato-de-bug). Preencha os [campos exigidos no modelo](https://github.com/carvalholeo/generator-dh/blob/master/.github/ISSUE_TEMPLATE/bug_report.md) com as informações solicitadas para nos ajudar a resolver as inconsistências mais rapidamente.

> **Nota:** Se você encontrar uma issue com status **Closed** que parece ser a mesma coisa que você está experimentando, abra uma nova issue e inclua um link para a issue original no corpo da sua nova.

#### Antes de enviar um relato de bug

* **Verifique a versão instalada** Em muitos casos, bugs que vocês está enfrentando podem ter sido resolvidos em versões mais recentes. No Express Generator DH, a versão pode ser verificada com ``express-dh --version``. O resultado que sair, deve ser o mesmo do [arquivo README](README.md) ou do repositório no [NPM](https://www.npmjs.com/package/express-generator-dh). A atualização do pacote em seu computador acontece pelo mesmo comando de instalação.
* **Verifique na [Wiki do repositório](https://github.com/carvalholeo/generator-dh/wiki)** as perguntas mais frequentes, erros comuns e problemas conhecidos. Se necessário, entre em contato com seu professor para saber se esse é um problema do Generator DH ou algo pontual.
* **Faça uma [rápida pesquisa](https://github.com/search?q=is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh&type=issues)** para ver se o problema já foi reportado. Se sim **e a issue ainda está aberta**, adicione um comentário na issue existente ao invés de criar uma nova.

#### Como enviar um bom relato de bug?

Os bugs são rastreados através do [GitHub issues](https://guides.github.com/features/issues/). Para criar uma issue aqui no repositório, forneça os detalhes solicitados, preenchendo o [modelo](https://github.com/carvalholeo/generator-dh/blob/master/.github/ISSUE_TEMPLATE/bug_report.md).

Explique o problema e inclua detalhes adicionais para ajudar os desenvolvedores a reproduzir o problema.

* **Use um título claro e descritivo** na issue que identifica o problema.
* **Descreva os exatos passos que reprduzem o problema**, com tantos detalhes quanto for possível. Por exemplo, comece explicando o como o projeto foi instalado (o gerenciador de pacotes, como NPM ou Yarn), o comando exato na execução, sistema operacional, qual o terminal (como PowerShell, prompt de comando, Bash, Zsh, etc). Outro ponto importante na sua descrição, é dizer **não somente o que você tentou fazer, mas explicar o motivo**. Por exemplo, você está tentando usar um motor de renderização no Projeto Integrador diferente de EJS, junto com a opção de instalar os pacotes padrão do PI e apareceu um erro, tente descrever o que aconteceu ao executar.
* **Forneça exemplos específicos para demonstrar os passos**. Inclua links para arquivos ou projetos do GitHub, ou copie e cole trechos do erro, em que você usa esses exemplos. Se você estiver fornecendo trechos de erro copiados, use o [bloco de código Markdown](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Descreva o comportamento observado depois de seguir os passos** e aponte qual é exatamente o problema com aquele comportamento.
* **Explique que comportamente você estava esperando e por quê**
* **Inclua prints/capturas de tela e GIFs** que mostrem você seguindo os passos descritos e demonstrem o problema de forma inequívoca.
* **Se o problema é relacionado à performance ou memória**, inclua uma captura de tela de um gerenciador de tarefas no seu relato.
* **Confirme programas e processos** que estão sendo executados durante a apresentação da falha.

Forneça mais contexto ao responder as seguintes perguntas?

* **O problema começou a acontecer recentemente** (p.ex: depois de atualizar o pacote do Generator DH) ou sempre aconteceu?
* Se o problema começou a acontecer recentemente, **você consegue reproduzir o problema em uma versão anterior do projeto?** Qual é a versão mais recente em que você percebe que o erro acontece? Baixe uma versão anterior, usando o que está disponibilizado no NPM.
* **Você pode reproduzir o problema de forma confiável?** Se não, forneça detalhes sobre a frequência que o problema acontece e sob quais condições normalmente ele se manifesta.
* Se o problema está relacionado com arquivos (como permissões na criação de pastas e arquivos), **o problema acontece em todos os arquivos do projeto ou somente alguns?** O problema ocorre somente com arquivos JavaScript ou também de renderização? Tem a ver com o Express ou com alguma opção específica, que não existe no Generator original? Está relacionado com grandes arquivos sendo enviados para o servidor embutido, através da pasta ``public``?

Inclua detalhes sobre sua configuração e ambiente:

* **Qual as versões do Node e do NPM você está usando?** Pegue a versão digitando os comandos ``node -`` e ``npm -v`` no terminal de sua preferência.
* **Qual o nome e a versão do Sistema Operacional que você está usando?** No Windows, pegue a versão digitando apertando do teclado, simultaneamente, as teclas ``Win + R``, e então digite ``winver``. Para distribuições Linux, verifique junto com o desenvolvedor qual o comando permite fazer isso.
* **Você está tentando rodar através de uma instância do Docker ou outro esquema de container?** Se sim, envie o link ou uma cópia do Dockerfile, lembrando de apagar senhas ou informações sensíveis nele.
* **Quais outros pacotes estão instalados no projeto?** Envie uma cópia do seu ``package.json``. Envie, também a saída do comando ``npm list -g --depth 0``. Ele mostrará os pacotes que estão instalados de forma global.
* **Está usando configurações personalizadas no projeto?** Mande também, como arquivos ``.env`` de exemplo, ``.gitignore``, ``knexfile.js``, ``.eslintrc`` (ou suas variantes) e qualquer outra modificação que possa "alterar" o core do sistema.

### Sua primeira contribuição

Quer ajudar, mas não sabe por onde começar? Você pode começar olhando nas issues marcadas com `beginner` e `help-wanted`:

* [Issues `beginner`][beginner] - são isues que precisam de poucas linhas de código e poucos testes automatizados, ideal para iniciantes.
* [Issues `help wanted`][help-wanted] - issues que podem precisar de um pouco mais de envolvimento e compromentimento do que as issues `beginner`.

Ambas as listas de issues são ordenadas pelo número total de comentários. Sabemos, não é perfeito, mas o número de comentários é um bom indicador de impacto que uma mudança pode trazer.

### Pull Requests

O processo aqui descrito tem muitos objetivos?

* Manter um código de qualidade
* Resolver problemas que são importantes para os usuários
* Engajar a comunidade ao trabalhar através das melhores possibilidades do Generator
* Permitir um processo sustentável para os mantenedores do Generator em revisar contribuições

Pedimos que siga estes passos para ter sua contribuição aceita pelos desenvolvedores:

1. Siga as intruções disponíveis [no modelo](PULL_REQUEST_TEMPLATE.md)
2. Siga as [diretrizes de estilo](#diretrizes-de-estilo)
3. Depois de enviar seu pull request, verifique se todos os [status checks](https://help.github.com/articles/about-status-checks/) estão passando. <details><summary>E se um dos status checks falharem?</summary>Se um status check falhar, mas você acredita que a falha não tem relação com a mudança que você fez no código, por getnileza, deixe um comentário no pull request explicando os motivos que você acha que a falha não tem ligação. Um mantenedor vai tentar re-executar a esteira de verificações para você. Se for concluído que a falha era um falso positivo, então vamos abrir uma issue para tentar identificar a origem da falha nos testes.</details>

Embora os pré-requisitos acima devam ser cumpridos antes do seu pull request ser revisado, os resvisores podem solicitar a você algum esforço adicional para o design de código, testes, organização de arquivos ou outras mudanças antes que o pull request possa ser completamente aceito e integrado ao código principal.

## Diretrizes de estilo

### Mensagens do Git Commit

* Use o tempo verbal presente ("Adiciona opção", não "Adicionada opção")
* Use o modo imperativo ("Mudar arquivo X", não "Muda arquivo X")
* Limite a primeira linha em 72 caracteres ou menos
* Indice o número de issues e pull requests de livremente após a primeira linha
* Cosidere começar a mensagem de commit com um emoji da lista abaixo. Isso é só enfeite.
  * :rocket: `:rocket:`: quando estiver adicionando funcionalidades ao programa
  * :art: `:art:` quando estiver melhorando o formato/estrutura do código
  * :racehorse: `:racehorse:` quando estiver melhorando performance
  * :memo: `:memo:` quando estiver escrevendo documentação
  * :penguin: `:penguin:` quando estiver corrigindo alguma coisa no Linux
  * :apple: `:apple:` quando estiver corrigindo alguma coisa no macOS
  * :checkered_flag: `:checkered_flag:` quando estiver corrigindo alguma coisa no Windows
  * :bug: `:bug:` quando estiver corrigindo um bug
  * :fire: `:fire:` quando estiver removendo código ou arquivos
  * :green_heart: `:green_heart:` quando estiver corrigindo o pipeline de CI
  * :white_check_mark: `:white_check_mark:` quando adicionando testes
  * :lock: `:lock:` quando lidar com questões de segurança
  * :arrow_up: `:arrow_up:` quando atualizando dependências
  * :arrow_down: `:arrow_down:` quando diminuir a versão de dependências
  * :shirt: `:shirt:` quando estiver removendo/consertando avisos de linter

### Guia de estilo JavaScript

Todo o código Javascript é formatado de acordo com regras do [ESLint](https://eslint.org/). Instale a extensão na sua IDE ou editor de código favorito, para ter acesso em tempo real ao avisos de problemas no estilo.

Também, pode executar o comando `npm run lint-fix` periodicamente, para corrigir problemas no estilo do código de forma automática.

* Prefira fazer desestruturação de arrays e objetos dentro de funções, métodos e parâmetros
* Exportação de módulos (`module.exports`) devem ser feitos ao final dos arquivos

  ```js
  // Fazer assim:
  function nomeDaFuncao() {

  }
  module.exports = nomeDaFuncao

  // Ao invés disso:
  module.exports = function nomeDaFuncao() {

  }
  ```

* Coloque as importações na seguinte ordem?
  * Módulos nativos do Node (como o `path`, `fs` ou `util`)
  * Módulos instalados (como o `commander`, `minimatch` ou `mkdirp`)
  * Módulos locais (aqueles que utilizam caminhos relativos)
* Nas propriedades das classes, elas devem ter a seguinte ordem?
  * Métodos e propriedades de classe (métodos precisam começar com `static`)
  * Métodos e propriedades de instância (aqueles que precisam de `new` para serem usados)
* Evite ao máximo código dependente de plataforma (como comandos do sistema operacional). Caso seja inevitável, faça um código alternativo que possa ser usado em outra plataforma

### Guia de estilo de especificações

* Incua uma especificação bem formulada e bem estruturada usando [Mocha](https://mochajs.org/) na pasta `./test`.
* Trate `describe` como um pronome ou situação
* Trate `it` como uma declaração sobre o estado ou como uma operação muda um estado

#### Exemplo

```js
describe('um cachorro', () => {
  it('late', (done) => {
    // especificação aqui
  })

  describe('quando o cachorro está feliz', () => {
    it('balança o rabo', (done) => {
      // especificação aqui
    })
  })
})
```

## Notas adicionais

### Rótulos de Issues e Pull Requests

Esta seção lista os rótulos que usamos para nos ajudar a rastrear e gerenciar as issues e pull requests.

O [GitHub search](https://help.github.com/articles/searching-issues/) torna fácil o uso de rótulos para encontrar grupo de issues ou pull requests que possam te interessam. Por exemplo, você pode se intereaar nas [issues abertas que estão marcadas como bugs, mas que ainda precisam ser reproduzidas](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Abug+label%3Aneeds-reproduction) ou quem sabe [pull requests abertas no repositório que ainda não tenham sido revisados](https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+comments%3A0). Para ajudar a encontrar issues e pull requests, cada rótulo estpá listado com o link de busca para encontrar itens com aquele rótulo no repositório somente. Nós encorajamos você a dar uma lida sobre [outros filtros de pesquisa](https://help.github.com/articles/searching-issues/), que pode te ajudar a escrever pesquisas mais focadas.

Os rótulos são agrupados livremente por sua finalidade, mas não é necessário que cada problema tenha um rótulo de cada grupo ou que um problema não possa ter mais de um rótulo do mesmo grupo.

#### Tipos de Issues e Estados das Issues

| Nome do rótulo | `carvalholeo/generator-dh` :mag_right: | Descrição |
| --- | --- | --- |
| `enhancement` | [search][search-repo-label-enhancement] | Pedidos de recursos. |
| `bug` | [search][search-repo-label-bug] | Bugs confirmados ou relatos que muito provavelmente são bugs. |
| `question` | [search][search-repo-label-question] | Questões que são mais que relatos de bugs ou pedidos de recursos (p.ex. como eu faço X coisa). |
| `feedback` | [search][search-repo-label-feedback] | Feedback geral, mais do que relatos de bugs ou pedidos de recursos. |
| `help-wanted` | [search][search-repo-label-help-wanted] | O time de desenvolvmento ficaria agradecido se recebesse ajuda da comunidade ao resolver essas issues. |
| `beginner` | [search][search-repo-label-beginner] | Issues menos complexas, que poderiam ser um bom ponto de partida para trabalhar por aqueles usuários que queiram ajudar. |
| `more-information-needed` | [search][search-repo-label-more-information-needed] | Mais informações precisam ser coletadas sobre estes problemas ou pedidos de recursos (p.ex. passos para reproduzir). |
| `needs-reproduction` | [search][search-repo-label-needs-reproduction] | Em geral bugs, mas não puderam ser reproduzidos de forma confiável. |
| `blocked` | [search][search-repo-label-blocked] | Issues bloqueadas em outras issues. |
| `duplicate` | [search][search-repo-label-duplicate] | Issues que são duplicações de outras issues, como p.ex. coisas que já tenham sido reportadas antes. |
| `wontfix` | [search][search-repo-label-wontfix] | O time de desenvolvimento decidiu não resolver essas issues no momento, ou porque estão funcionando como esperado ou por alguma outra razão. |
| `invalid` | [search][search-repo-label-invalid] | Issues inválidas (p.ex. erros do usuário). |
| `package-idea` | [search][search-repo-label-package-idea] | Pedidos de recursos que são bons candidatos para um novo pacote. |

#### Categorias de tópicos

| Nome do rótulo | `carvalholeo/generator-dh` :mag_right: | Descrição |
| --- | --- | --- |
| `windows` | [search][search-repo-label-windows] | Relacionado com o funcionamento do Express Generator DH no Windows. |
| `linux` | [search][search-repo-label-linux] | Relacionado com o funcionamento do Express Generator DH no Linux. |
| `mac` | [search][search-repo-label-mac] | Relacionado com o funcionamento do Express Generator DH no macOS. |
| `documentation` | [search][search-repo-label-documentation] | Relacionado com qualquer tipo de documentação. |
| `performance` | [search][search-repo-label-performance] | Relacionado com performance. |
| `security` | [search][search-repo-label-security] | Relacionado com segurança. |
| `uncaught-exception` | [search][search-repo-label-uncaught-exception] | Issues sobre exceções não tratadas, normalmente aparecem no terminal durante a execução do programa. |
| `crash` | [search][search-repo-label-crash] | Relatos de parada total do Express Generator DH. |
| `deprecation-help` | [search][search-repo-label-deprecation-help] | Issues para ajudar os desenvolvedores a remover o uso de pacotes depreciados do sistema. |
| `installer` | [search][search-repo-label-installer] | Relacionado com a instalação nos diferentes sistemas operacionais. |
| `auto-updater` | [search][search-repo-label-auto-updater] | Relacionado com auto-atualizador nos diferentes sistemas operacionais. |

#### Pull Request Labels

| Nome do rótulo | `carvalholeo/generator-dh` :mag_right: | Descrição |
| --- | --- | --- |
| `work-in-progress` | [search][search-repo-label-work-in-progress] | Pull requests que ainda estão sendo trabalhadas e que terão ainda mais mudanças futuras. |
| `needs-review` | [search][search-repo-label-needs-review] | Pull requests que precisam de revisão de código, além de aprovação dos mantenedores. |
| `under-review` | [search][search-repo-label-under-review] | Pull requests que estão sendo revisados pelos mantenedores. |
| `requires-changes` | [search][search-repo-label-requires-changes] | Pull requests que precisam de alguma mudança, baseado nos comentários de revisão para só então serem revisados novamente. |
| `needs-testing` | [search][search-repo-label-needs-testing] | Pull requests que precisam de testes manuais. |

[convite-discord]: https://discord.gg/QFbX5skKhc
[search-repo-label-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aenhancement
[search-repo-label-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Abug
[search-repo-label-question]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aquestion
[search-repo-label-feedback]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Afeedback
[search-repo-label-help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Ahelp-wanted
[search-repo-label-beginner]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Abeginner
[search-repo-label-more-information-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Amore-information-needed+label%3Amore-information-needed
[search-repo-label-needs-reproduction]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aneeds-reproduction+label%3Aneeds-reproduction
[search-repo-label-windows]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Awindows
[search-repo-label-linux]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Alinux
[search-repo-label-mac]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Amac
[search-repo-label-documentation]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Adocumentation
[search-repo-label-performance]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aperformance
[search-repo-label-security]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Asecurity
[search-repo-label-crash]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Acrash
[search-repo-label-uncaught-exception]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Auncaught-exception+label%3Auncaught-exception
[search-repo-label-blocked]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Ablocked
[search-repo-label-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aduplicate
[search-repo-label-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Awontfix
[search-repo-label-invalid]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Ainvalid
[search-repo-label-package-idea]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Apackage-idea
[search-repo-label-installer]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Ainstaller
[search-repo-label-auto-updater]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aauto-updater
[search-repo-label-deprecation-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Acarvalholeo%2Fgenerator-dh+label%3Adeprecation-help
[search-repo-label-work-in-progress]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+label%3Awork-in-progress
[search-repo-label-needs-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aneeds-review
[search-repo-label-under-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aunder-review
[search-repo-label-requires-changes]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+label%3Arequires-changes
[search-repo-label-needs-testing]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Acarvalholeo%2Fgenerator-dh+label%3Aneeds-testing

[beginner]:https://github.com/search?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+repo%3Acarvalholeo%2Fgenerator-dh+sort%3Acomments-desc
[help-wanted]:https://github.com/search?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+repo%3Acarvalholeo%2Fgenerator-dh+sort%3Acomments-desc+-label%3Abeginner
