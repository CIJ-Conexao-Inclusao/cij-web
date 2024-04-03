# Padrões de Commit utilizando Conventional Commits

Os padrões de commit são uma parte essencial do processo de desenvolvimento de software, ajudando a manter um histórico claro e organizado das alterações realizadas ao longo do tempo. O [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) é uma convenção popular para padronizar as mensagens de commit, facilitando a compreensão das alterações feitas em um repositório.

## Formato do Commit
Os commits devem seguir o seguinte formato:
```
<type>[optional scope]: <description>
```  
  
**Type:** Tipo do commit, indicando a natureza da alteração. Os tipos mais comuns são:
- feat: Para adição de uma nova feature.
- fix: Para correção de um bug.
- docs: Para alterações na documentação.
- style: Para alterações que não afetam o código, como formatação, espaços em branco, etc.
- refactor: Para alterações no código que não corrigem um bug nem adicionam uma feature.
- chore: Para alterações no processo de build, integração contínua (CI), etc.  
  
**Optional Scope:** Escopo da alteração, indicando a área específica do código que foi modificada. Este campo é opcional e pode ser qualquer coisa que ajude a especificar o escopo da alteração, como um número de identificação de tarefa (ex: WQO-61).  
  
**Description**: Descrição da alteração de forma curta e objetiva. Por padrão, a descrição deve ser escrita em inglês.

## Exemplos de Commits
Aqui estão alguns exemplos de commits seguindo o padrão Conventional Commits:

```
feat: Add new feature
```
```
fix(WQO-61): Fix bug
```
```
docs: Update README.md
```
```
style: Fix indentation
```
```
refactor: Refactor code
```
```
chore: Update CI
```

## Benefícios dos Padrões de Commit
- **Clareza:** Facilita a compreensão das alterações realizadas no código.
- **Organização:** Ajuda a manter um histórico de alterações coeso e fácil de acompanhar.
- **Colaboração:** Permite que membros da equipe entendam rapidamente o que está sendo alterado e por quê.
- **Automatização:** Pode ser integrado a ferramentas de automação para gerar changelogs, versões automatizadas, entre outros.

## Implementação
Para implementar padrões de commit utilizando o Conventional Commits, é recomendado que todos os membros da equipe estejam cientes do padrão e o sigam de forma consistente. Além disso, ferramentas de integração contínua (CI) podem ser configuradas para verificar se os commits estão seguindo o padrão antes de serem integrados ao repositório principal.

Com essas práticas, é possível manter um histórico de alterações claro e organizado, facilitando a colaboração e o gerenciamento do código-fonte ao longo do tempo.
