// ClientesContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);

    const fetchClientes = useCallback(() => {
        axios.get('http://localhost:3001/lista')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, []);

    // Valor que será passado para os consumidores do contexto
    const value = { clientes, fetchClientes };

    return <ClientesContext.Provider value={value}>{children}</ClientesContext.Provider>;
};

// Hook personalizado para facilitar o uso do contexto
export const useClientes = () => {
    const context = useContext(ClientesContext);
    if (context === undefined) {
        throw new Error('useClientes must be used within a ClientesProvider');
    }
    return context;
};
