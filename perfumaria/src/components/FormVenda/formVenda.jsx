{
  /* Classe de Criação do Componente do Formulário das Telas de Venda*/
}

import React, { useState, useEffect } from "react";

{
  /* Import do Componente de Tabelas do Site */
}
import Table from "../../components/Table/table";

{
  /* Import do CSS do Componente */
}
import styles from "./formVenda.module.css";

{
  /* Função de Criação do Componente */
}
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

  {
    /* Método de Alteração dos Valores */
  }
  useEffect(() => {
    if (vendaSelecionada) {
      setClienteId(vendaSelecionada.clienteId);
      setItens(vendaSelecionada.itens || []);
    }
  }, [vendaSelecionada]);

  {
    /* Padronização dos Elementos das Listas no Banco */
  }
  const clientesList = (Array.isArray(clientes) ? clientes : []).map((c) => ({
    id: c.id || c.ID_Cliente,
    nome: c.nome || c.Nome || c.Nome_Cliente,
  }));

  const produtosList = (Array.isArray(produtos) ? produtos : []).map((p) => ({
    id: p.id || p.ID_Produto,
    nome: p.nome || p.Nome || p.Nome_Produto,
    preco: Number(p.preco || p.Preco || 0),
  }));

  {
    /* Método de Adição de Itens à Tabela */
  }
  const handleAdicionarProduto = () => {
    if (!produtoSelecionadoId || quantidade <= 0) return;

    const produtoObj = produtosList.find(
      (p) => p.id === parseInt(produtoSelecionadoId)
    );
    if (!produtoObj) return;

    const novoItem = {
      id: produtoObj.id,
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

  {
    /* Método de Exclusão de Itens da Tabela */
  }
  const handleRemoverProduto = (item) => {
    setItens((prev) => prev.filter((i) => i !== item));
  };

  {
    /* Método que Calcula o Valor Total dos Produtos da Venda */
  }
  const total = itens
    .reduce((acc, item) => {
      const precoStr = item.precounitario || "R$ 0,00";
      const preco =
        parseFloat(precoStr.replace("R$", "").replace(",", ".")) || 0;
      return acc + preco * (item.qtd || 0);
    }, 0)
    .toFixed(2)
    .replace(".", ",");

  {
    /* Método Para Atribuir a Venda à Algum Cliente */
  }
  const handleSubmit = () => {
    if (!clienteId || itens.length === 0) {
      alert("Selecione um cliente e adicione ao menos um produto!");
      return;
    }

    const novaVenda = {
      clienteId,
      itens: itens.map((item) => ({
        id: item.id,
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

        {/* Inicio dos Elementos do Input de Escolha de Cliente */}
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
        {/* Fim dos Elementos do Input de Escolha de Cliente */}

        {/* Inicio dos Elementos do Input de Escolha de Produtos */}
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
          {/* Fim dos Elementos do Input de Escolha de Produtos */}

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAdicionarProduto}
          >
            Adicionar
          </button>
        </div>

        {/* Elementos da Tabela da Compra Sendo Feita */}
        <Table
          columns={["Produto", "Qtd", "Preco Unitario"]}
          data={itens}
          showActions={true}
          onDelete={handleRemoverProduto}
        />

        <div className={styles.totalContainer}>
          <span>Total:</span> <strong>R$ {total}</strong>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          {modo === "editar" ? "Salvar Alterações" : "Registrar Venda"}
        </button>
      </div>
    </div>
  );
};

export default FormVenda;