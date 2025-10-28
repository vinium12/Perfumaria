import React from 'react';

{/* Imports dos Icones Usando o React-Icons, Separados Assim por Serem de Pacotes Diferentes */} 
import { HiShoppingBag } from "react-icons/hi2";  {/* Icone do Card de Produtos */} 
import { IoPersonSharp } from "react-icons/io5";  {/* Icone do Card de Clientes */} 
import { BsCashCoin } from "react-icons/bs";  {/* Icone do Card de Vendas */} 
import { FaCar } from "react-icons/fa6";  {/* Icone do Card de Frota */} 

{/* Import dos Componentes de Cards */} 
import CardAcesso from './../../components/Cards/CardAcesso/cardAcesso';  {/* Cards de Acesso dos CRUDs */} 
import CardDados from '../../components/Cards/CardDados/cardDados';  {/* Card com as Informações Fixas da Região */} 
import CardPerfil from '../../components/Cards/CardPerfil/cardPerfil'; {/* Card com as Informações Base */} 

const Dashboard = () => {
     const handleEdit = () => alert("Editando..."); // OnClick Temporário Para Teste
    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

          {/* Inicio da Chamada dos Cards de Acesso */} 
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
         {/* Fim da Chamada dos Cards de Acesso */} 
        
         {/* Chamada do Card de Dados */} 
    <CardDados 
      titulo="Região"
      regiao="Leste"
      qtnVen="350"
      qtnCli="1100"
      veiculo="Leste"
      pontosE="Av.São Miguel, 3995"
    />

         {/* Chamada do Card de Perfil */}
    <CardPerfil
      email="fulano@vendas.com"
      ender="Rua das Folhas, São Paulo"
      tel="11 4002-8922"
      regiao="Leste"
      onEdit={handleEdit}
    
    />

    </div>
  );
}

export default Dashboard;