import express from "express";
import { getNotas } from "../controllers/vendaController.js";

const router = express.Router();

// Listar todas as vendas
router.get("/", getNotas);

// Criar nova venda
// router.post("/", createVenda);

// Deletar uma venda
// router.delete("/:id", deleteVenda);

export default router;
