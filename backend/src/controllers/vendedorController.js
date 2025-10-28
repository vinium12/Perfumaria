import { getVendedores } from "../models/vendedorModel.js";
import pool from "../config/db.js"; // Sua conexão com o banco

// ----------------------------------------------------
// LÓGICA DE LOGIN (Texto Simples)
// ----------------------------------------------------
export const login = async (req, res) => {
    const { email, senha } = req.body; // Recebe email e senha do front-end

    try {
        // 1. Busca o usuário pelo email
        const [rows] = await pool.query(
            "SELECT ID_Vendedor, Nome, Email, Senha, ID_Regiao FROM vendedor WHERE Email = ?",
            [email]
        );

        if (rows.length === 0) {
            // Usuário não encontrado
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const vendedor = rows[0];

        // 2. Compara a senha (em texto simples) com a senha no banco (em texto simples)
        if (vendedor.Senha !== senha) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 3. Sucesso: Retorna os dados do usuário (sem a senha)
        res.json({
            message: "Login bem-sucedido",
            vendedor: {
                id: vendedor.ID_Vendedor,
                nome: vendedor.Nome,
                email: vendedor.Email,
                regiao: vendedor.ID_Regiao,
            },
        });
    } catch (err) {
        // Retorna erro 500 para falha de banco de dados ou servidor
        console.error("Erro no login:", err);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};

// ----------------------------------------------------
// LÓGICA DE LISTAGEM DE VENDEDORES (Corrigida e Exportada)
// ----------------------------------------------------
export const listarVendedores = async (req, res) => {
  try {
    // Usando a função do Model, conforme o seu código
    // Se getVendedores não estiver definido em vendedorModel.js, esta linha pode falhar depois.
    const vendedores = await getVendedores(); 
    res.json(vendedores);
  } catch (err) {
    console.error("Erro ao buscar vendedores:", err);
    res.status(500).json({ message: "Erro ao buscar vendedores" });
  }
};