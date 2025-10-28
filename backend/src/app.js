// src/app.js (Conteúdo corrigido)

import express from "express";
import cors from "cors";
import vendedorRoutes from "./routes/vendedorRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // 👈 NÃO ESQUEÇA DE IMPORTAR AS ROTAS DE AUTH
import clienteRoutes from "./routes/clienteRoutes.js";

const app = express();

app.use(cors()); // Permite o React acessar o backend
app.use(express.json()); // Middleware para interpretar JSON

// Rota de Vendedores
app.use("/vendedores", vendedorRoutes);

// Rota de Autenticação (CRUCIAL para o seu login POST /auth/login)
app.use("/auth", authRoutes); 
app.use("/clientes", clienteRoutes); // Isso define o prefixo /clientes

// 👈 Exporta o objeto 'app' para que server.js possa usá-lo
export default app;