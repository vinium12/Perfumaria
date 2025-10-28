import express from "express";
import { listarVendedores } from "../controllers/vendedorController.js";

const router = express.Router();

router.get("/", listarVendedores);

export default router;
