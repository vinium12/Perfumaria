import React from "react";
import styles from "./editPerfil.module.css";
import Formedit from "../../components/EditForm/formedit";

const EditarPerfil = () => {
  const campos = [
    { name: "email", label: "Email", type: "email", placeholder: "Digite seu email" },
    { name: "telefone", label: "Telefone", placeholder: "Digite seu telefone" },
    { name: "endereco", label: "Endereço", placeholder: "Digite seu endereço" },
  ];

  const handleSalvar = (dados) => {
    console.log("Dados do perfil:", dados);
    alert("Perfil salvo com sucesso!");
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo="Editar Perfil"
          campos={campos}
          onSubmit={handleSalvar}
        />
      </div>
    </div>
  );
};

export default EditarPerfil;
