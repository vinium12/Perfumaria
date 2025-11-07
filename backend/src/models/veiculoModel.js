// src/models/veiculoModel.js
import pool from "../config/db.js";

// Função para buscar veículos por ID da Região
export const getVeiculosByRegiao = async (regiaoId) => {
  try {
    // ✅ CORREÇÃO: Removida a quebra de linha/espaços antes do SELECT
    const [rows] = await pool.query(
`SELECT 
    v.ID_Veiculo,
    v.Placa,
    v.Modelo,
    v.Marca,
    v.Cor,
    r.Nome_Regiao AS Regiao
FROM veiculo v
INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
WHERE v.ID_Regiao = ?`,
      [regiaoId] // Filtra pela região fornecida
    );
    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar veículos por região:", error);
    throw new Error("Falha ao buscar veículos por região.");
  }
};

// Função para buscar TODOS os veículos:
export const getAllVeiculos = async () => {
  try {
    // ✅ CORREÇÃO: Removida a quebra de linha/espaços antes do SELECT
    const [rows] = await pool.query(
`SELECT 
    v.ID_Veiculo, v.Placa, v.Modelo, v.Marca, v.Cor, r.Nome_Regiao AS Regiao
FROM veiculo v
INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao`);
    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar todos os veículos:", error);
    throw new Error("Falha ao buscar todos os veículos no banco de dados.");
  }
};

// ------------------------------------------------------------------
// 🔹 FUNÇÕES (Para a tabela resp_veiculo - Lógica da Dashboard)
// ------------------------------------------------------------------

export const findAssignmentByDate = async (vendedorId, dataAtual) => {
    try {
        // ✅ CORREÇÃO: Removida a quebra de linha/espaços antes do SELECT
        const [rows] = await pool.query(
`SELECT 
    v.Placa, v.Modelo, v.Marca, v.Cor
FROM resp_veiculo rv
JOIN veiculo v ON rv.ID_Veiculo = v.ID_Veiculo
WHERE rv.ID_Vendedor = ? AND rv.Data = ?
LIMIT 1`,
            [vendedorId, dataAtual]
        );
        return rows[0]; 
    } catch (error) {
        throw new Error("Erro ao buscar atribuição de veículo.");
    }
};

export const createVeiculoAssignment = async (vendedorId, veiculoId, dataAtual) => {
     try {
        // ✅ CORREÇÃO: Removida a quebra de linha/espaços antes do INSERT
        const [result] = await pool.query(
"INSERT INTO resp_veiculo (ID_Vendedor, ID_Veiculo, Data) VALUES (?, ?, ?)",
            [vendedorId, veiculoId, dataAtual]
        );
        return result.affectedRows > 0;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return true; 
        }
        throw new Error("Erro ao salvar atribuição de veículo.");
    }
};