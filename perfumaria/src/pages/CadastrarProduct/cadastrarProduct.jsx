import React from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionar
import styles from "../EditProduct/editproduct.module.css";
import Formedit from "../../components/EditForm/formedit";

const CadastrarProduto = () => {
  const navigate = useNavigate(); // Hook de navegação

  // ✅ CORRIGIDO: Chaves do frontend mapeadas para o backend
  const campos = [
    { name: "nome", label: "Nome", placeholder: "Digite o nome" },
    { name: "marca", label: "Marca", placeholder: "Digite a marca" },
    // Chave do backend é 'estoque', mas label é 'Quantidade'
    {
      name: "estoque",
      label: "Quantidade",
      type: "number",
      placeholder: "Digite a quantidade",
    },
    {
      name: "preco",
      label: "Preço",
      type: "number",
      placeholder: "Digite o preço",
    },
  ];

  const handleCadastrar = async (dados) => {
    console.log("Novo produto a ser enviado:", dados);

    try {
      const res = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados), // Os dados vêm do Formedit já formatados
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert(`Falha ao cadastrar: ${responseData.message}`);
        console.error("Erro ao cadastrar:", responseData);
        return;
      }

      // Sucesso
      alert("Produto cadastrado com sucesso!");

      // Redireciona de volta para a lista de produtos
      navigate("/produtos", { replace: true });
    } catch (err) {
      console.error("Erro de conexão/API:", err);
      alert("Erro de conexão com o servidor. Tente novamente.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo="Cadastrar Produto"
          modo="cadastrar"
          campos={campos}
          // A função Formedit deve garantir que os dados de "quantidade" sejam enviados como "estoque"
          // (Já corrigimos isso na prop `campos` acima)
          onCreate={handleCadastrar}
        />
      </div>
    </div>
  );
};

export default CadastrarProduto;