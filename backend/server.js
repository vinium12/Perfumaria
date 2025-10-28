import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vendedoresRoutes from "./src/routes/vendedorRoutes.js";

// src/server.js (Novo conteúdo)

// 1. O app que contém as rotas e middlewares (criado no app.js)
import app from "./src/app.js";

dotenv.config();

// Define a porta, usando a variável de ambiente ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// 2. Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});

// Nota: Você pode precisar ajustar a chamada "import app from './app.js';"
// se o seu arquivo app.js estiver em outro lugar (ex: './app.js' se estiver na mesma pasta raiz).