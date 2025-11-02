import { listarNotasComItens } from "../models/vendaModel.js";

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
