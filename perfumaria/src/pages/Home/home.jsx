import React from 'react';

{/* Imports dos Icones Usando o React-Icons, Separados Assim por Serem de Pacotes Diferentes */} 
import { HiShoppingBag } from "react-icons/hi2";  {/* Icone do Card de Produtos */} 
import { IoPersonSharp } from "react-icons/io5";  {/* Icone do Card de Clientes */} 
import { BsCashCoin } from "react-icons/bs";  {/* Icone do Card de Vendas */} 
import { FaCar } from "react-icons/fa6";  {/* Icone do Card de Frota */} 

import CardAcesso from './../../components/Cards/CardAcesso/cardAcesso';  {/* Import do Componente do Card */} 

const Dashboard = () => {
    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <CardAcesso
        titulo="Produtos"
        descricao="Acesse sua lista de produtos"
        icon={HiShoppingBag}
        onClick={() => console.log("Produtos")} // OnClick Temporário Para Teste
      />

      <CardAcesso
        titulo="Clientes"
        descricao="Visualize os clientes da sua região"
        icon={IoPersonSharp}
        onClick={() => console.log("Clientes")} // OnClick Temporário Para Teste
      />

      <CardAcesso
        titulo="Vendas"
        descricao="Tenha acesso as suas vendas"
        icon={BsCashCoin}
        onClick={() => console.log("Vendas")} // OnClick Temporário Para Teste
      />

      <CardAcesso
        titulo="Frota"
        descricao="Visualize a frota de veículos da sua região"
        icon={FaCar}
        onClick={() => console.log("Frota")} // OnClick Temporário Para Teste
      />
    </div>
  );
}

export default Dashboard;