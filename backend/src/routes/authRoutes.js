// Arquivo: src/routes/authRoutes.js

import express from "express";

// Importa a função login do seu controlador
import { login } from '../controllers/vendedorController.js'; 

const router = express.Router();

// Define que requisições POST para /login devem ser tratadas pela função login
// O prefixo /auth foi definido em app.js, então esta rota completa é POST /auth/login
router.post('/login', login); 

export default router;
// import pool from "../config/db.js";

// // O uso de `const router = express.Router();` já está correto.
// // Se houver problemas de importação, troque "import express from 'express';"
// // por: import pkg from 'express'; const { Router } = pkg; const router = Router();
// // Mas por enquanto, vamos manter o seu original que deve funcionar:
// const router = express.Router();

// router.post("/login", async (req, res) => {
//     const { email, senha } = req.body;

//     // ⚠️ SEGURANÇA: No mundo real, use bcrypt.compare() aqui.

//     try {
//         const [rows] = await pool.query(
//             "SELECT ID_Vendedor, Nome, Email, Senha, ID_Regiao FROM vendedor WHERE Email = ?",
//             [email]
//         );

//         if (rows.length === 0) {
//             return res.status(401).json({ message: "Usuário não encontrado" });
//         }

//         const vendedor = rows[0];

//         // Verifica senha simples (sem criptografia)
//         if (vendedor.Senha !== senha) {
//             return res.status(401).json({ message: "Senha incorreta" });
//         }

//         // Tudo certo
//         res.json({
//             message: "Login bem-sucedido",
//             vendedor: {
//                 id: vendedor.ID_Vendedor,
//                 nome: vendedor.Nome,
//                 email: vendedor.Email,
//                 regiao: vendedor.ID_Regiao,
//             },
//         });
//     } catch (err) {
//         // Retorna erro 500 para qualquer falha de banco de dados ou servidor
//         console.error(err);
//         res.status(500).json({ message: "Erro interno do servidor" });
//     }
// });

// export default router;

// NOTA: Certifique-se de que o pool.query no seu db.js está configurado
// para retornar a interface de Promises (como no mysql2) para que `await pool.query` funcione.