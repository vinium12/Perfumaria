import express from "express";
import { 
    listarVeiculosPorRegiao, 
    getVeiculoAtual 
} from "../controllers/veiculoController.js";

const router = express.Router();

// Rota para a página de Frota (Cars.jsx)
// GET /veiculo?regiao=2
router.get("/", listarVeiculosPorRegiao);

// Rota para o Card da Dashboard (pega o veículo do dia)
// GET /veiculo/atual?regiaoId=2&vendedorId=1
router.get("/atual", getVeiculoAtual);

export default router;