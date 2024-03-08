 # Sistema de Gerenciamento de Clientes
 Plataforma de Gerenciamento e Otimização de Rotas para Serviços de Limpeza Residencial
 
Este projeto é um sistema de gerenciamento de clientes que utiliza **React** no frontend e **Node.js** com **Express** no backend. **PostgreSQL** é usado como banco de dados, e **Axios** é utilizado para realizar requisições HTTP entre o cliente e o servidor. A aplicação permite a adição, listagem, exclusão e busca de clientes, além de calcular o menor percurso de rota entre os clientes cadastrados se baseando no Problema do Caixeiro Viajante (PCV) que é um problema clássico de otimização combinatória.

## 🛠 Ferramentas e Versões Utilizadas

- **Node.js**: `v18.18.2`
- **React**: `v18.2.0`
- **Express**: `v4.18.3`
- **PostgreSQL**: `16.2-1`
- **Axios**: `v1.6.7`
- **Material-UI (MUI)**: `v5.15.12`
- **Cors**: `v2.8.5`
- **Body-Parser**: `v1.20.2`
- **Express-Validator**: `v7.0.1`
- **pg (PostgreSQL client for Node.js)**: `v8.11.3`
- **Nodemon**: `v3.1.0` (usado em desenvolvimento)

## 🚀 Configuração Inicial

### Pré-Requisitos

- Node.js instalado.
- PostgreSQL 16 instalado.
- Um banco de dados em branco criado no PostgreSQL para receber a restauração do dump.

### Instalação e Execução

##### #Clone o repositório:
```bash
git clone https://github.com/Rafael-720/Sistema-de-Gerenciamento-de-Clientes.git
```

#### ---- Backend

### Restaurando o Dump do Banco de Dados

1_ Criar Banco de Dados em Branco**: Se ainda não criou, abra o psql e crie um banco de dados em branco com o comando:
   ```sql
   CREATE DATABASE gerenciamento_clientes;
   ```

2_ Executar o Arquivo restaurar_dump.bat


##### #Instale as dependências
```bash
npm install
```

##### #Inicie o servidor Express:
```bash
npm start
```
##### #Ou, para desenvolvimento
```bash
npm run dev
```

#### ---- Frontend

##### #Navegue até a pasta do frontend
```bash
cd frontend
```

##### #Instale as dependências
```bash
npm install
```

##### #Inicie a aplicação React
```bash
npm start
```


