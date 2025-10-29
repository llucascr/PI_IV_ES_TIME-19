# Projeto SafraTech 

---

##  Sobre o Projeto

O **SafraTech** é um sistema desenvolvido para monitorar e registrar todas as etapas da cadeia produtiva do morango 
O objetivo é garantir transparência, qualidade e segurança, permitindo que produtores, distribuidores e clientes acompanhem a origem e o histórico de cada lote.
---

⚙️ Instalação e Execução do Projeto

 1. Clonar o repositório
    * git clone https://github.com/llucascr/PI_IV_ES_TIME-19.git
    * cd backend

 3. Configurar e executar o Backend (Java + Spring Boot)

Acesse a pasta do backend:

cd backend

Sincronize as dependências do Maven

Em muitas IDEs (como IntelliJ ou Eclipse), isso ocorre automaticamente.
Caso contrário, execute manualmente:
mvn install


Configure as variáveis de ambiente:

set MB_USERNAME = (seu usuario mongo)
set MB_PASSWORD = (sua senha mongo)

Execute o projeto:

Rode como uma aplicação Spring Boot pela IDE, através do arquivo Application.java,
ou, se preferir via terminal:
mvn spring-boot:run

3. Executar o Frontend (React)

Vá até a pasta do frontend:

* cd frontend

Instale as dependências:

* npm install

Inicie o servidor de desenvolvimento:

* npm start

Acesse a aplicação no navegador:

http://localhost:3000

Para mais explicações acesse o README do frontend: [Frontend](./frontend)

## 🚀 Como Usar

* 1. Acesse o sistema no navegador.
* 2. Faz login com sua conta ou entre no modo visitante para testar.
  * No painel principal, você poderá:
  * Registrar novos lotes de morangos 
  * Inserir informações sobre colheita, transporte e armazenamento 
* 6. Consultar o histórico completo de rastreamento 

## 🛠️ Tecnologias Utilizadas

### Backend

* **Java 17**
* **Spring Boot**
* **Spring Security JWT**
* **MongoDB**

### Frontend

* **React**
* **Axios**
* **Styled Components**

### Ferramentas e Extras

* **Maven**
---
