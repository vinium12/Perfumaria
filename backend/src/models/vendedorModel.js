import pool from "../config/db.js";

export async function getVendedores() {
  const [rows] = await pool.query("SELECT * FROM vendedor");
  return rows;
}

export const updateVendedor = async (id, email, telefone, endereco) => {
    // ⚠️ ATENÇÃO: As colunas do SET devem coincidir com o seu banco de dados
    const result = await pool.query(
        "UPDATE Vendedor SET Email = ?, Telefone = ?, Endereco = ? WHERE ID_Vendedor = ?",
        [email, telefone, endereco, id]
    );
    return result[0].affectedRows; // Retorna 1 se a linha foi afetada
};