import React, { useEffect, useState } from "react";
import Table from "../../components/Table/table";
import { useNavigate } from "react-router-dom";
import styles from "./produtos.module.css";

const Produtos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colunas para a tabela de produtos (sem Região, conforme corrigido anteriormente)
  const columns = ["Nome", "Marca", "Preço", "Estoque"];

  // 1. Funções de Ação (Handlers)
  const handleEdit = (produto) => {
    console.log("✏️ Editar Produto:", produto);

    // O backend espera o ID na URL, então passamos o ID como parâmetro de estado ou na URL

    // ✅ Redireciona para a rota de edição de produto
    navigate(`/editarproduto?id=${produto.id}`, {
      // Passa o objeto completo do produto para a página de edição via state (mais fácil de carregar)
      state: { produto: produto },
    });
  };

  const handleDelete = async (produto) => {
    console.log("🗑️ Excluir Produto:", produto);

    // 1. Confirmação do Usuário
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o produto ${produto.nome}?`
      )
    ) {
      return; // Sai se o usuário cancelar
    }

    try {
      const url = `http://localhost:3000/produtos/${produto.id}`;

      // 2. Requisição DELETE para o Backend
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Falha na exclusão.");
      }

      // 3. SUCESSO: Atualiza a lista no frontend (sem precisar recarregar tudo)
      setProdutos(produtos.filter((p) => p.id !== produto.id));
      alert(`Produto ${produto.nome} excluído com sucesso!`);
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert(`Erro ao excluir: ${err.message}`);
    }
  };

  const handleAddProduct = () => {
    // ✅ NAVEGA PARA A ROTA DE CADASTRO DE PRODUTO
    navigate("/cadastrarproduto");
  };

  const NovoProdutoButton = (
    <button
      onClick={handleAddProduct} // ✅ Anexa a função de navegação
      className={styles.newButton} // Use a classe que você definir para o botão
    >
      Adicionar Novo Produto
    </button>
  );

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
          throw new Error(data.message || "Falha ao carregar produtos.");
        }

        // Mapeamento dos Dados
        const mappedProdutos = data.map((p) => ({
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
          actionButton={NovoProdutoButton}
        />
      </div>
    </div>
  );
};

export default Produtos;