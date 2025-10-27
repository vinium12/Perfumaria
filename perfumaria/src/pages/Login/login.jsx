// src/pages/Login/login.jsx
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import Input from '../../components/Input/input'; 
import styles from './login.module.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate(); 
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSimulatedLogin = () => {
        onLogin();
        navigate('/'); 
    };
    
    return (
        <div className={styles.loginBackground}>
            <div className={styles.loginCard}>
                <h2>Login</h2>

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

                    <button 
                        onClick={handleSimulatedLogin} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#6A5ACD',
                            color: 'white', 
                            border: 'none', 
                            cursor: 'pointer',
                            borderRadius: '6px',
                            width: '100%',
                            marginTop: '20px',
                            fontSize: '1rem',
                            fontWeight: '600'
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
