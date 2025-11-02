import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardNotaFiscal from '../../components/Cards/CardVendas/cardVenda'; 
import styles from './vendas.module.css'; 

const Vendas = () => {
    const navigate = useNavigate();
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handlers de Ação
    const handleAdd = () => navigate('/cadastrarvenda');
    const handleEdit = (venda) => navigate(`/editarvenda/${venda.ID_Venda}`, { state: { venda } });
    
    const handleDelete = (venda) => {
        if (!window.confirm(`Deseja excluir a venda #${venda.ID_Venda}? Esta ação é irreversível.`)) return;
        
        // ⚠️ Lógica DELETE no backend entraria aqui
        console.log(`Simulação: Excluindo venda ${venda.ID_Venda}`);
        setVendas(vendas.filter(v => v.ID_Venda !== venda.ID_Venda)); 
    };

    // LÓGICA DE FETCH REAL
    useEffect(() => {
        const fetchVendas = async () => {
            setLoading(true);
            setError(null);

            // 1. OBTÉM O ID DA REGIÃO DO VENDEDOR LOGADO
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                setError("Sessão não encontrada. Faça login.");
                setLoading(false);
                return;
            }
            
            const vendedor = JSON.parse(storedUser);
            const regiaoId = vendedor?.regiaoId; 
            
            if (regiaoId === undefined || regiaoId === null) {
                if (regiaoId !== 0) { 
                    setError("ID da Região não encontrado na sessão.");
                    setLoading(false);
                    return;
                }
            }

            try {
                // 2. REQUISIÇÃO REAL: Endpoint /vendas filtrado por região
                const url = `http://localhost:3000/vendas?regiao=${regiaoId}`;
                const res = await fetch(url);
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.message || 'Falha ao carregar vendas.');
                }
                
                setVendas(data);
                
            } catch (err) {
                setError(err.message);
                console.error("Erro ao buscar vendas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendas();
    }, []); 

    if (loading) return <div className={styles.loading}>Carregando Vendas...</div>;
    if (error) return <div className={styles.error}>Erro: {error}</div>;

    return (
        <div className={styles.vendasContainer}>
            
            
                <h1 className={styles.pageTitle}>Minhas Vendas</h1>
          
            
            <div className={styles.scrollableCards}>
                <div className={styles.cardsGrid}>
                    {vendas.map(venda => (
                        <CardNotaFiscal 
                            key={venda.ID_Venda}
                            venda={venda}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    {vendas.length === 0 && <p className={styles.noData}>Nenhuma venda encontrada para esta região.</p>}
                </div>
            </div>
                    <button 
                    onClick={handleAdd} 
                    className={styles.newButton} 
                >
                    Registrar Nova Venda
                </button>
        </div>
    );
};

export default Vendas;