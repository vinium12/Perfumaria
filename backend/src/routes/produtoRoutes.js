// src/routes/produtoRoutes.js
import express from "express";
import { listarProdutos } from "../controllers/produtoController.js";

const router = express.Router();

// Rota principal: Lida com todos os filtros por Query String
router.get("/", listarProdutos); 

export default router;