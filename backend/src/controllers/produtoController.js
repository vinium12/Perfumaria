// src/controllers/produtoController.js

import { getAllProdutos } from '../models/produtoModel.js'; // Apenas getAllProdutos

export const listarProdutos = async (req, res) => {
    // ❌ Ignoramos o req.query.regiao
    
    try {
        // ✅ Chama a função que busca todos
        const produtos = await getAllProdutos(); 
        res.json(produtos);
    } catch (error) {
        console.error("Erro no Controller ao listar produtos:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};