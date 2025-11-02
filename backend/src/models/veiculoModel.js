// src/models/veiculoModel.js
import pool from "../config/db.js";

// Função para buscar veículos por ID da Região
export const getVeiculosByRegiao = async (regiaoId) => {
  try {
    const [rows] = await pool.query(
      `
            SELECT 
                v.ID_Veiculo,
                v.Placa,
                v.Modelo,
                v.Marca,
                v.Cor,
                r.Nome_Regiao AS Regiao
            FROM veiculo v
            INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
            WHERE v.ID_Regiao = ? 
            `,
      [regiaoId] // Filtra pela região fornecida
    );
    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar veículos por região:", error);
    throw new Error("Falha ao buscar veículos no banco de dados.");
  }
};

// Se você precisar da rota para buscar TODOS os veículos:
export const getAllVeiculos = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT 
                v.ID_Veiculo, v.Placa, v.Modelo, v.Marca, v.Cor, r.Nome_Regiao AS Regiao
            FROM veiculo v
            INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
        `);
    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar todos os veículos:", error);
    throw new Error("Falha ao buscar todos os veículos no banco de dados.");
  }
};