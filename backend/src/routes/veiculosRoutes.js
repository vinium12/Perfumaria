// src/routes/veiculoRoutes.js

import express from "express";
// 🚨 Importa a função do Controller
import { listarVeiculosPorRegiao } from "../controllers/veiculoController.js";

const router = express.Router();

// ✅ Rota Principal: Lida com todos os casos (listar todos ou filtrar por ?regiao=X)
// O Controller veiculoController.js que definimos anteriormente já faz o trabalho de
// verificar o query parameter 'regiao'.
router.get("/", listarVeiculosPorRegiao);

// ❌ Removida a rota /regiao/:id, pois o filtro agora é feito via Query String na rota principal.
// Se você tentar acessar /frota/regiao/5, o Express retornará 404.

export default router;