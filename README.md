 # Sistema de Gerenciamento de Clientes
 Plataforma de Gerenciamento e Otimização de Rotas para Serviços de Limpeza Residencial
 
Este projeto é um sistema de gerenciamento de clientes que utiliza **React** no frontend e **Node.js** com **Express** no backend. **PostgreSQL** é usado como banco de dados, e **Axios** é utilizado para realizar requisições HTTP entre o cliente e o servidor. A aplicação permite a adição, listagem, exclusão e busca de clientes, além de calcular o menor percurso de rota entre os clientes cadastrados se baseando no Problema do Caixeiro Viajante (PCV) que é um problema clássico de otimização combinatória.

link demonstração 
https://youtu.be/LulDWLF_IXE

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

#### ---- Banco de Dados

### Restaurando o Dump do Banco de Dados

1_ Criar Banco de Dados em Branco**: Se ainda não criou, abra o psql e crie um banco de dados em branco com o comando:
   ```sql
   CREATE DATABASE postgres;
   ```

2_ Navegue até a pasta do Backup_Banco
```bash
cd Backup_Banco
```

3_ Edite o arquivo restaurar_dump.bat com bloco de notas e confira se as configurações de porta -p, host -h, usuario -U e nome do banco -d estao corretas



4_ Executar o Arquivo restaurar_dump.bat, dai é só colocar a senha do banco em branco que foi c riado.



#### ---- Banco de Dados

##### #Navegue até a pasta do backend
```bash
cd ..
```

```bash
cd backend
```


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

##### #No diretorio raiz navegue até a pasta do frontend


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

### Endpoints da API

#### GET /clientes
Lista todos os clientes com opções de busca e ordenação.

#### POST /clientes
Cadastra um novo cliente.

#### DELETE /clientes/:id
Exclui um cliente pelo ID.

#### GET /calcular-rota
Calcula e retorna o menor percurso de rota entre todos os clientes cadastrados.



### Principais Funcionalidades

#### Listagem de Clientes
Exibe todos os clientes cadastrados em uma tabela com barra de rolagem, permitindo a visualização completa independente da quantidade de clientes.

#### Cadastro de Novos Clientes
Permite o cadastro de novos clientes com validação dos campos de entrada, assegurando que todas as informações necessárias sejam inseridas corretamente.

#### Exclusão de Clientes
Oferece a opção de excluir clientes específicos da base de dados.

#### Busca Dinâmica e Ordenação
Facilita a busca de clientes por nome, email, e telefone, com a possibilidade de ordenar os resultados por qualquer um desses campos ou pelas coordenadas geográficas, tanto em ordem ascendente quanto descendente.

#### Cálculo de Menor Percurso de Rota
Calcula e apresenta o menor percurso de rota a partir de um ponto inicial, otimizando a sequência de visitação dos clientes baseando-se em suas coordenadas geográficas. Esta funcionalidade é particularmente útil para otimizar rotas de entrega ou visitas.



