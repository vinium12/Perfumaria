import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardNotaFiscal from '../../components/Cards/CardVendas/cardVenda';
import styles from './vendas.module.css';

const Vendas = () => {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ➕ Cadastrar nova venda
  const handleAdd = () => navigate('/cadastrarvenda');

  // ✏️ Editar venda
  const handleEdit = (venda) =>
    navigate(`/editarvenda/${venda.ID_Venda}`, { state: { venda } });

  // 🗑️ Deletar venda (requisição real)
  const handleDelete = async (venda) => {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir a venda #${venda.ID_Venda}? Esta ação é irreversível.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/vendas/${venda.ID_Venda}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert(`✅ Venda #${venda.ID_Venda} excluída com sucesso!`);
        // Atualiza a lista local sem recarregar a página
        setVendas((prev) => prev.filter((v) => v.ID_Venda !== venda.ID_Venda));
      } else {
        const errData = await res.json();
        alert(`❌ Erro ao excluir venda: ${errData.message || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error('Erro ao excluir venda:', err);
      alert('Erro ao conectar com o servidor.');
    }
  };

  // 🔄 Carrega vendas ao montar
  useEffect(() => {
    const fetchVendas = async () => {
      setLoading(true);
      setError(null);

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('Sessão não encontrada. Faça login.');
        setLoading(false);
        return;
      }

      const vendedor = JSON.parse(storedUser);
      const regiaoId = vendedor?.regiaoId;

      if (regiaoId === undefined || regiaoId === null) {
        if (regiaoId !== 0) {
          setError('ID da Região não encontrado na sessão.');
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(`http://localhost:3000/vendas?regiao=${regiaoId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Falha ao carregar vendas.');

        setVendas(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar vendas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  // ⏳ Estados visuais
  if (loading) return <div className={styles.loading}>Carregando Vendas...</div>;
  if (error) return <div className={styles.error}>Erro: {error}</div>;

  return (
    <div className={styles.vendasContainer}>
      <h1 className={styles.pageTitle}>Minhas Vendas</h1>

      <div className={styles.scrollableCards}>
        <div className={styles.cardsGrid}>
          {vendas.map((venda) => (
            <CardNotaFiscal
              key={venda.ID_Venda}
              venda={venda}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          {vendas.length === 0 && (
            <p className={styles.noData}>
              Nenhuma venda encontrada para esta região.
            </p>
          )}
        </div>
      </div>

      <button onClick={handleAdd} className={styles.newButton}>
        Registrar Nova Venda
      </button>
    </div>
  );
};

export default Vendas;
