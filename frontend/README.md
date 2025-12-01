## Frontend SafraTech

Frontend desenvolvido em React + TypeScript com Vite, estruturado para ser modular e escalável.

## Estrutura de Pastas

```plaintext
frontend/
│
├─ src/
│  ├─ componentes/       # Componentes gerais
│  ├─ config/            # Configurações globais do projeto
│  ├─ context/           # Contextos do React para gerenciamento de estado global
│  ├─ hooks/             # Custom hooks
│  ├─ pages/             # Páginas do aplicativo
│  │   │
|  |   └─ LayoutPage.tsx     # Componente de layout principal
│  │
│  ├─ styles/            # Arquivos CSS globais
│  │
│  ├─ types/             # Tipagens TypeScript
│  │
│  └─ utils/             # Utilitários e helpers
│
└─ .env                  # Variáveis de ambiente
```

## Instalação

Clonar repositorio

```bash
  git clone https://github.com/llucascr/PI_IV_ES_TIME-19.git
```

Acessar pasta frontend

```bash
  cd frontend
```

instalar dependências

```bash
  npm install
```

Inicia o servidor de desenvolvimento

```bash
  npm run dev
```

Compila o projeto para produção

```bash
  npm run build
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`VITE_PORT`

`VITE_API_URL`

`VITE_URL`

`VITE_TOKEN_COOKIE_NAME`
