// src/controllers/produtoController.js

import { getAllProdutos } from '../models/produtoModel.js'; 

export const listarProdutos = async (req, res) => {
    // A função é simples, pois o Model já está tratando tudo
    try {
        const produtos = await getAllProdutos(); 
        res.json(produtos);
    } catch (error) {
        console.error("Erro no Controller ao listar produtos:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};