import React from "react";
import styles from "./editPerfil.module.css";
import Formedit from "../../components/EditForm/formedit";

const EditarPerfil = () => {
  // campos do formulário
  const campos = [
    { name: "email", label: "Email", type: "email", placeholder: "Digite seu email" },
    { name: "telefone", label: "Telefone", placeholder: "Digite seu telefone" },
    { name: "endereco", label: "Endereço", placeholder: "Digite seu endereço" },
  ];

  // valores atuais do usuário (pode vir de um fetch)
  const valoresIniciais = {
    email: "",
    telefone: "",
    endereco: "",
  };

  // callback para atualizar
  const handleAtualizar = (dados) => {
    console.log("Atualizar perfil:", dados);
    alert("Perfil atualizado com sucesso!");
    // aqui você chamaria a API de update
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <Formedit
          titulo="Editar Perfil"
          modo="editar"                  // força modo editar
          campos={campos}
          valoresIniciais={valoresIniciais}
          onUpdate={handleAtualizar}    // usa o callback de edição
        />
      </div>
    </div>
  );
};

export default EditarPerfil;
