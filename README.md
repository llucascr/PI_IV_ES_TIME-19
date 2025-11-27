# 🍓 Sistema de Rastreabilidade da Cadeia Produtiva do Morango (SafraTech)

> O SafraTech é uma solução de software projetada para garantir **transparência**, **segurança alimentar** e **controle de qualidade** na cadeia produtiva de morangos. Através de uma arquitetura moderna, o sistema permite o **rastreamento granular de lotes** desde a colheita até o consumidor final, oferecendo perfis de acesso distintos para produtores, auditores e visitantes.

## 📌 Visão Geral
A **rastreabilidade de alimentos** é um requisito crítico para a segurança sanitária e certificação de qualidade. O SafraTech resolve o problema da desconexão de dados entre as etapas de produção.

### Principais Funcionalidades

* **📦 Rastreamento de Lotes:** Histórico imutável de eventos (Colheita, Transporte, Armazenamento).
* **🔐 Controle de Acesso:** Autenticação via **JWT** com *roles* específicas (**ADMIN**, **PRODUTOR**, **FUNCIONARIO**).
* **📊 Auditoria em Tempo Real:** Visualização de dados para conformidade com normas sanitárias.

---

## 🏗 Arquitetura do Projeto
O projeto segue uma arquitetura de **API RESTful desacoplada**:

* **Backend (Server):** Desenvolvido em **Java com Spring Boot**, responsável pela regra de negócios, segurança (**Spring Security**) e persistência de dados no **MongoDB**.
* **Frontend (Client):** **Single Page Application (SPA)** em **React**, consumindo a API via **Axios**.
* **Banco de Dados:** **MongoDB (NoSQL)**, escolhido pela flexibilidade de schema para armazenar metadados variados de diferentes lotes de produção.

---

## 🛠 Tecnologias

### Backend
| Categoria | Tecnologia |
| :--- | :--- |
| **Linguagem** | Java 17 |
| **Framework** | Spring Boot 3+ |
| **Segurança** | Spring Security + JWT (JSON Web Token) |
| **Banco de Dados** | MongoDB |
| **Build Tool** | Maven |

### Frontend
| Categoria | Tecnologia |
| :--- | :--- |
| **Framework** | React.js |
| **Estilização** | Styled-Components |
| **Cliente HTTP** | Axios |
| **Gerenciador** | NPM |

---

## 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

* **Java JDK 17**
* **Node.js (v16 ou superior)**
* **MongoDB** (Rodando localmente ou via Docker)
* **Git**

---

## 🚀 Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone [https://github.com/llucascr/PI_IV_ES_TIME-19.git](https://github.com/llucascr/PI_IV_ES_TIME-19.git)
cd PI_IV_ES_TIME-19
```

### Backend (API)
O backend necessita de variáveis de ambiente para conectar ao banco de dados.

1.  Navegue até a pasta do servidor:

    ```bash
    cd backend
    ```

2.  **Configuração de Ambiente:** Defina as credenciais do seu **MongoDB** no terminal atual ou nas configurações de "Run Configuration" da sua IDE.

| Variável | Comando Exemplo |
| :--- | :--- |
| **MB_URI** | `mongodb+srv://<USERNAME>:<PASSWORD>@clusterpi4.rdiy6em.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPI4` |

3.  Instale as dependências e execute:

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

> O Spring iniciará na porta padrão **8080**.

### Frontend (SPA)
1.  Abra um novo terminal e navegue até a pasta web:

    ```bash
    cd frontend
    ```

2.  Instale as dependências e inicie o projeto:

    ```bash
    npm install
    npm start
    ```

> A aplicação abrirá automaticamente em **http://localhost:3000**.

---

## 🔌 Documentação da API
Em breve será implementada com **Swagger UI**
