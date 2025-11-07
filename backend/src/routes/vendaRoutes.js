import express from "express";
import { 
  getNotas, 
  cadastrarVenda, 
  atualizarVenda, 
  excluirVenda,
  getVenda
} from "../controllers/vendaController.js";

const router = express.Router();

router.get("/", getNotas);
router.post("/", cadastrarVenda);
router.put("/:id", atualizarVenda);
router.delete("/:id", excluirVenda);
router.get("/:id", getVenda); 

export default router;
