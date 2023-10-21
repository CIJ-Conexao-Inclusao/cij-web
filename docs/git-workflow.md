# Convenções para Versionamento no Git

Estaremos trabalhando com 2 branches padrões em nosso repositório:

- develop
- main
  
**develop:** A branch develop é a branch de desenvolvimento. Nela serão feitos todos os merges de features e hotfixes. Dessa forma, essa será sempre a branch mais atualizada.\
**main:** A branch main é a branch de produção. Nela só serão feitos merges da branch develop.

## Desenvolvendo features
A cada nova feature, deve ser criada uma nova branch a partir da **develop**. Ou seja, a cada card no jira deve ser criado uma branch nova seguindo o padrão:

```bash
feature/<código>
```
Ex: feature/CIJ-123

Quando o desenvolvimento de uma feature for finalizada, deve-se abrir um pull request para a branch develop.
Essa pull request deve ser revisada e aprovada pelo QA do time.

## Corrigindo bugs
A cada novo bug, deve ser criada uma nova branch a partir da **develop**. Ou seja, a cada card de bug no jira deve ser criado uma branch nova seguindo o padrão:

```bash
hotfix/<código>
```
Ex: hotfix/CIJ-123

Em nosso projeto, não estaremos diferenciando entre hotfix e bugfix. Ambos serão tratados como hotfix.

Quando o desenvolvimento de uma correção de bug for finalizada, deve-se abrir um pull request para a branch develop que deve ser revisada e aprovada pelo QA do time.

## Atualizando a branch main
Quando a branch develop estiver estável, o PO do time deve abrir um pull request para a branch main.
**Importante:** Esse pull request só deve ser aberto quando a branch develop estiver funcionando sem problemas.