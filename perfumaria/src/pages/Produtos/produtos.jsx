import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table'; 
import styles from './produtos.module.css'; 

const Produtos = () => {
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Colunas para a tabela de produtos (sem Região, conforme corrigido anteriormente)
    const columns = ["Nome", "Marca", "Preço", "Estoque"]; 

    // 1. Funções de Ação (Handlers)
    const handleEdit = (produto) => {
        console.log("✏️ Editar Produto:", produto);
        // Lógica de redirecionamento para /editarproduto?id=produto.id viria aqui.
        alert(`Preparando para editar: ${produto.nome}`);
    };

    const handleDelete = (produto) => {
        console.log("🗑️ Excluir Produto:", produto);
        if (window.confirm(`Tem certeza que deseja excluir o produto ${produto.nome}?`)) {
            // Lógica de exclusão da API (DELETE) viria aqui.
            alert(`Produto ${produto.nome} excluído (simulado).`);
        }
    };

    // ✅ Lógica de FETCH COMPLETADA
    useEffect(() => {
        const fetchProdutos = async () => {
            setLoading(true);
            setError(null); // Limpa erros anteriores

            try {
                // Endpoint geral de produtos (sem filtro de região)
                const url = `http://localhost:3000/produtos`; 
                const res = await fetch(url);
                
                const data = await res.json();

                if (!res.ok) {
                    // Lança erro se o status for 4xx ou 5xx
                    throw new Error(data.message || 'Falha ao carregar produtos.');
                }
                
                // Mapeamento dos Dados
                const mappedProdutos = data.map(p => ({
                    id: p.ID_Produto, 
                    nome: p.Nome, 
                    marca: p.Marca, 
                    preco: p.Preco, 
                    estoque: p.Estoque, 
                }));
                
                setProdutos(mappedProdutos); 
                
            } catch (err) {
                // Captura erros de rede ou de parsing JSON
                setError(err.message); 
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setLoading(false); // ✅ Garante que o estado de loading seja false
            }
        };

        fetchProdutos();
    }, []); 

    if (loading) {
        // Exibe o carregamento enquanto a requisição está pendente
        return <div className={styles.loading}>Carregando produtos...</div>;
    }

    if (error) {
        // Exibe o erro se o fetch falhar
        return <div className={styles.error}>Erro: {error}</div>;
    }

    return (
        <div className={styles.produtosContainer}> 
            <h1 className={styles.pageTitle}>Produtos</h1>
            
            <div className={styles.tableWrapper}>
                
                <Table
                    columns={columns}
                    data={produtos}
                    
                    // ATIVA AS AÇÕES NA TABELA
                    showActions 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    
                    actionButton={<button className={styles.newButton}>Adicionar Novo Produto</button>}
                />

            </div>
        </div>  
    );  
};

export default Produtos;