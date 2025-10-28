import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table'; 
import styles from './produtos.module.css'; 

const Produtos = () => {
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Colunas para a tabela de produtos
    const columns = ["Nome", "Marca", "Preço", "Estoque"]; 

    useEffect(() => {
        const fetchProdutos = async () => {
            setLoading(true);
            
            // ❌ REMOVIDA toda a lógica de filtro de sessão, pois os produtos são gerais
            
            try {
                // ✅ URL CORRIGIDA: Aponta para o novo endpoint geral de PRODUTOS
                const url = `http://localhost:3000/produtos`; 
                const res = await fetch(url);
                
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Falha ao carregar produtos.');
                }
                
                // Mapeamento dos Dados de PRODUTO (pode ser necessário renomear chaves)
                const mappedProdutos = data.map(p => ({
                    id: p.ID_Produto, 
                    nome: p.Nome, 
                    marca: p.Marca, 
                    // As chaves a seguir devem ser mapeadas conforme o retorno do backend
                    preco: p.Preco, 
                    estoque: p.Estoque, // Assumindo Estoque (Qtd_Estoque no BD)
                    
                }));
                
                setProdutos(mappedProdutos); 
                
            } catch (err) {
                // Se o erro for 404/500, significa que o backend não está rodando ou a rota está errada
                setError(err.message); 
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []); 

    if (loading) {
        return <div className={styles.loading}>Carregando produtos...</div>;
    }

    if (error) {
        return <div className={styles.error}>Erro: {error}</div>;
    }

    return (
        <div className={styles.produtosContainer}> 
            <h1 className={styles.pageTitle}>Produtos</h1>
            
            <div className={styles.tableWrapper}>
                
                <Table
                    columns={columns}
                    data={produtos} 
                />

            </div>
        </div>  
    );  
};

export default Produtos;