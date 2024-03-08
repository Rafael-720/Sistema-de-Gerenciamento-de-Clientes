import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, InputAdornment } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

function ListaClientes() {

    // useState para gerenciamento do estado dos clientes e controle do modal de rota
    const [clientes, setClientes] = useState([]);
    const [rota, setRota] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ordenacao, setOrdenacao] = useState({ campo: '', direcao: 'asc' });
    const [busca, setBusca] = useState('');
    

    // useEffect para buscar os clientes na montagem do componente
    useEffect(() => {
        const parametros = new URLSearchParams({
            ordenarPor: ordenacao.campo,
            direcao: ordenacao.direcao,
            busca
        });

        axios.get(`http://localhost:3001/clientes?${parametros.toString()}`)
            .then(response => setClientes(response.data))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, [ordenacao, busca]);


    // Solicita cálculo da rota mais eficiente para visitação dos clientes
    const handleCalcularRota = () => {
        axios.get('http://localhost:3001/calcular-rota')
            .then(response => {
                setRota(response.data);
                setModalOpen(true);
            })
            .catch(error => console.error('Erro ao calcular rota:', error));
    };

    const handleOrdenacaoClick = (campo) => {
        setOrdenacao(prevState => ({
            campo,
            direcao: prevState.campo === campo && prevState.direcao === 'asc' ? 'desc' : 'asc'
        }));
    };
      


    // Exclui um cliente
    const excluirCliente = (id) => {
        axios.delete(`http://localhost:3001/clientes/${id}`)
            .then(() => {
                alert('Cliente excluído com sucesso!');
                buscarClientes();
            })
            .catch(error => {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente.');
            });
    };
    
    
    const buscarClientes = () => {
        axios.get('http://localhost:3001/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    };
    
    
    useEffect(() => {
        buscarClientes();
    }, []);

    


      

    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 520,
        maxHeight: '80%', 
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', 
    };

    const tableStyle = {
        maxHeight: '400px', 
        overflow: 'auto' 
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>Lista de Clientes</h2>
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Pesquisar..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            <TableContainer component={Paper} style={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleOrdenacaoClick('nome')} style={{ cursor: 'pointer' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    Nome
                                    {ordenacao.campo === 'nome' ? (ordenacao.direcao === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                                </Box>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleOrdenacaoClick('email')} style={{ cursor: 'pointer' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    Email
                                    {ordenacao.campo === 'email' ? (ordenacao.direcao === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                                </Box>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleOrdenacaoClick('telefone')} style={{ cursor: 'pointer' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    Telefone
                                    {ordenacao.campo === 'telefone' ? (ordenacao.direcao === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                                </Box>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleOrdenacaoClick('coordenada_x')} style={{ cursor: 'pointer' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    Coordenada X
                                    {ordenacao.campo === 'coordenada_x' ? (ordenacao.direcao === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                                </Box>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleOrdenacaoClick('coordenada_y')} style={{ cursor: 'pointer' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    Coordenada Y
                                    {ordenacao.campo === 'coordenada_y' ? (ordenacao.direcao === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow
                                key={cliente.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="cliente">
                                    {cliente.nome}
                                </TableCell>
                                <TableCell align="right">{cliente.email}</TableCell>
                                <TableCell align="right">{cliente.telefone}</TableCell>
                                <TableCell align="right">{cliente.coordenada_x}</TableCell>
                                <TableCell align="right">{cliente.coordenada_y}</TableCell>
                                <TableCell align="right">
                                <IconButton onClick={() => excluirCliente(cliente.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" color="primary" onClick={handleCalcularRota} sx={{ mt: 2 }}>
                Calcular Rota
            </Button>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ordem de Visitação dos Clientes
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {rota.map((cliente, index) => (
                            <div key={index}>{cliente.nome} - Coordenadas: ({cliente.coordenada_x}, {cliente.coordenada_y})</div>
                        ))}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );


    



}

export default ListaClientes;
