import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

{
  /* Imports dos Icones dos Cards de Acesso */
}
import { HiShoppingBag } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaCar } from "react-icons/fa6";

{
  /* Import dos Componentes de Card */
}
import CardAcesso from "./../../components/Cards/CardAcesso/cardAcesso";
import CardDados from "../../components/Cards/CardDados/cardDados";
import CardPerfil from "../../components/Cards/CardPerfil/cardPerfil";
import CardAtual from "../../components/Cards/CardAtual/cardAtual"; // O card de veículo

{
  /* Import do CSS da Página */
}
import styles from './home.module.css'


const Dashboard = () => {
  const navigate = useNavigate();

  // Estados (Perfil e Dados da Região)
  const [perfil, setPerfil] = useState({
    nome: "Carregando...",
    email: "...",
    ender: "...",
    tel: "...",
    regiao: "...",
    regiaoId: null,
  });
  const [dadosRegiao, setDadosRegiao] = useState(null);
  
  // ✅ NOVO ESTADO: Para armazenar o veículo atual
  const [veiculoAtual, setVeiculoAtual] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        setError("Sessão não encontrada."); // Define o erro
        return;
      }

      try {
        const userData = JSON.parse(storedUser);

        // Define o perfil (mantido)
        setPerfil({
          nome: userData.nome || "Vendedor",
          email: userData.email || "Não informado",
          ender: userData.endereco || "Não informado",
          tel: userData.telefone || "Não informado",
          regiao: userData.regiaoNome || "N/A",
          regiaoId: userData.regiaoId,
        });

        // IDs necessários para as APIs
        const regiaoId = userData.regiaoId;
        const vendedorId = userData.id; // O ID do Vendedor

        if (!regiaoId && regiaoId !== 0) throw new Error("ID da Região não encontrado na sessão.");
        if (!vendedorId) throw new Error("ID do Vendedor não encontrado na sessão.");

        // ✅ ATUALIZAÇÃO: Busca dados do Dashboard E dados do Veículo em paralelo
        const [dashboardRes, veiculoRes] = await Promise.all([
            fetch(`http://localhost:3000/dashboard?regiao=${regiaoId}`),
            fetch(`http://localhost:3000/veiculo/atual?regiaoId=${regiaoId}&vendedorId=${vendedorId}`)
        ]);

        if (!dashboardRes.ok) {
            const err = await dashboardRes.json();
            throw new Error(err.message || "Falha ao carregar métricas.");
        }
        if (!veiculoRes.ok) {
            const err = await veiculoRes.json();
            throw new Error(err.message || "Falha ao carregar veículo atual.");
        }

        const dataDashboard = await dashboardRes.json();
        const dataVeiculo = await veiculoRes.json();

        setDadosRegiao(dataDashboard);
        setVeiculoAtual(dataVeiculo); // Salva o veículo no estado

      } catch (e) {
        console.error("Erro ao carregar Dashboard:", e);
        setError(e.message); // Exibe o erro na tela
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]); // navigate é dependência

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleEditPerfil = () => {
    handleNavigate("/editar");
  };

  // ⏳ Estados visuais
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Carregando painel de dados...
      </div>
    );
  }

  if (error) { // Se houver erro em CIMA do login
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Erro: {error}
      </div>
    );
  }

  if (!perfil.regiaoId && perfil.regiaoId !== 0) { // Se o login quebrou
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Erro: Sessão inválida. Por favor, refaça o login.
      </div>
    );
  }

  const dadosPerfil = {
    email: perfil.email,
    ender: perfil.ender,
    tel: perfil.tel,
    regiao: perfil.regiao,
  };

  const dadosCardDados = dadosRegiao || {};
  const dataFormatadaHoje = new Date().toLocaleDateString('pt-BR');

  return (

      <div className={styles.dashboard}>
        <div className={styles.colunaEsq}>
      {/* Card com as Informações Base do Usuário */}
      <CardPerfil
        email={dadosPerfil.email}
        ender={dadosPerfil.ender}
        tel={dadosPerfil.tel}
        regiao={dadosPerfil.regiao}
        onEdit={handleEditPerfil}
      />

      {/* Card com as Informações da Região (Dinâmico) */}
      <CardDados
        regiao={dadosCardDados.nomeRegiao || dadosPerfil.regiao}
        qtnVen={dadosCardDados.qtnVen || "N/A"}
        qtnCli={dadosCardDados.qtnCli || "N/A"}
        veiculo={dadosCardDados.qtnVeiculo || "N/A"}
        pontosE={dadosCardDados.pontosE || []}
      />
        </div>
    
      <div className={styles.colunaDir}>
      {/* ✅ Card com as Informações do Veículo Atual (Dinâmico) */}
      <CardAtual
        data={dataFormatadaHoje}
        marca={veiculoAtual?.Marca || "..."}
        modelo={veiculoAtual?.Modelo || "..."}
        placa={veiculoAtual?.Placa || "..."}
        cor={veiculoAtual?.Cor || "..."}
      />

       {/* Card de Acesso dos Produtos */}
      <CardAcesso
        titulo="Produtos"
        descricao="Acesse sua lista de produtos"
        icon={HiShoppingBag}
        onClick={() => handleNavigate("/produtos")}
      />

         {/* Card de Acesso dos Clientes */}
      <CardAcesso
        titulo="Clientes"
        descricao="Visualize os clientes da sua região"
        icon={IoPersonSharp}
        onClick={() => handleNavigate("/clientes")}
      />

      {/* Card de Acesso das Vendas */}
      <CardAcesso
        titulo="Vendas"
        descricao="Tenha acesso as suas vendas"
        icon={BsCashCoin}
        onClick={() => handleNavigate("/vendas")}
      />

       {/* Card de Acesso da Frota */}
      <CardAcesso
        titulo="Frota"
        descricao="Visualize a frota de veículos da sua região"
        icon={FaCar}
        onClick={() => handleNavigate("/frota")}
      />
    </div>

      </div>
  );
};

export default Dashboard;