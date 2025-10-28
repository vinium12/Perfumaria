import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header/header';
import Login from './pages/Login/login'; 
import Dashboard from './pages/Home/home';
import Clientes from './pages/Clients/clients';
import Cars from './pages/Cars/cars';
import EditarPerfil from './pages/EditPerfil/editPerfil';
import EditarProduto from './pages/EditProduct/editproduct'; 
import CadastrarProduto from './pages/CadastrarProduct/cadastrarProduct';
import './App.css';
// ---------------------- COMPONENTE AUXILIAR ----------------------
function AppRouter({ isLoggedIn, onLogin, onLogout }) {
    const location = useLocation();
    const navigate = useNavigate(); // ✅ Agora está dentro do Router

    // Se logar, redireciona pra home automaticamente
    useEffect(() => {
        if (isLoggedIn && location.pathname === '/login') {
            navigate('/');
        }
    }, [isLoggedIn, location.pathname, navigate]);

    // Logout automático se estiver logado e voltar pro login
    // useEffect(() => {
    //     if (location.pathname === '/login' && isLoggedIn) {
    //         onLogout();
    //     }
    // }, [location.pathname, isLoggedIn, onLogout]); 

    let path = location.pathname.substring(1); 
    if (path === "") path = "home"; 
    const activeScreen = path.charAt(0).toUpperCase() + path.slice(1); 

    const mainPadding = 
        location.pathname === '/login' || 
        location.pathname === '/editar' || 
        location.pathname === '/editarproduto' ||
        location.pathname === '/cadastrarproduto'
            ? '0' 
            : '20px 100px';

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn} 
                activeScreen={activeScreen} 
                onLogout={onLogout} 
            />
            
            <main style={{ padding: mainPadding }}>
                <Routes>
                    <Route path="/login" element={<Login onLogin={onLogin} />} />

                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/clientes" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Clientes /> 
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/frota" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Cars /> 
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/editar" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <EditarPerfil />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/editarproduto" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <EditarProduto />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/cadastrarproduto" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <CadastrarProduto />
                            </ProtectedRoute>
                        } 
                    />


                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </>
    );
}

// ---------------------- PROTEÇÃO DE ROTAS ----------------------
const ProtectedRoute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// ---------------------- APP PRINCIPAL ----------------------
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const user = localStorage.getItem('user');
        return user !== null;
    });

    const handleLogin = (vendedor) => {
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(vendedor)); 
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <AppRouter 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLogin} 
                onLogout={handleLogout} 
            />
        </Router>
    );
}

export default App;
