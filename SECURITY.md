# Política de Segurança

Obrigado por tomar um tempo revisando a política de segurança.

Como é de conhecimento geral, é impossível manter um software completamente seguro e sem brechas ou falhas, não importa o tanto de esforço que se faça para mitigá-los.

Assim, divulgamos aqui nossa política de segurança e como tratamos os reportes de incidentes de vulnerabilides.

## Versões suportadas

Atualmente, as versões que damos suporte para uso estão listadas abaixo. Para elas, damos atualizações e correções, além de implementar melhorias.

Falhas ou vulnerabilidades de versões sem suporte podem não ser respondidas, sendo analisado caso a caso.

| Versão  | É suportada?       |
| ------- | ------------------ |
| 4.5.x   | :white_check_mark: |
| 4.4.x   | :white_check_mark: |
| 4.3.x   | :white_check_mark: |
| 4.2.x   | :x:                |
| < 4.16  | :x:                |

## Reportando vulnerabilidades

Caso você encontre alguma vulnerabilidade, brecha de segurança ou falha estrutural que possa causar explorações indevidas, pedimos que verifique os seguintes pontos:

* Se esta é uma falha do pacote (no caso, Express Generator DH) ou dos pacotes que são gerados a partir dele
* Quais versões do pacote são afetadas. Se possível, uma lista de versões do Node em que a falha aparece
* Informar qual a brecha encontrada e, se possível, o CVE associado, para publicação após a correção
* Informar a quanto tempo sabe-se da brecha
* Esta é uma prova de conceito ou há relatos de exploração real?

Nós nos comprometemos em dar uma solução para os pacotes que são suportados em até 30 dias, após a aceitação do relatório (cuja resposta pode levar até 15 dias). Nesse prazo, pedimos que a brecha em nosso pacote não seja divulgada, a fim de termos tempo de corrigir e lançar uma atualização.

Nós nos comprometemos a não executar nenhum tipo de persecução judicial, desde que a falha tenha sido avisada para nós anteriormente (seguindo a informação do parágrafo anterior) ou que a mesma não tenha sido utilizada para causar danos reais aos usuários.

Caso o relatório seja recusado, enviaremos uma explicação formal do motivo da recusa. Isso implica em autorização imediata para divulgação das suas descobertas.

Para reportar uma brecha de segurança, por favor, envie um e-mail com o seu relatório para [seguranca@leocarvalho.dev](mailto:seguranca@leocarvalho.dev).
