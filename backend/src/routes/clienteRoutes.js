// src/routes/clienteRoutes.js
import express from 'express';
import { listarClientes } from '../controllers/clienteController.js';

const router = express.Router();

// Define a rota GET para listar clientes.
// O caminho final será /clientes (assumindo o prefixo em app.js)
router.get('/', listarClientes);

export default router;