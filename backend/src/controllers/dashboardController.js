// src/controllers/dashboardController.js
import { getRegiaoMetrics, getPontosEstrategicos } from '../models/dashboardModel.js';

export const getDashboardData = async (req, res) => {
    const regiaoId = req.query.regiao;

    if (!regiaoId && regiaoId !== 0) {
        return res.status(400).json({ message: "ID da Região é obrigatório." });
    }

    try {
        const metrics = await getRegiaoMetrics(regiaoId);
        const pontosE = await getPontosEstrategicos(regiaoId);
        
        res.json({
            qtnVen: metrics.qtnVen || 0,
            qtnCli: metrics.qtnCli || 0,
            qtnVeiculo: metrics.qtnVeiculo || 0,
            nomeRegiao: metrics.Nome_Regiao,
            pontosE: pontosE
        });
    } catch (error) {
        console.error("Erro no Controller Dashboard:", error);
        res.status(500).json({ message: "Erro interno ao buscar dados do Dashboard." });
    }
};