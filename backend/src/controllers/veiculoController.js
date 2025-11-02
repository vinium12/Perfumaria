// src/controllers/veiculoController.js
import { getVeiculosByRegiao, getAllVeiculos } from "../models/veiculoModel.js";

// Controller para listar veículos filtrados por região (URL: /frota?regiao=X)
export const listarVeiculosPorRegiao = async (req, res) => {
  // Pegaremos o ID da Região via Query String, o que é mais limpo que /regiao/:id
  const regiaoId = req.query.regiao;

  if (!regiaoId) {
    // Se a Região não for fornecida, podemos listar todos (opcional) ou exigir o filtro
    try {
      const veiculos = await getAllVeiculos();
      return res.json(veiculos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao listar todos os veículos." });
    }
  }

  try {
    const veiculos = await getVeiculosByRegiao(regiaoId);
    res.json(veiculos);
  } catch (error) {
    console.error("Erro no Controller ao listar veículos:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};