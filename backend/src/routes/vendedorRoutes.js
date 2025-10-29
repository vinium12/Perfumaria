import express from "express";
import { listarVendedores, atualizarVendedor } from "../controllers/vendedorController.js";

const router = express.Router();

router.get("/", listarVendedores);
router.put("/:id", atualizarVendedor);

export default router;
