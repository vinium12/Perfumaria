import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

{/* Imports dos Icones Usando o React-Icons */} 
import { HiShoppingBag } from "react-icons/hi2"; 
import { IoPersonSharp } from "react-icons/io5"; 
import { BsCashCoin } from "react-icons/bs"; 
import { FaCar } from "react-icons/fa6"; 

{/* Import dos Componentes de Cards */} 
import CardAcesso from './../../components/Cards/CardAcesso/cardAcesso'; 
import CardDados from '../../components/Cards/CardDados/cardDados'; 
import CardPerfil from '../../components/Cards/CardPerfil/cardPerfil'; 

// Importe estilos se necessário
// import styles from './home.module.css'; 


const Dashboard = () => {
    const navigate = useNavigate(); 
    
    // 1. ESTADOS: Para armazenar os dados do vendedor e o estado de carregamento
    const [perfil, setPerfil] = useState({
        nome: 'Carregando...',
        email: '...',
        ender: '...',
        tel: '...',
        regiao: '...' // Será o nome da região
    });
    const [loading, setLoading] = useState(true);

    // 2. LÓGICA DE CARREGAMENTO: Busca os dados do vendedor no localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                
                // ✅ MAPEAMENTO CORRIGIDO: Usa as novas chaves do backend
                setPerfil({
                    nome: userData.nome || 'Vendedor',
                    email: userData.email || 'Não informado',
                    ender: userData.endereco || 'Não informado',   // 👈 Chave 'endereco'
                    tel: userData.telefone || 'Não informado',     // 👈 Chave 'telefone'
                    regiao: userData.regiaoNome || 'N/A'          // 👈 Chave 'regiaoNome'
                });
                
            } catch (e) {
                console.error("Erro ao ler JSON do localStorage:", e);
            }
        }
        
        setLoading(false); // Finaliza o loading
        
    }, [navigate]); 

    // Handler de Navegação (Usaremos para os CardAcesso e CardPerfil)
    const handleNavigate = (path) => {
        navigate(path);
    };
    
    const handleEditPerfil = () => {
        // Usa a rota /editar que você configurou no App.jsx
        handleNavigate('/editar'); 
    };
    
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando dados do perfil...</div>;
    }

    // Dados para os Cards (Puxados do estado do perfil)
    const dadosPerfil = {
        email: perfil.email,
        ender: perfil.ender,
        tel: perfil.tel,
        regiao: perfil.regiao,
        nome: perfil.nome // Adiciona o nome para o CardDados
    };

    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

            {/* Cards de ACESSO (Navegação real) */} 
            <CardAcesso titulo="Produtos" descricao="Acesse sua lista de produtos" icon={HiShoppingBag} onClick={() => handleNavigate('/produtos')} />
            <CardAcesso titulo="Clientes" descricao="Visualize os clientes da sua região" icon={IoPersonSharp} onClick={() => handleNavigate('/clientes')} />
            <CardAcesso titulo="Vendas" descricao="Tenha acesso as suas vendas" icon={BsCashCoin} onClick={() => handleNavigate('/vendas')} />
            <CardAcesso titulo="Frota" descricao="Visualize a frota de veículos da sua região" icon={FaCar} onClick={() => handleNavigate('/frota')} />
            
            {/* Card de DADOS (Usando dados reais do perfil) */} 
            <CardDados 
                titulo={`Região: ${dadosPerfil.regiao}`}
                regiao={dadosPerfil.regiao} // Nome da Região
                qtnVen="350" // Fictício
                qtnCli="1100" // Fictício
                veiculo="Leste" // Fictício
                pontosE={["Av.São Miguel, 3995"]} // Fictício (verifique CardDados.jsx se for um erro de prop)
            />

            {/* Card de PERFIL (Usando dados dinâmicos do estado) */}
            <CardPerfil
                email={dadosPerfil.email}
                ender={dadosPerfil.ender}
                tel={dadosPerfil.tel}
                regiao={dadosPerfil.regiao} // Nome da Região
                onEdit={handleEditPerfil}
            />

        </div>
    );
}

export default Dashboard;