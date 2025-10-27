// src/pages/Login/login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './login.module.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate(); 

    const handleSimulatedLogin = () => {
        onLogin();
        navigate('/'); 
    };
    
    return (
        <div className={styles.loginBackground}>
            <div className={styles.loginCard}>
                <h2>Login</h2>
                <button 
                    onClick={handleSimulatedLogin} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: 'purple', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                >
                    Fazer Login (Simulado)
                </button>
            </div>
        </div>
    );
};

export default Login;
