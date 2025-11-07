// backend/src/controllers/produtoController.js
import * as ProdutoModel from "../models/produtoModel.js";

// [GET] Todos os produtos
export const getAllProdutos = async (req, res) => {
  try {
    const produtos = await ProdutoModel.getAllProdutos(); // ✅ CORRETO
    res.json(produtos);
  } catch (error) {
    console.error("Erro no Controller ao listar produtos:", error);
    res.status(500).json({ message: "Erro interno do servidor ao buscar produtos." });
  }
};

// [GET] Produto por ID
export const getProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await ProdutoModel.getProdutoById(id); // ✅ CORRETO

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res.status(500).json({ message: "Erro interno ao buscar produto." });
  }
};

// [POST] Criar Produto
export const createProduto = async (req, res) => {
  try {
    const { nome, preco, qtdEstoque, marca } = req.body;
    const id = await ProdutoModel.createProduto(nome, preco, qtdEstoque, marca); // ✅ CORRETO
    res.status(201).json({ message: "Produto criado com sucesso!", id });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto." });
  }
};

// [PUT] Atualizar Produto
export const updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    let { nome, preco, qtdEstoque, marca } = req.body;

    preco = Number(preco) || 0;
    qtdEstoque = Number(qtdEstoque) || 0;

    const linhasAfetadas = await ProdutoModel.updateProduto(id, nome, preco, qtdEstoque, marca);

    if (!linhasAfetadas) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};


// [DELETE] Excluir Produto
export const deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const linhasAfetadas = await ProdutoModel.deleteProduto(id); // ✅ CORRETO

    if (!linhasAfetadas) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto." });
  }
};
