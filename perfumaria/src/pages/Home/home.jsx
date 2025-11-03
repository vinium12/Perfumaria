import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiShoppingBag } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaCar } from "react-icons/fa6";

import CardAcesso from "./../../components/Cards/CardAcesso/cardAcesso";
import CardDados from "../../components/Cards/CardDados/cardDados";
import CardPerfil from "../../components/Cards/CardPerfil/cardPerfil";
import CardAtual from "../../components/Cards/CardAtual/cardAtual";

// import styles from './home.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // ESTADOS
  const [perfil, setPerfil] = useState({
    nome: "Carregando...",
    email: "...",
    ender: "...",
    tel: "...",
    regiao: "...",
    regiaoId: null,
  });
  const [dadosRegiao, setDadosRegiao] = useState(null);
  const [loading, setLoading] = useState(true);

  // LÓGICA DE CARREGAMENTO (Perfil e Dados da Região)
  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(storedUser);

        // Mapeamento do Perfil
        setPerfil({
          nome: userData.nome || "Vendedor",
          email: userData.email || "Não informado",
          ender: userData.endereco || "Não informado",
          tel: userData.telefone || "Não informado",
          regiao: userData.regiaoNome || "N/A",
          regiaoId: userData.regiaoId,
        });

        const regiaoId = userData.regiaoId;

        // 🚨 BUSCA OS DADOS DINÂMICOS DO BACKEND (Exige o ID da região)
        const url = `http://localhost:3000/dashboard?regiao=${regiaoId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Falha ao carregar métricas.");
        }

        setDadosRegiao(data);
      } catch (e) {
        console.error("Erro ao carregar Dashboard:", e);
        // Se der erro crítico, faz logout para limpar a sessão
        // localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleEditPerfil = () => {
    handleNavigate("/editar");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Carregando painel de dados...
      </div>
    );
  }

  if (!perfil.regiaoId && perfil.regiaoId !== 0) {
    // Se o ID da região for nulo e não for zero, exibe erro
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

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Cards de Acesso (Navegação real) */}
      <CardAcesso
        titulo="Produtos"
        descricao="Acesse sua lista de produtos"
        icon={HiShoppingBag}
        onClick={() => handleNavigate("/produtos")}
      />
      <CardAcesso
        titulo="Clientes"
        descricao="Visualize os clientes da sua região"
        icon={IoPersonSharp}
        onClick={() => handleNavigate("/clientes")}
      />
      <CardAcesso
        titulo="Vendas"
        descricao="Tenha acesso as suas vendas"
        icon={BsCashCoin}
        onClick={() => handleNavigate("/vendas")}
      />
      <CardAcesso
        titulo="Frota"
        descricao="Visualize a frota de veículos da sua região"
        icon={FaCar}
        onClick={() => handleNavigate("/frota")}
      />

      {/* CardDados com Dados Dinâmicos da API */}
      <CardDados
        titulo={`Região: ${dadosCardDados.nomeRegiao || dadosPerfil.regiao}`}
        regiao={dadosCardDados.nomeRegiao || dadosPerfil.regiao}
        qtnVen={dadosCardDados.qtnVen || "N/A"}
        qtnCli={dadosCardDados.qtnCli || "N/A"}
        veiculo={dadosCardDados.qtnVeiculo || "N/A"}
        pontosE={dadosCardDados.pontosE || []}
      />

    {/* Card com os Dados do Veículo Atual */}
      <CardAtual 
        data="26/10/2025"
        marca="Chevrolet"
        modelo="Prisma 2021"
        placa="BRA2E19"
        cor="Preto"
      />

      {/* Card de PERFIL (Usando dados dinâmicos do estado) */}
      <CardPerfil
        email={dadosPerfil.email}
        ender={dadosPerfil.ender}
        tel={dadosPerfil.tel}
        regiao={dadosPerfil.regiao}
        onEdit={handleEditPerfil}
      />
    </div>
  );
};

export default Dashboard;