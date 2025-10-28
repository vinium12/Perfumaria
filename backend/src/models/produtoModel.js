// src/models/produtoModel.js

import pool from "../config/db.js";

// ✅ FUNÇÃO CORRIGIDA: Buscar TODOS os produtos (sem filtro de WHERE)
export const getAllProdutos = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.ID_Produto,
                p.Nome,
                p.Marca,
                p.Preco,
                p.Qtd_Estoque AS Estoque, 
            FROM produto p
            ORDER BY p.Nome
        `);
        return rows;
    } catch (error) {
        console.error("Erro no Model ao buscar produtos:", error);
        throw new Error("Falha ao buscar produtos no banco de dados.");
    }
};

// ❌ REMOVIDA: A função getProdutosByRegiao (não é mais necessária)