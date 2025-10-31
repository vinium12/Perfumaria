// src/models/dashboardModel.js

import pool from "../config/db.js";

// Busca Contagens e Nome da Região
export const getRegiaoMetrics = async (regiaoId) => {
    try {
        const [rows] = await pool.query(
            // Nota: Se a tabela Regiao tiver poucas colunas, o FROM regiao r LIMIT 1 é suficiente.
            `
            SELECT 
                (SELECT COUNT(ID_Vendedor) FROM vendedor WHERE ID_Regiao = ?) AS qtnVen,
                (SELECT COUNT(ID_Cliente) FROM cliente WHERE ID_Regiao = ?) AS qtnCli,
                (SELECT COUNT(ID_Veiculo) FROM veiculo WHERE ID_Regiao = ?) AS qtnVeiculo,
                r.Nome_Regiao
            FROM regiao r
            WHERE r.ID_Regiao = ?
            LIMIT 1
            `,
            [regiaoId, regiaoId, regiaoId, regiaoId]
        );
        return rows[0];
    } catch (error) {
        throw new Error("Falha ao buscar métricas da região.");
    }
};

// Busca Pontos Estratégicos REAIS
export const getPontosEstrategicos = async (regiaoId) => {
    try {
        const [rows] = await pool.query(
            // Usa a tabela 'pontos_estrategicos' e a coluna 'Desc_Ponto' (do seu modelo)
            "SELECT Desc_Ponto FROM pontos_estrategicos WHERE ID_Regiao = ?",
            [regiaoId]
        );
        
        return rows.map(row => row.Desc_Ponto); 
        
    } catch (error) {
        console.error("Erro ao buscar Pontos Estratégicos:", error);
        throw new Error("Falha ao buscar pontos estratégicos.");
    }
};