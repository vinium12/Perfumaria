import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRegistrarVenda from "../../components/FormVenda/formVenda";
import styles from "../CadastrarVenda/cadastrarVenda.module.css";

const CadastrarVenda = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Recupera o usuário logado e ID da região
        const user = JSON.parse(localStorage.getItem("user"));
        const regiaoId = user?.regiaoId;

        if (regiaoId === undefined || regiaoId === null) {
          throw new Error("ID da Região não encontrado. Faça login novamente.");
        }

        // 🔹 Busca clientes e produtos da região
        const [clientesRes, produtosRes] = await Promise.all([
          fetch(`http://localhost:3000/clientes?regiao=${regiaoId}`),
          fetch("http://localhost:3000/produtos"),
        ]);

        if (!clientesRes.ok) throw new Error("Falha ao buscar clientes");
        if (!produtosRes.ok) throw new Error("Falha ao buscar produtos");

        const clientesData = await clientesRes.json();
        const produtosData = await produtosRes.json();

        setClientes(clientesData);
        setProdutos(produtosData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert(`Erro ao carregar dados: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSalvar = async (dados) => {
    const vendedor = JSON.parse(localStorage.getItem("user"));
    if (!vendedor?.id) {
      alert("Erro: vendedor não identificado. Faça login novamente.");
      return;
    }

    console.log("🧾 Dados recebidos do form:", dados);

    // ✅ Agora os itens já vêm com ID correto do produto (item.id)
    const corpo = {
      vendedorId: vendedor.id,
      clienteId: dados.clienteId,
      itens: dados.itens.map((item) => ({
        id_produto: item.id,
        quantidade: item.qtd || 1,
        preco_unitario: parseFloat(
          (item.precounitario || "0")
            .toString()
            .replace("R$", "")
            .replace(",", ".")
        ),
      })),
    };

    console.log("📦 Corpo enviado para o backend:", corpo);

    // Verificação de segurança
    if (corpo.itens.some((i) => !i.id_produto)) {
      alert("❌ Um ou mais itens não possuem produto válido.");
      console.log("Itens com problema:", corpo.itens);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (res.ok) {
        alert("✅ Venda registrada com sucesso!");
        navigate("/vendas");
      } else {
        const errData = await res.json();
        alert(`Falha ao salvar venda: ${errData.message}`);
      }
    } catch (err) {
      console.error("Erro de conexão ao salvar venda:", err);
      alert("Erro de conexão ao salvar venda.");
    }
  };

  if (loading) {
    return (
      <div className={styles.background}>
        <div className={styles.card}>
          <h2>Carregando dados...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <FormRegistrarVenda
          modo="cadastrar"
          clientes={clientes}
          produtos={produtos}
          onSalvar={handleSalvar}
        />
      </div>
    </div>
  );
};

export default CadastrarVenda;
