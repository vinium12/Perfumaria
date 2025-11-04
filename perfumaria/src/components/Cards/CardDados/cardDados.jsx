{
  /* Classe de Criação do Componente CardDados */
}

import React from "react";

{
  /* Import do CSS do Componente */
}
import styles from "./cardDados.module.css";

{
  /* Função de Criação do Card */
}
const CardDados = ({ regiao, qtnVen, qtnCli, veiculo, pontosE = [] }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>Região</h3>
      <hr className={styles.hr} />
      <div className={styles.detalhes}>
        <p className={styles.subtitulo}>Detalhes da Região:</p>
        <ul className={styles.lista}>
          <li>
            <strong>Região:</strong> {regiao}
          </li>
          <li>
            <strong>Vendedores:</strong> {qtnVen}
          </li>
          <li>
            <strong>Clientes:</strong> {qtnCli}
          </li>
          <li>
            <strong>Veículos:</strong> {veiculo}
          </li>
        </ul>
        <hr className={styles.hr2} />
      </div>
      <div className={styles.pontosE}>
        <p className={styles.subtitulo2}>Pontos Estratégicos:</p>
        <ul className={styles.pontos}>
          {pontosE.map((ponto, index) => (
            <li key={index}>{ponto}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardDados;
