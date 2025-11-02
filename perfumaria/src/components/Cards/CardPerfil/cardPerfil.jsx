{
  /* Classe de Criação do Componente CardPerfil */
}

import React from "react";

{
  /* Import do CSS do Componente */
}
import styles from "./cardPerfil.module.css";

{
  /* Função de Criação do Card */
}
const CardPerfil = ({ email, ender, tel, regiao, onEdit }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>Bem-vindo !</h3>

      <div className={styles.infoBase}>
        <p className={styles.subtitulo}>Informações Base:</p>
        <ul className={styles.lista}>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Endereço:</strong> {ender}
          </li>
          <li>
            <strong>Telefone:</strong> {tel}
          </li>
          <li>
            <strong>Região:</strong> {regiao}
          </li>
        </ul>
      </div>

      <div className={styles.botoes}>
        <button className={styles.botaoEditar} onClick={onEdit}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default CardPerfil;