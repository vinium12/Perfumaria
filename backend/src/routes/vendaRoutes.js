import express from "express";
import { 
  getNotas, 
  cadastrarVenda, 
  atualizarVenda, 
  excluirVenda 
} from "../controllers/vendaController.js";

const router = express.Router();

router.get("/", getNotas);
router.post("/", cadastrarVenda);
router.put("/:id", atualizarVenda);
router.delete("/:id", excluirVenda);

export default router;
