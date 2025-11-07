import express from "express";
import {
  getAllProdutos,   // ✅ listar todos
  getProdutoById,   // ✅ buscar por ID
  createProduto,    // ✅ cadastrar
  updateProduto,    // ✅ atualizar
  deleteProduto     // ✅ excluir
} from "../controllers/produtoController.js";

const router = express.Router();

// [GET] Todos os produtos
router.get("/", getAllProdutos);

// [GET] Produto por ID
router.get("/:id", getProdutoById);

// [POST] Criar novo produto
router.post("/", createProduto);

// [PUT] Atualizar produto existente
router.put("/:id", updateProduto);

// [DELETE] Excluir produto
router.delete("/:id", deleteProduto);

export default router;
