import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FormRegistrarVenda from "../../components/FormVenda/formVenda";
import styles from "../CadastrarVenda/cadastrarVenda.module.css";

const EditarVenda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [venda, setVenda] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // 🔹 Carrega dados iniciais
  // ----------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const regiaoId = user?.regiaoId;

        if (!regiaoId && regiaoId !== 0)
          throw new Error("Região não encontrada.");

        const [clientesRes, produtosRes, vendaRes] = await Promise.all([
          fetch(`http://localhost:3000/clientes?regiao=${regiaoId}`),
          fetch("http://localhost:3000/produtos"),
          fetch(`http://localhost:3000/vendas/${id}`),
        ]);

        if (!clientesRes.ok || !produtosRes.ok || !vendaRes.ok)
          throw new Error("Falha ao carregar dados.");

        const clientesData = await clientesRes.json();
        const produtosData = await produtosRes.json();
        const vendaData = await vendaRes.json();

        const itensFormatados = (vendaData.Itens || []).map((item) => ({
          id: item.ID_Produto,
          produto: item.Produto_Nome,
          qtd: item.Qtd_Vendida,
          precounitario: item.Preco_Unitario.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
        }));

        setVenda({
          id: vendaData.ID_Venda,
          clienteId: vendaData.ID_Cliente,
          itens: itensFormatados,
        });
        setClientes(clientesData);
        setProdutos(produtosData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar informações da venda.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ----------------------------
  // 🔹 Salvar edição da venda
  // ----------------------------
  const handleSalvar = async (dados) => {
    console.log("📝 Atualizando venda:", dados);

    const corpo = {
      clienteId: dados.clienteId,
      itens: dados.itens.map((item) => ({
        id_produto: item.id,
        quantidade: item.qtd,
        preco_unitario: parseFloat(
          (item.precounitario || "0")
            .toString()
            .replace("R$", "")
            .replace(",", ".")
        ),
      })),
    };

    try {
      // ✅ 1. Verifica estoque antes de enviar
      for (const item of corpo.itens) {
        const resEstoque = await fetch(
          `http://localhost:3000/produtos/${item.id_produto}`
        );
        if (!resEstoque.ok) throw new Error("Falha ao verificar estoque.");

        const produto = await resEstoque.json();
        const estoqueAtual = produto?.Qtd_Estoque ?? 0;

        if (estoqueAtual <= 0) {
          alert(`❌ O produto "${produto.Nome}" está sem estoque.`);
          return;
        }

        if (item.quantidade > estoqueAtual) {
          alert(
            `❌ Estoque insuficiente para o produto "${produto.Nome}". Disponível: ${estoqueAtual}`
          );
          return;
        }
      }

      // ✅ 2. Envia atualização pro backend
      const res = await fetch(`http://localhost:3000/vendas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (res.ok) {
        alert("✅ Venda atualizada com sucesso!");
        navigate("/vendas");
      } else {
        const errData = await res.json();
        alert(`Erro ao atualizar: ${errData.message}`);
      }
    } catch (err) {
      console.error("Erro de conexão ao atualizar:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // ----------------------------
  // 🔹 Renderização
  // ----------------------------
  if (loading) {
    return (
      <div className={styles.background}>
        <div className={styles.card}>
          <h2>Carregando venda...</h2>
        </div>
      </div>
    );
  }

  if (!venda) {
    return (
      <div className={styles.background}>
        <div className={styles.card}>
          <h2>Venda não encontrada.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <FormRegistrarVenda
          modo="editar"
          clientes={clientes}
          produtos={produtos}
          vendaSelecionada={venda}
          onSalvar={handleSalvar}
        />
      </div>
    </div>
  );
};

export default EditarVenda;
