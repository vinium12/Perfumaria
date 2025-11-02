{
  /* Classe de Criação do Componente CardAcesso */
}

import React from "react";

{
  /* Import do CSS do Componente */
}
import styles from "./cardAcesso.module.css";

{
  /* Função de Criação do Card */
}
const CardAcesso = ({ titulo, descricao, icon: Icon, onClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.titulo}>{titulo}</h3>
        {Icon && <Icon className={styles.icon} />}
      </div>
      <hr className={styles.hr} />
      <p className={styles.descricao}>{descricao}</p>

      <button className={styles.button} onClick={onClick}>
        Acessar
      </button>
    </div>
  );
};

export default CardAcesso;