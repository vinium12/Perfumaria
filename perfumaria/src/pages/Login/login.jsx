{/* Classe de Criação da Página de Login */} 

import React, { useState } from 'react'; 

{/* Import da Biblioteca de Rotas */}
import { useNavigate } from 'react-router-dom'; 

{/* Import do Componente Input */}
import Input from '../../components/Input/input'; 

{/* Import do CSS da Página */}
import styles from './login.module.css';

{/* Função de Criação da Página de Login */}
const Login = ({ onLogin }) => {
    const navigate = useNavigate(); 
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

{/* Função Para Alternar a Visualização das Informações no Campo Senha */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

{/* Função Temporária Para Permitir o Login */}
    const handleSimulatedLogin = () => {
        onLogin();
        navigate('/'); 
    };
    
    return (
        <div className={styles.loginBackground}>
            <div className={styles.loginCard}>
                <h2>Login</h2>

            {/* Inicio da Chamada do Componente Input */}
                <div>
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
            {/* Fim da Chamada do Componente Input */}

            {/* Criação do Botão do Formulário */}
                    <button 
                        onClick={handleSimulatedLogin} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: 'var(--RoxoMain)',
                            font: 'var(--Textos)',
                            color: 'var(--BrancoMain)',
                            border: 'none', 
                            cursor: 'pointer',
                            borderRadius: '6px',
                            width: '100%',
                            marginTop: '20px'
                        }}
                    >
                        Entrar  
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;