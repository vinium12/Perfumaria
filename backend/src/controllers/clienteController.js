// src/controllers/clienteController.js

import { getClientesByRegiao } from "../models/clienteModel.js"; // 👈 NOVO nome da função

export const listarClientes = async (req, res) => {
  // 1. Obtém o ID da Região dos parâmetros de consulta da URL (Ex: /clientes?regiao=1)
  const { regiao } = req.query;

  // O ID da Região é OBRIGATÓRIO para o filtro
  if (!regiao) {
    return res.status(400).json({
      message: "ID da Região é obrigatório para listar clientes filtrados.",
    });
  }

  try {
    // 2. Chama a nova função do Model, passando o ID da Região
    const clientes = await getClientesByRegiao(regiao);

    res.json(clientes);
  } catch (err) {
    console.error("Erro no Controller ao listar clientes:", err);
    res.status(500).json({
      message: "Erro interno do servidor ao listar clientes.",
      error: err.message,
    });
  }
};

// Se você está usando o modelo anterior, o nome do arquivo continua sendo clienteController.js