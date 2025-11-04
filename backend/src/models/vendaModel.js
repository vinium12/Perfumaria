import pool from "../config/db.js";
import connection from "../config/db.js";



// ------------------------------------------------------------------
// 🔹 READ: Listar todas as vendas com agregação (corrigido)
// ------------------------------------------------------------------
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

  const vendasAgrupadas = {};

  for (const row of rows) {
    const subtotalNumerico = parseFloat(row.Subtotal) || 0; 
    const precoUnitarioNumerico = parseFloat(row.Preco_Unitario) || 0;

    if (!vendasAgrupadas[row.ID_Venda]) {
      const dataFormatada = row.Data ? new Date(row.Data).toLocaleDateString('pt-BR') : 'Data Indisponível';

      vendasAgrupadas[row.ID_Venda] = {
        ID_Venda: row.ID_Venda,
        Data: dataFormatada,
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
      PrecoUnitario: precoUnitarioNumerico, 
      Subtotal: subtotalNumerico
    });

    vendasAgrupadas[row.ID_Venda].Total += subtotalNumerico;
  }

  // Retorno final
  return Object.values(vendasAgrupadas).map(venda => ({
    ID_Venda: venda.ID_Venda,
    Data_Venda: venda.Data,
    Vendedor_Nome: venda.Vendedor,
    Cliente_Nome: venda.Cliente,
    Valor_Total: parseFloat(venda.Total).toFixed(2),
    Itens: venda.Produtos.map(item => ({
      Produto_Nome: item.Nome,
      Qtd_Vendida: item.Quantidade,
      Preco_Unitario: parseFloat(item.PrecoUnitario).toFixed(2),
      Subtotal: parseFloat(item.Subtotal).toFixed(2),
    }))
  }));
};

// ------------------------------------------------------------------
// 🔹 CREATE (Cadastro - Mestre-Detalhe)
// ------------------------------------------------------------------
export const createNotaFiscal = async (vendedorId, clienteId) => {
  const [result] = await pool.query(
    "INSERT INTO nota_fiscal (ID_Vendedor, ID_Cliente, Data) VALUES (?, ?, NOW())",
    [vendedorId, clienteId]
  );
  return result.insertId;
};

// backend/src/models/vendaModel.js
export const createItensVenda = async (notaId, itens) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Mapeia itens aceitando vários formatos vindos do front
    const values = itens.map(item => {
      const idProduto = item.id_produto || item.ID_Produto || item.produtoId || item.id;
      const qtd = item.quantidade || item.Qtd_Vendida || item.qtd || 1;
      if (!idProduto) throw new Error("Item sem id_produto válido");
      return [notaId, idProduto, qtd];
    });

    // insere em lote; se já existir (mesma chave PK), soma a quantidade
    const sql = `
      INSERT INTO itens_venda (ID_Nota, ID_Produto, Qtd_Vendida)
      VALUES ?
      ON DUPLICATE KEY UPDATE Qtd_Vendida = Qtd_Vendida + VALUES(Qtd_Vendida)
    `;
    await conn.query(sql, [values]);

    await conn.commit();
    return values.length;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};




// ------------------------------------------------------------------
// 🔹 UPDATE (Edição - Atualiza data e itens)
// ------------------------------------------------------------------
export const updateVenda = async (notaId, novosItens) => {
  // Atualiza a data
  await pool.query(
    "UPDATE nota_fiscal SET Data = NOW() WHERE ID_Nota = ?",
    [notaId]
  );

  // Exclui itens antigos
  await pool.query("DELETE FROM itens_venda WHERE ID_Nota = ?", [notaId]);

  // Insere novamente os novos
  if (novosItens && novosItens.length > 0) {
    return createItensVenda(notaId, novosItens);
  }
  return 1;
};

// ------------------------------------------------------------------
// 🔹 DELETE (Exclusão completa)
// ------------------------------------------------------------------
export const deleteVenda = async (notaId) => {
  await pool.query("DELETE FROM itens_venda WHERE ID_Nota = ?", [notaId]);
  const [result] = await pool.query("DELETE FROM nota_fiscal WHERE ID_Nota = ?", [notaId]);
  return result.affectedRows;
};
