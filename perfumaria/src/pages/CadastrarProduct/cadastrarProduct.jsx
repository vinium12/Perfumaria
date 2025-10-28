import React from "react";
import styles from "../EditProduct/editproduct.module.css"; // reaproveita o mesmo css
import Formedit from "../../components/EditForm/formedit";

const CadastrarProduto = () => {
  const campos = [
    { name: "nome", label: "Nome", placeholder: "Digite o nome" },
    { name: "marca", label: "Marca", placeholder: "Digite a marca" },
    { name: "quantidade", label: "Quantidade", type: "number", placeholder: "Digite a quantidade" },
    { name: "preco", label: "Preço", type: "number", placeholder: "Digite o preço" },
  ];

  const handleCadastrar = (dados) => {
    console.log("Novo produto cadastrado:", dados);
    alert("Produto cadastrado com sucesso!");
    // Aqui entraria a chamada de API (exemplo: POST /produtos)
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo="Cadastrar Produto"
          modo="cadastrar"        // ativa o modo de criação
          campos={campos}
          onCreate={handleCadastrar}
        />
      </div>
    </div>
  );
};

export default CadastrarProduto;
