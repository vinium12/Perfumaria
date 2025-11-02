import pool from "../config/db.js";

// 🔹 Função: Listar todas as vendas com detalhes de produtos e total
export const listarNotasComItens = async (idRegiao = null) => {
  let query = `
    SELECT 
      nf.ID_Nota AS ID_Venda,
      nf.Data,
      v.Nome AS Vendedor,
      c.Nome AS Cliente,
      p.Nome AS Produto,
      iv.Qtd_Vendida,
      p.Preco AS Preco_Unitario,
      (iv.Qtd_Vendida * p.Preco) AS Subtotal,
      r.Nome_Regiao AS Regiao
    FROM nota_fiscal nf
    JOIN vendedor v ON nf.ID_Vendedor = v.ID_Vendedor
    JOIN cliente c ON nf.ID_Cliente = c.ID_Cliente
    JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
    JOIN itens_venda iv ON nf.ID_Nota = iv.ID_Nota
    JOIN produto p ON iv.ID_Produto = p.ID_Produto
  `;

  const params = [];

  if (idRegiao) {
    query += " WHERE v.ID_Regiao = ?";
    params.push(idRegiao);
  }

  query += " ORDER BY nf.Data DESC, nf.ID_Nota";

  const [rows] = await pool.query(query, params);

  // 🔹 Agora agrupamos as linhas (1 nota = vários produtos)
  const vendasAgrupadas = {};

  for (const row of rows) {
    if (!vendasAgrupadas[row.ID_Venda]) {
      vendasAgrupadas[row.ID_Venda] = {
        ID_Venda: row.ID_Venda,
        Data: row.Data,
        Vendedor: row.Vendedor,
        Cliente: row.Cliente,
        Regiao: row.Regiao,
        Produtos: [],
        Total: 0
      };
    }

    vendasAgrupadas[row.ID_Venda].Produtos.push({
      Nome: row.Produto,
      Quantidade: row.Qtd_Vendida,
      PrecoUnitario: row.Preco_Unitario,
      Subtotal: row.Subtotal
    });

    vendasAgrupadas[row.ID_Venda].Total += row.Subtotal;
  }

  // Retorna em formato de array
  return Object.values(vendasAgrupadas);
};
