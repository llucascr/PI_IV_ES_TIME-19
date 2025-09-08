> # Comandos GIT

### Arquivo de leitura rápida para comandos GIT

```bash
   git init
```

**inicia o versionamento no git**

```bash
   git clone [caminho_repositorio_remoto]
```

**clona o repositório remoto em sua máquina local**

```bash
   git status
```

**verifica as mudanças e/ou modificações nos arquivos em sua máquina**

```bash
   git add .
```

**adiciona as mudanças ao versionamento/stagging**

```bash
   git commit -m "mensagem"
```

**salva as mudanças para realização da mesma ao repositório remoto**

```bash
   git reset HEAD
```

**volta o codigo de um ponto específico**

```bash
   git checkout [nome_arquivo]
```

**descarta mudanças em algum ponto específico**

```bash
   git branch
```

**lista as branches existentes/criadas**

```bash
   git branch -v
```

**lista as branches local com os últimos comentários/mensagens**

```bash
   git checkout branch [branch_name]
```

**muda de branch**

```bash
   git switch [branch_name]
```

**muda de branch**

```bash
   git switch -c [branch_name]
```

**cria uma nova branch e muda para a branch criada**

```bash
   git pull
```

**puxa as atualizações da branch master do repositóro remoto para o local**

```bash
   git pull origin [branch_name]
```

**puxa as atualizações de uma branch específica do repositóro remoto para o local**

```bash
   git pull -u origin [branch_name]
```

**puxa as atualizações do repositóro remoto de uma branch específica**

```bash
   git push
```

**enviar as suas alterações/mudanças para o repositório remoto**

```bash
   git fetch
```

**recebe branches remotas que não estão mapeadas**

```bash
   git remote -v
```

**mostra os caminhos de commit do repositorio remoto**

```bash
   git push -u origin [branch_name]
```

**envia as alterações para o repositório remoto (como github/gitlab)**

```bash
   git shortlog
```

**mostra o histórico das alterações/commits realizados referente a branch que você está**

```bash
   git log
```

**mostra histórico dos commits como autor do envio, data e mensagem**

```bash
   git show [hash_number]
```

**mostra histórico das mudanças/alterações conforme a linha do tempo de commits**

```bash
   git diff
```

**mostra a diferença entre arquivos**

```bash
   git merge [branch_name] --no-ff
```

**une as modificações entre branches**

```bash
   git branch -d [branch_name]
```

**deleta a branch local**

```bash
   git checkout -b [branch_name][branch_mirror]
```

**cria uma nova branch copiando a branch de referência**

```bash
   git push --delete origin [branch_name]
```

**deleta uma branch no repositório remoto**

```bash
   git stash save "message"
```

**Para salvar suas alterações sem realizar commit ou envio ao repositório, espécie de stand by**

```bash
   git stash apply
```

**Retorna as modificações para branch desejada**

```bash
   git stash show
```

**Lista todos os arquivos modificados no ultimo stash**

```bash
   git stash clear
```

**Realiza a remoção de todos os stash’s**

```bash
   git stash create <mensagem> e git stash save <mensagem>
```

**Ambos criam uma mensagem/nome para o stash**

```bash
   git stash pop
```

**Realiza a remoção em ordem de pilha, aplicando as alterações armazenadas no stash mais recente e remove-o da lista**

```bash
   git stash
```

**Armazena as alterações feitas no código e limpa o diretório de trabalho**

```bash
   git stash list
```

**Exibe a lista de stashes armazenados**

```bash
   git stash drop
```

**Remove o stash especificado da lista**

```bash
   git stash clear
```

**Remove todos os stashes da lista**

```bash
   git stash --include-untracked
```

**para armazenar arquivos não rastreados**

```bash
   git stash --keep-index
```

**para armazenar apenas as alterações que foram adicionadas com git add**

```bash
   git stash -u
```

**para armazenar arquivos não rastreados e alterações**

```bash
   git stash branch novo-branch
```

**para criar um novo branch a partir do stash**
