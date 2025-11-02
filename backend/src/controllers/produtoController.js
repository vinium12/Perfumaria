// src/controllers/produtoController.js

import {
  getAllProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  // Mantenha listarProdutos ou getAllProdutos se estiver em outro arquivo
} from "../models/produtoModel.js";

export const cadastrarProduto = async (req, res) => {
  const { nome, preco, estoque, marca } = req.body;

  // ⚠️ Validação básica
  if (!nome || !preco || !estoque || !marca) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const id = await createProduto(nome, preco, estoque, marca);
    res.status(201).json({ message: "Produto cadastrado com sucesso.", id });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar produto." });
  }
};

// [UPDATE] PUT /produtos/:id
export const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, estoque, marca } = req.body;

  if (!nome || !preco || !estoque || !marca) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const affectedRows = await updateProduto(id, nome, preco, estoque, marca);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro interno ao atualizar produto." });
  }
};

// [DELETE] DELETE /produtos/:id
export const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteProduto(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro interno ao excluir produto." });
  }
};

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