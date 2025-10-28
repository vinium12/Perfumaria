import React from "react";
import styles from "../EditProduct/editproduct.module.css";
import Formedit from "../../components/EditForm/formedit";

const EditarProduto = () => {
  // campos do formulário
  const campos = [
    { name: "nome", label: "Nome", placeholder: "Digite o nome" },
    { name: "marca", label: "Marca", placeholder: "Digite a marca" },
    { name: "quantidade", label: "Quantidade", type: "number", placeholder: "Digite a quantidade" },
    { name: "preco", label: "Preço", type: "number", placeholder: "Digite o preço" },
  ];

  // valores iniciais do produto (simulando um produto já existente)
  const valoresIniciais = {
    nome: "",
    marca: "",
    quantidade: "",
    preco: "",
  };

  // função de atualização (edição)
  const handleAtualizar = (dados) => {
    console.log("Atualizar produto:", dados);
    alert("Produto atualizado com sucesso!");
    // aqui poderia entrar sua lógica de PUT/UPDATE (ex: API)
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo="Editar Produto"
          modo="editar"                     // força modo edição
          campos={campos}
          valoresIniciais={valoresIniciais} // dados carregados
          onUpdate={handleAtualizar}        // callback de update
        />
      </div>
    </div>
  );
};

export default EditarProduto;
