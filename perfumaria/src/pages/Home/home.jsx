import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

{
  /* Import dos Icones dos Cards de Acesso */
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
import CardAtual from "../../components/Cards/CardAtual/cardAtual";

const Dashboard = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(storedUser);

        setPerfil({
          nome: userData.nome || "Vendedor",
          email: userData.email || "Não informado",
          ender: userData.endereco || "Não informado",
          tel: userData.telefone || "Não informado",
          regiao: userData.regiaoNome || "N/A",
          regiaoId: userData.regiaoId,
        });

        const regiaoId = userData.regiaoId;

        const url = `http://localhost:3000/dashboard?regiao=${regiaoId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Falha ao carregar métricas.");
        }

        setDadosRegiao(data);
      } catch (e) {
        console.error("Erro ao carregar Dashboard:", e);
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
      
      {/* Card com as Informações Base do Usuário */}
      <CardPerfil
        email={dadosPerfil.email}
        ender={dadosPerfil.ender}
        tel={dadosPerfil.tel}
        regiao={dadosPerfil.regiao}
        onEdit={handleEditPerfil}
      />
      {/* Card com as Informações do Veículo Atual */}
      <CardAtual
        data="26/10/2025"
        marca="Chevrolet"
        modelo="Prisma 2021"
        placa="BRA2E19"
        cor="Preto"
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

      {/* Card com as Informações da Região */}
      <CardDados
        titulo="Região"
        regiao={dadosCardDados.nomeRegiao || dadosPerfil.regiao}
        qtnVen={dadosCardDados.qtnVen || "N/A"}
        qtnCli={dadosCardDados.qtnCli || "N/A"}
        veiculo={dadosCardDados.qtnVeiculo || "N/A"}
        pontosE={dadosCardDados.pontosE || []}
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
  );
};

export default Dashboard;
