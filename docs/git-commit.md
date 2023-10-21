# Padrões de commit
Estaremos seguindo o padrão de commits definido no [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0).

Nesse padrão, os commits devem seguir o seguinte formato:

```bash
<type>[optional scope]: <description>
```

**Type** - Tipo do commit. Pode ser:
- **feat:** Uma nova feature
- **fix:** Uma correção de bug
- **docs:** Uma alteração na documentação
- **style:** Uma alteração que não afeta o código (espaços em branco, formatação, etc)
- **refactor:** Uma alteração no código que não corrige um bug e nem adiciona uma feature
- **chore:** Uma alteração no processo de build, CI, etc

**Optional scope** - Escopo da alteração. Pode ser qualquer coisa especificando o escopo da alteração. Ex: CIJ-123

**Description** - Descrição da alteração. Deve ser uma descrição curta e objetiva. Por padrão, deve ser escrita em inglês.

## Exemplos de commit
```bash
feat: Add new feature
```

```bash
fix(CIJ-123): Fix bug
```

```bash
docs: Update README.md
```

```bash
style: Fix indentation
```

```bash
refactor: Refactor code
```

```bash
chore: Update CI
```