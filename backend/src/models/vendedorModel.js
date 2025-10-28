import pool from "../config/db.js";

export async function getVendedores() {
  const [rows] = await pool.query("SELECT * FROM vendedor");
  return rows;
}
