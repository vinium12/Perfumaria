// src/controllers/veiculoController.js
import { 
    getVeiculosByRegiao, 
    getAllVeiculos,
    findAssignmentByDate,
    createVeiculoAssignment
} from "../models/veiculoModel.js";

// --- FUNÇÃO PARA A PÁGINA /frota (Cars.jsx) ---
export const listarVeiculosPorRegiao = async (req, res) => {
  // O frontend (Cars.jsx) envia o parâmetro como 'regiao'
  const regiaoId = req.query.regiao; 

  if (!regiaoId && regiaoId !== 0) {
    // Se a Região não for fornecida, lista todos
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
    // Retorna o erro real do Model
    res.status(500).json({ message: error.message || "Erro interno do servidor." });
  }
};

// --- FUNÇÃO PARA O CARD DA DASHBOARD ---
export const getVeiculoAtual = async (req, res) => {
  try {
    const { regiaoId, vendedorId } = req.query;
    const dataAtual = new Date().toISOString().split('T')[0]; 

    if (!regiaoId || !vendedorId) {
      return res.status(400).json({ message: "ID da Região e ID do Vendedor são obrigatórios." });
    }

    let veiculoAtual = await findAssignmentByDate(vendedorId, dataAtual);

    if (!veiculoAtual) {
        console.log(`[LOG] Nenhuma atribuição encontrada para Vendedor ${vendedorId} em ${dataAtual}. Criando uma nova...`);

        const veiculosDaRegiao = await getVeiculosByRegiao(regiaoId);
        if (!veiculosDaRegiao || veiculosDaRegiao.length === 0) {
            return res.status(404).json({ message: "Nenhum veículo disponível nesta região." });
        }

        const diaDoMes = new Date().getDate();
        const index = (diaDoMes - 1) % veiculosDaRegiao.length;
        const veiculoDoDia = veiculosDaRegiao[index];

        await createVeiculoAssignment(vendedorId, veiculoDoDia.ID_Veiculo, dataAtual);
        veiculoAtual = veiculoDoDia;
    }
    
    res.json(veiculoAtual);

  } catch (err) {
    console.error("Erro ao buscar veículo atual:", err);
    res.status(500).json({ message: err.message || "Erro interno ao buscar veículo atual." });
  }
};