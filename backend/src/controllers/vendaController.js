// src/controllers/vendaController.js

import { 
  listarNotasComItens, 
  createNotaFiscal,
  createItensVenda,
  updateVenda,
  deleteVenda
} from "../models/vendaModel.js";

// ----------------------------------------------------------------------
// [READ] GET /vendas
// ----------------------------------------------------------------------
export const getNotas = async (req, res) => {
  try {
    const { regiao } = req.query;
    const notas = await listarNotasComItens(regiao || null);
    res.json(notas);
  } catch (err) {
    console.error("Erro ao listar vendas:", err);
    res.status(500).json({ message: "Erro ao listar vendas." });
  }
};

// ----------------------------------------------------------------------
// [CREATE] POST /vendas
// ----------------------------------------------------------------------
export const cadastrarVenda = async (req, res) => {
  try {
    const { vendedorId, clienteId, itens } = req.body;

    if (!vendedorId || !clienteId || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ message: "Dados incompletos para o cadastro da venda." });
    }

    // 🔹 Cria a nota fiscal (sem Status)
    const notaId = await createNotaFiscal(vendedorId, clienteId);

    // 🔹 Insere os itens vinculados à nota
    await createItensVenda(notaId, itens);

    res.status(201).json({ message: "Venda registrada com sucesso.", notaId });
  } catch (error) {
    console.error("Erro ao cadastrar venda:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar venda.", error });
  }
};

// ----------------------------------------------------------------------
// [UPDATE] PUT /vendas/:id
// ----------------------------------------------------------------------
export const atualizarVenda = async (req, res) => {
  const { id } = req.params;
  const { itens } = req.body;

  if (!Array.isArray(itens)) {
    return res.status(400).json({ message: "Lista de itens é obrigatória." });
  }

  try {
    const affectedRows = await updateVenda(id, itens);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Venda não encontrada ou não alterada." });
    }

    res.json({ message: "Venda atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar venda:", error);
    res.status(500).json({ message: "Erro interno ao atualizar venda." });
  }
};

// ----------------------------------------------------------------------
// [DELETE] DELETE /vendas/:id
// ----------------------------------------------------------------------
export const excluirVenda = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteVenda(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Venda não encontrada." });
    }
    res.json({ message: "Venda excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir venda:", error);
    res.status(500).json({ message: "Erro interno ao excluir venda." });
  }
};
