import React, { useState, useEffect } from "react";
import Table from "../../components/Table/table";
import styles from "./formVenda.module.css";

const FormVenda = ({
  modo = "cadastrar",
  clientes = [],
  produtos = [],
  vendaSelecionada = null,
  onSalvar,
}) => {
  const [clienteId, setClienteId] = useState(vendaSelecionada?.clienteId || "");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState(vendaSelecionada?.itens || []);

  // Atualiza caso mude a venda selecionada (modo edição)
  useEffect(() => {
    if (vendaSelecionada) {
      setClienteId(vendaSelecionada.clienteId);
      setItens(vendaSelecionada.itens || []);
    }
  }, [vendaSelecionada]);

  // Padroniza listas vindas do backend
  const clientesList = (Array.isArray(clientes) ? clientes : []).map((c) => ({
    id: c.id || c.ID_Cliente,
    nome: c.nome || c.Nome || c.Nome_Cliente,
  }));

  const produtosList = (Array.isArray(produtos) ? produtos : []).map((p) => ({
    id: p.id || p.ID_Produto,
    nome: p.nome || p.Nome || p.Nome_Produto,
    preco: Number(p.preco || p.Preco || 0),
  }));

  // ➕ Adiciona produto à tabela
  const handleAdicionarProduto = () => {
    if (!produtoSelecionadoId || quantidade <= 0) return;

    const produtoObj = produtosList.find(
      (p) => p.id === parseInt(produtoSelecionadoId)
    );
    if (!produtoObj) return;

    const novoItem = {
      id: produtoObj.id, // ✅ ID real
      produto: produtoObj.nome,
      qtd: Number(quantidade),
      precounitario: produtoObj.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    };

    setItens((prev) => [...prev, novoItem]);
    setProdutoSelecionadoId("");
    setQuantidade(1);
  };

  // 🗑️ Remover produto
  const handleRemoverProduto = (item) => {
    setItens((prev) => prev.filter((i) => i !== item));
  };

  // 💰 Calcular total
  const total = itens
    .reduce((acc, item) => {
      const precoStr = item.precounitario || "R$ 0,00";
      const preco = parseFloat(precoStr.replace("R$", "").replace(",", ".")) || 0;
      return acc + preco * (item.qtd || 0);
    }, 0)
    .toFixed(2)
    .replace(".", ",");

  // 💾 Envio final
  const handleSubmit = () => {
    if (!clienteId || itens.length === 0) {
      alert("Selecione um cliente e adicione ao menos um produto!");
      return;
    }

    const novaVenda = {
      clienteId,
      itens: itens.map((item) => ({
        id: item.id, // ✅ já vem do produto selecionado
        qtd: item.qtd,
        precounitario: item.precounitario,
      })),
    };

    console.log("📦 Enviando venda:", novaVenda);
    if (onSalvar) onSalvar(novaVenda);
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h1>{modo === "editar" ? "Editar Venda" : "Registrar Venda"}</h1>

        {/* CLIENTE */}
        <label className={styles.label}>Cliente</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.selectField}
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecione o Cliente</option>
            {clientesList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          <span className={styles.selectArrow}>▼</span>
        </div>

        {/* PRODUTO */}
        <label className={styles.label}>Produto</label>
        <div className={styles.itensRow}>
          <div className={styles.selectWrapper}>
            <select
              className={styles.selectField}
              value={produtoSelecionadoId}
              onChange={(e) => setProdutoSelecionadoId(e.target.value)}
            >
              <option value="">Selecione o Produto</option>
              {produtosList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <input
            className={styles.inputField}
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAdicionarProduto}
          >
            Adicionar
          </button>
        </div>

        {/* TABELA DE ITENS */}
        <Table
          columns={["Produto", "Qtd", "Preco Unitario"]}
          data={itens}
          showActions={true}
          onDelete={handleRemoverProduto}
        />

        {/* TOTAL */}
        <div className={styles.totalContainer}>
          <span>Total:</span> <strong>R$ {total}</strong>
        </div>

        {/* BOTÃO */}
        <button className={styles.button} onClick={handleSubmit}>
          {modo === "editar" ? "Salvar Alterações" : "Registrar Venda"}
        </button>
      </div>
    </div>
  );
};

export default FormVenda;
