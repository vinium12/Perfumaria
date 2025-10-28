import React from "react";
import styles from "../EditProduct/editproduct.module.css";
import Formedit from "../../components/EditForm/formedit";

const EditarProduto = () => {
  const campos = [
    { name: "nome", label: "Nome", placeholder: "Digite o nome" },
    { name: "marca", label: "Marca", placeholder: "Digite a marca" },
    { name: "quantidade", label: "Quantidade", type: "number", placeholder: "Digite a quantidade" },
    { name: "preco", label: "Preço", type: "number", placeholder: "Digite o preço" },
  ];

  const handleSalvar = (dados) => {
    console.log("Produto:", dados);
    alert("Produto salvo com sucesso!");
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit titulo="Editar Produto" campos={campos} onSubmit={handleSalvar} />
      </div>
    </div>
  );
};

export default EditarProduto;
