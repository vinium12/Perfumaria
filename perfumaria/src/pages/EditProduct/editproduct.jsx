import React, { useState, useEffect } from "react"; // 👈 Importa hooks
import { useLocation, useNavigate } from "react-router-dom"; // 👈 Importa useLocation e useNavigate
import Formedit from "../../components/EditForm/formedit";
import styles from "../EditProduct/editproduct.module.css";

const EditarProduto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Campos do formulário (Ajustado 'quantidade' para 'estoque' para bater com o backend)
  const campos = [
    { name: "nome", label: "Nome", placeholder: "Digite o nome" },
    { name: "marca", label: "Marca", placeholder: "Digite a marca" },
    {
      name: "estoque",
      label: "Quantidade",
      type: "number",
      placeholder: "Digite a quantidade",
    }, // ✅ Corrigido para 'estoque'
    {
      name: "preco",
      label: "Preço",
      type: "number",
      placeholder: "Digite o preço",
    },
  ];

  useEffect(() => {
    // 1. LÊ OS DADOS PASSADOS PELO `handleEdit`
    if (location.state && location.state.produto) {
      const produtoParaEditar = location.state.produto;

      // Corrige o nome da chave: o backend espera 'estoque', mas o dado pode vir como 'quantidade' ou 'Qtd_Estoque'
      // Assumindo que o dado vem como {id: X, nome: ..., estoque: ..., etc.}
      // Se o dado vier como 'quantidade', mapeamos:
      produtoParaEditar.quantidade = produtoParaEditar.estoque;

      setInitialData(produtoParaEditar);
      setLoading(false);
    } else {
      // Se não houver dados, exibe erro e redireciona
      setError("Nenhum produto selecionado para edição. Redirecionando...");
      setLoading(false);
      setTimeout(() => navigate("/produtos", { replace: true }), 3000);
    }
  }, [location.state, navigate]);

  // 2. Função de atualização (Edição) com chamada PUT para a API
  const handleAtualizar = async (dados) => {
    if (!initialData || !initialData.id) {
      alert("Erro: ID do produto não encontrado.");
      return;
    }

    const produtoId = initialData.id;

    // Mapeia a chave 'quantidade' do formulário de volta para 'estoque' no corpo da API
    const dadosAPI = {
    nome: dados.nome,
    marca: dados.marca,
    qtdEstoque: Number(dados.estoque) || 0,
    preco: Number(dados.preco) || 0,
};


    try {
      const res = await fetch(`http://localhost:3000/produtos/${produtoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAPI),
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert(`Falha ao atualizar: ${responseData.message}`);
        return;
      }

      alert("Produto atualizado com sucesso!");

      // Redireciona de volta para a lista de produtos
      navigate("/produtos");
    } catch (err) {
      console.error("Erro de conexão/API:", err);
      alert("Erro de conexão com o servidor. Tente novamente.");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando dados do produto...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (  
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo={`Editar Produto:`}
          modo="editar"
          campos={campos}
          // 3. PASSA OS DADOS CARREGADOS PARA O FORMULÁRIO
          valoresIniciais={initialData}
          onUpdate={handleAtualizar}
        />
      </div>
    </div>
  );
};

export default EditarProduto;