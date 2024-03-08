/**
 * App.js: Componente principal que renderiza a lista de clientes e o formulário de cadastro.
 */

/**
 * Clientes.js: Gerencia a exibição, busca, ordenação e exclusão de clientes.
 */

/**
 * NovoCliente.js: Formulário para cadastro de novos clientes.
 */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Clientes from './Clientes';
import NovoCliente from './NovoCliente';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

function App() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get('http://localhost:3001/lista')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao buscar clientes:', error));
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', margin: '20px 0', textAlign: 'center' }}>
            Sistema de Gerenciamento de Clientes
          </Typography>
          <Clientes/>
          <NovoCliente onClienteCadastrado={fetchClientes} />
        </Box>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
