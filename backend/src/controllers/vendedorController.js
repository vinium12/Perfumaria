import { getVendedores, updateVendedor } from "../models/vendedorModel.js";
import pool from "../config/db.js"; // Sua conexão com o banco

// ----------------------------------------------------
// LÓGICA DE LOGIN (Texto Simples)
// ----------------------------------------------------
export const login = async (req, res) => {
  const { email, senha } = req.body; // Recebe email e senha do front-end

  try {
    // ✅ 1. CONSULTA CORRIGIDA: Usa JOIN para buscar Nome_Regiao e inclui Telefone e Endereco
    const [rows] = await pool.query(
      `
            SELECT 
                v.ID_Vendedor, v.Nome, v.Email, v.Senha, v.Telefone, v.Endereco, 
                v.ID_Regiao, r.Nome_Regiao 
            FROM vendedor v
            INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
            WHERE v.Email = ?
            `,
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

    // ✅ 3. RETORNO CORRIGIDO: Envia todos os dados necessários para o frontend
    res.json({
      message: "Login bem-sucedido",
      vendedor: {
        id: vendedor.ID_Vendedor,
        nome: vendedor.Nome,
        email: vendedor.Email,
        regiaoId: vendedor.ID_Regiao, // ID para filtros
        regiaoNome: vendedor.Nome_Regiao, // NOVO: Nome da Região
        telefone: vendedor.Telefone, // NOVO
        endereco: vendedor.Endereco, // NOVO
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
    // Usando a função do Model (mantido)
    const vendedores = await getVendedores();
    res.json(vendedores);
  } catch (err) {
    console.error("Erro ao buscar vendedores:", err);
    res.status(500).json({ message: "Erro ao buscar vendedores" });
  }
};

export const atualizarVendedor = async (req, res) => {
  const { id } = req.params;
  const { email, telefone, endereco } = req.body;

  // Validação básica dos campos
  if (!email || !telefone || !endereco) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const affectedRows = await updateVendedor(id, email, telefone, endereco);

    if (affectedRows === 0) {
      // Se 0 linhas foram afetadas, o vendedor não existe ou os dados eram os mesmos
      return res
        .status(404)
        .json({ message: "Vendedor não encontrado ou dados inalterados." });
    }

    // Retorna sucesso
    res.json({ message: "Perfil atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar perfil do vendedor:", error);
    res.status(500).json({ message: "Erro interno ao atualizar perfil." });
  }
};