{/* Classe de Criação do Componente CardDados */} 

import React from "react";

{/* Import do CSS do Componente */} 
import styles from './cardDados.module.css';

{/* Função de Criação do Card */}
const CardDados = ({ 
  titulo, regiao, qtnVen, qtnCli, veiculo, pontosE = [] }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>{titulo}</h3>

      <div className={styles.sessao}>
        <h4 className={styles.subtitulo}>Detalhes da região:</h4>
        <ul className={styles.lista}>
          <li><strong>Região:</strong> {regiao}</li>
          <li><strong>Vendedores:</strong> {qtnVen}</li>
          <li><strong>Clientes:</strong> {qtnCli}</li>
          <li><strong>Veículos:</strong> {veiculo}</li>
        </ul>
      </div>

      <div className={styles.sessao}>
        <h4 className={styles.subtitulo}>Pontos estratégicos:</h4>
        <ul className={styles.pontos}>
          {/* {pontosE.map((ponto, index) => (
            <li key={index}>{ponto}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default CardDados;