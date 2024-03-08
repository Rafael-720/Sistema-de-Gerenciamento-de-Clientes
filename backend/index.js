/**
 * Servidor Express para gerenciamento de clientes com integração PostgreSQL.
 * Dependências principais: express, pg, bodyParser, cors, express-validator.
 */


const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); 
const { check, validationResult } = require('express-validator');

// Configuração inicial do servidor Express
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());


// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gerenciamento_clientes',
    password: 'postgres',
    port: 5432,
});

//Retorna todos todos os clientes do banco de dados, ordenados por nome
app.get('/lista', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM clientes ORDER BY nome ASC');
    res.json(rows);
});

//Obter todos os clientes q atendem aos criterios do filtro do campó de busca e ordenacao
app.get('/clientes', async (req, res) => {
    const { ordenarPor, direcao, busca } = req.query;

    let query = 'SELECT * FROM clientes WHERE 1=1';
    let queryParams = [];
    let index = 1;

    
    if (busca) {
        query += ` AND (nome ILIKE $${index++} OR email ILIKE $${index++} OR telefone ILIKE $${index})`;
        queryParams.push(`%${busca}%`, `%${busca}%`, `%${busca}%`);
        index++;
    }

    
    if (ordenarPor && (ordenarPor === 'nome' || ordenarPor === 'email' || ordenarPor === 'telefone' || ordenarPor === 'coordenada_x' || ordenarPor === 'coordenada_y')) {
        query += ` ORDER BY ${ordenarPor} ${direcao === 'desc' ? 'DESC' : 'ASC'}`;
    }

    try {
        const { rows } = await pool.query(query, queryParams);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//apaga o cliente do banco de dados
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
        res.status(200).send(`Cliente com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


  


// Cria um novo cliente no banco de dados.
app.post('/clientes', [
    check('nome').not().isEmpty().withMessage('O nome é obrigatório'),
    check('email').isEmail().withMessage('Forneça um email válido'),
    check('telefone').not().isEmpty().withMessage('O telefone é obrigatório'),
    check('coordenada_x').isFloat().withMessage('Coordenada X deve ser um número'),
    check('coordenada_y').isFloat().withMessage('Coordenada Y deve ser um número'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    const query = 'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, email, telefone, parseFloat(coordenada_x), parseFloat(coordenada_y)];
    try {
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Calcula a rota mais curta entre todos os clientes.
app.get('/calcular-rota', async (req, res) => {
    try {
        const { rows: clientes } = await pool.query('SELECT * FROM clientes');
        const rotaCalculada = calcularRota(clientes);
        res.json(rotaCalculada);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});



function calcularRota(clientes) {
    if (clientes.length === 0) return [];

    // a empresa localizada em [0,0]
    let pontoAtual = { coordenada_x: 0, coordenada_y: 0 };
    let rota = [];
    let distanciaTotal = 0;

    while (clientes.length > 0) {
        let indiceMaisProximo = 0;
        let distanciaMaisProxima = distanciaEntreDoisPontos(pontoAtual, clientes[0]);

        for (let i = 1; i < clientes.length; i++) {
            let distancia = distanciaEntreDoisPontos(pontoAtual, clientes[i]);
            if (distancia < distanciaMaisProxima) {
                indiceMaisProximo = i;
                distanciaMaisProxima = distancia;
            }
        }

        
        pontoAtual = clientes.splice(indiceMaisProximo, 1)[0];
        rota.push(pontoAtual);
        distanciaTotal += distanciaMaisProxima;
    }

    console.log(`Distância total da rota: ${distanciaTotal}`);
    return rota;
}

function distanciaEntreDoisPontos(pontoA, pontoB) {
    return Math.sqrt(
        Math.pow(pontoB.coordenada_x - pontoA.coordenada_x, 2) +
        Math.pow(pontoB.coordenada_y - pontoA.coordenada_y, 2)
    );
}



app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
