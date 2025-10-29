# SafraTech

Sistema para rastreamento da cadeia produtiva do morango 🍓

---

## 📌 Visão Geral

O **SafraTech** é uma plataforma desenvolvida para monitorar e registrar todas as etapas da cadeia produtiva de morangos — da colheita ao armazenamento.
O objetivo é garantir **transparência**, **qualidade** e **segurança**, proporcionando que produtores e demais stakeholders acompanhem a origem e o histórico completo de cada lote.

---

## 🎯 Objetivos

* Rastrear cada lote de morangos desde a colheita até a entrega final.
* Armazenar e disponibilizar dados em tempo real sobre as etapas do processo.
* Permitir auditoria e histórico completo de cada lote (quem fez, quando fez, onde fez).
* Facilitar a conformidade com requisitos de qualidade, segurança alimentar e sustentabilidade.
* Oferecer interface para produtores, auditores e público visitante (modo teste).

---

## 🧩 Tecnologias Utilizadas

### **Backend**

* Java 17
* Spring Boot
* Spring Security com JWT
* MongoDB

### **Frontend**

* React
* Axios
* Styled-Components

### **Ferramentas e Gerenciamento**

* Maven (backend)
* npm (frontend)

---

## ⚙️ Instalação e Execução

### **1. Clonar o repositório**

```bash
git clone https://github.com/llucascr/PI_IV_ES_TIME-19.git
cd PI_IV_ES_TIME-19
```

### **2. Backend**

```bash
cd backend
mvn install            # instala dependências
```

Defina as variáveis de ambiente:

**Windows (CMD):**

```bash
set MB_USERNAME=seu_usuario_mongo
set MB_PASSWORD=sua_senha_mongo
```

**Linux/Mac:**

```bash
export MB_USERNAME=seu_usuario_mongo
export MB_PASSWORD=sua_senha_mongo
```

Execute o projeto:

```bash
mvn spring-boot:run
```

Ou rode pela sua IDE no arquivo `Application.java`.

---

### **3. Frontend**

```bash
cd frontend
npm install            # instala dependências
npm start              # inicia o servidor de desenvolvimento
```

Acesse no navegador:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🚀 Como Usar

1. Abra a aplicação no navegador.
2. Faça login com sua conta ou utilize o modo visitante para testar.
3. No painel principal você poderá:

   * Registrar novos lotes de morangos.
   * Inserir informações sobre colheita, transporte e armazenamento.
   * Consultar o histórico completo de rastreamento de cada lote.
4. Explore os menus e funcionalidades conforme seu perfil de usuário.

---

## ✅ Funcionalidades Principais

* Registro de lote: origem, produtor, data, localização.
* Adição de eventos/etapas: colheita, transporte, armazenamento, entrega.
* Autenticação e autorização (usuário produtor, auditor, visitante).
* Visualização de histórico completo por lote.
* Interface responsiva e intuitiva.

---

## 📂 Estrutura do Projeto

```
PI_IV_ES_TIME-19/
├── backend/         # API Java + Spring Boot
└── frontend/        # Cliente React
```

---

## 🧭 Roadmap (Próximos Passos)

* [ ] Implementar relatórios e dashboards de desempenho
* [ ] Adicionar filtros e notificações em tempo real
* [ ] Integrar com sistema de QR-code / etiqueta por lote
* [ ] Melhorias de UI/UX para perfil visitante
* [ ] Internacionalização (i18n) do frontend

---

## 🤝 Contribuições

Contribuições são bem-vindas!
Siga o fluxo abaixo:

1. Faça um *fork* do repositório.
2. Crie uma branch para sua feature:

   ```bash
   git checkout -b feature/MinhaFuncionalidade
   ```
3. Faça commits descritivos:

   ```bash
   git commit -m "Descrição da feature"
   ```
4. Envie a branch:

   ```bash
   git push origin feature/MinhaFuncionalidade
   ```
5. Abra um *pull request* no repositório principal.

---

## 📝 Licença

Este projeto está licenciado sob a **Licença MIT**.
Consulte o arquivo `LICENSE` para mais informações.

---

## 📧 Contato

Para dúvidas ou suporte, entre em contato com o time de desenvolvimento do **SafraTech**.
