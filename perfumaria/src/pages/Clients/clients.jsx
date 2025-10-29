import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/table'; 
import styles from './clients.module.css'; 

const Clients = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Define as colunas que seu componente Table espera
    const columns = ["Nome", "Endereço", "Email"];

    useEffect(() => {
        const fetchClientes = async () => {
            setLoading(true);
            
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                setError("Sessão não encontrada.");
                setLoading(false);
                return;
            }

            const vendedor = JSON.parse(storedUser);
            const regiaoId = vendedor.regiaoId;
           
           if (regiaoId === undefined || regiaoId === null) {
                // Se não for encontrado, e não for o valor 0 (caso 0 seja permitido)
                if (regiaoId !== 0) { 
                    setError("ID da Região não encontrado na sessão.");
                    setLoading(false);
                    return;
                }
            }
            
            try {
                // Endpoint já configurado no backend para filtrar por regiao
                const res = await fetch(`http://localhost:3000/clientes?regiao=${regiaoId}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Falha ao carregar clientes.');
                }
                
                // 2. Mapeamento dos Dados (para garantir que as chaves da tabela funcionem)
                // Assumimos que o backend retorna: {Nome: '...', Endereco: '...', Email: '...'}
                // E a Tabela espera: {nome: '...', endereco: '...', email: '...'}
                const mappedClientes = data.map(cliente => ({
                    nome: cliente.Nome,
                    endereco: cliente.endereco_db, // Ou 'Endereço' se a coluna SQL tiver acento, mas minúsculo
                    email: cliente.Email,
                    // Garanta que você passe o ID para o key da linha da tabela, se necessário
                    id: cliente.ID_Cliente 
                }));
                
                setClientes(mappedClientes);
                
            } catch (err) {
                setError(err.message);
                console.error("Erro ao buscar clientes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []); 

    if (loading) {
        return <div>Carregando clientes...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</div>;
    }
    
    return (
        <div className={styles.clientesContainer}>
            <h1 className={styles.pageTitle}>Clientes</h1>
            
            <div className={styles.tableWrapper}>

                
                <Table
                columns={columns} 
                data={clientes}  
                />

            </div>
        </div>  
    );
};

export default Clients;