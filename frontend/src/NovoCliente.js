/**
 * NovoCliente.js: Componente de formulário para o cadastro de novos clientes.
 * Permite a inserção de informações como nome, email, telefone e coordenadas geográficas.
 * Inclui validação de campos obrigatórios e feedback visual através de mensagens de erro.
 */


import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

function NovoCliente({ onClienteCadastrado }) {
    // Estados para armazenamento dos valores dos campos do formulário e erros de validação
    const { enqueueSnackbar } = useSnackbar();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [coordenadaX, setCoordenadaX] = useState('');
    const [coordenadaY, setCoordenadaY] = useState('');

    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        telefone: '',
        coordenadaX: '',
        coordenadaY: '',
    });
    


    /**
     * validateFields: Função para validar os campos do formulário.
     * Verifica se todos os campos estão preenchidos e atualiza o estado de erros.
     * Retorna verdadeiro se todos os campos estiverem válidos.
     */
    const validateFields = () => {
        let tempErrors = { ...errors };
        tempErrors.nome = nome ? '' : 'Nome é obrigatório';
        tempErrors.email = email ? '' : 'Email é obrigatório';
        tempErrors.telefone = telefone ? '' : 'Telefone é obrigatório';
        tempErrors.coordenadaX = coordenadaX ? '' : 'Coordenada X é obrigatória';
        tempErrors.coordenadaY = coordenadaY ? '' : 'Coordenada Y é obrigatória';
        setErrors({ ...tempErrors });
      
        
        return Object.values(tempErrors).every(x => x === "");
    };



    /**
     * handleSubmit: Manipulador do evento de submissão do formulário.
     * Valida os campos e, se estiverem corretos, realiza uma requisição POST para cadastrar o novo cliente.
     * Após o cadastro, limpa os campos do formulário e atualiza a lista de clientes.
     */

    const handleSubmit = (e) => {
        e.preventDefault();

   
        if(validateFields()){
            axios.post('http://localhost:3001/clientes', { nome, email, telefone, coordenada_x: coordenadaX, coordenada_y: coordenadaY })
            .then((response) => {
                enqueueSnackbar('Cliente cadastrado com sucesso!', { variant: 'success' });
                
                setNome('');
                setEmail('');
                setTelefone('');
                setCoordenadaX('');
                setCoordenadaY('');
                setErrors({}); 
                onClienteCadastrado(); 
            })
            .catch(error => {
                enqueueSnackbar('Erro ao cadastrar cliente: ' + error.message, { variant: 'error' });
            });
        } else {
            enqueueSnackbar('Por favor, preencha todos os campos.', { variant: 'warning' });
        }
};

  return (

    // Renderização do formulário com validação visual dos campos
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Nome"
        autoFocus
        value={nome}
        onChange={e => setNome(e.target.value)}
        error={!!errors.nome}
        helperText={errors.nome}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Telefone"
        type="number" 
        value={telefone}
        onChange={e => setTelefone(e.target.value)}
        error={!!errors.telefone}
        helperText={errors.telefone}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Coordenada X"
        type="number" 
        value={coordenadaX}
        onChange={e => setCoordenadaX(e.target.value)}
        error={!!errors.coordenadaX}
        helperText={errors.coordenadaX}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Coordenada Y"
        type="number" 
        value={coordenadaY}
        onChange={e => setCoordenadaY(e.target.value)}
        error={!!errors.coordenadaY}
        helperText={errors.coordenadaY}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Cadastrar
      </Button>
    </Box>
  );
}

  

export default NovoCliente;
