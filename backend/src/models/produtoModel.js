// src/models/produtoModel.js

import pool from "../config/db.js";

// ✅ FUNÇÃO CORRIGIDA: Buscar TODOS os produtos (apenas as colunas existentes)
export const getAllProdutos = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                ID_Produto,
                Nome,
                Preco,
                Qtd_Estoque AS Estoque, 
                Marca
            FROM produto
            ORDER BY Nome
        `);
        return rows;
    } catch (error) {
        console.error("Erro no Model ao buscar produtos:", error);
        throw new Error("Falha ao buscar produtos no banco de dados.");
    }
};