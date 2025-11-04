{
  /* Classe de Criação do Componente CardAtual, Esse é o Card com as Informações do Veículo Atual */
}

import React from "react";

{
  /* Import do CSS do Componente */
}
import styles from './cardAtual.module.css'

{
  /* Função de Criação do Card */
}
const CardAtual = ({ marca, modelo, placa, cor, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.titulo}>Veículo Atual</h3>
        <p className={styles.data}>{data}</p>
      </div>
      <hr className={styles.hr} />
      <div className={styles.infoVei}>
        <p className={styles.subtitulo}>Informações do Veículo:</p>
        <ul className={styles.lista}>
          <li>
            <strong>Marca:</strong> {marca}
          </li>
          <li>
            <strong>Modelo:</strong> {modelo}
          </li>
          <li>
            <strong>Placa:</strong> {placa}
          </li>
          <li>
            <strong>Cor:</strong> {cor}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardAtual;
