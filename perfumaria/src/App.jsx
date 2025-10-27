import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header/header'
import Login from './pages/Login/login'; 
import Dashboard from './pages/Home/home';
import './App.css'

function AppRouter({ isLoggedIn, onLogin, onLogout }) {
    const location = useLocation();
    
    let path = location.pathname.substring(1); 
    if (path === "") path = "home"; 
    const activeScreen = path.charAt(0).toUpperCase() + path.slice(1); 
    
    const mainPadding = location.pathname === '/login' ? '0' : '20px 100px';

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn} 
                activeScreen={activeScreen} 
                onLogout={onLogout} 
            />
            
            <main style={{ padding: mainPadding }}>
                <Routes>
                    
                    <Route 
                        path="/login" 
                        element={<Login onLogin={onLogin} />} 
                    />
                    
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn} onLogout={onLogout}>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                    
                </Routes>
            </main>
        </>
    );
}

const ProtectedRoute = ({ children, isLoggedIn, onLogout }) => {
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            {children}
        </>
    );
};


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
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