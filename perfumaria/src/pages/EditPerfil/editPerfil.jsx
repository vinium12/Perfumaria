import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./editPerfil.module.css";
import Formedit from "../../components/EditForm/formedit";

const EditarPerfil = () => {
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Campos do formulário (mantidos)
    const campos = [
        { name: "email", label: "Email", type: "email", placeholder: "Digite seu email" },
        { name: "telefone", label: "Telefone", placeholder: "Digite seu telefone" },
        { name: "endereco", label: "Endereço", placeholder: "Digite seu endereço" },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                
                // ✅ CORREÇÃO NO USEEFFECT: Mapeia todas as chaves essenciais para o initialData
                const mappedData = {
                    id: userData.id, 
                    email: userData.email,
                    telefone: userData.telefone || '', 
                    endereco: userData.endereco || '',
                    nome: userData.nome,
                    // 🚨 CHAVES CRUCIAIS DE FILTRO: Preservadas aqui!
                    regiaoId: userData.regiaoId,   
                    regiaoNome: userData.regiaoNome 
                };
                
                setInitialData(mappedData);
                setLoading(false);

            } catch (e) {
                console.error("Erro ao ler JSON da sessão para perfil:", e);
                setError("Falha ao carregar dados da sessão.");
                setLoading(false);
            }
        } else {
            // Se não houver usuário logado, redireciona
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    // Handler para o envio do formulário de EDIÇÃO
    const handleAtualizar = async (dadosAtualizados) => {
        if (!initialData || !initialData.id) {
            alert("Erro: ID do vendedor não encontrado para atualização.");
            return;
        }

        const vendedorId = initialData.id;
        
        // Dados a serem enviados para o backend (apenas os editáveis)
        const dadosAPI = {
            email: dadosAtualizados.email,
            telefone: dadosAtualizados.telefone,
            endereco: dadosAtualizados.endereco
        };

        try {
            const res = await fetch(`http://localhost:3000/vendedores/${vendedorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAPI),
            });

            const responseData = await res.json();

            if (!res.ok) {
                alert(`Falha ao atualizar: ${responseData.message}`);
                return;
            }

            alert("Perfil atualizado com sucesso!");
            
            // ✅ CORREÇÃO NO LOCAL STORAGE: O novoUser pega todas as chaves preservadas do initialData
            const novoUser = {
                ...initialData,             // Preserva id, nome, regiaoId, regiaoNome!
                ...dadosAtualizados         // Sobrescreve email, telefone, endereco
            };
            
            localStorage.setItem('user', JSON.stringify(novoUser));

            navigate('/'); // Redireciona para a Dashboard
            
        } catch (err) {
            console.error("Erro de conexão/API:", err);
            alert("Erro de conexão com o servidor. Tente novamente.");
        }
    };

    if (loading) {
        return <div className={styles.loading}>Carregando perfil...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.background}>
            <div className={styles.card}>
                <Formedit
                    titulo={`Editar Perfil:`}
                    modo="editar" 
                    campos={campos}
                    valoresIniciais={initialData} 
                    onUpdate={handleAtualizar} 
                />
            </div>
        </div>
    );
};

export default EditarPerfil;