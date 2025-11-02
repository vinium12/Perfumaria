// src/routes/produtoRoutes.js
import express from "express";
import {
  listarProdutos,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
} from "../controllers/produtoController.js";

const router = express.Router();

// [READ] GET /produtos
router.get("/", listarProdutos);

// [CREATE] POST /produtos
router.post("/", cadastrarProduto);

// [UPDATE] PUT /produtos/:id
router.put("/:id", atualizarProduto);

// [DELETE] DELETE /produtos/:id
router.delete("/:id", excluirProduto);

export default router;