import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header/header';
import Login from './pages/Login/login'; 
import Dashboard from './pages/Home/home';
import Clientes from './pages/Clients/clients';
import Cars from './pages/Cars/cars';
import EditarPerfil from './pages/EditPerfil/editPerfil';
import EditarProduto from './pages/EditProduct/editproduct';
import './App.css';

function AppRouter({ isLoggedIn, onLogin, onLogout }) {
  const location = useLocation();

  let path = location.pathname.substring(1); 
  if (path === "") path = "home"; 
  const activeScreen = path.charAt(0).toUpperCase() + path.slice(1); 

 location.pathname === '/login' || location.pathname === '/editar' || location.pathname === '/editarproduto' ? '0' : '20px 100px';

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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checa se já existe usuário logado no localStorage ao iniciar
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (vendedor) => {
    setIsLoggedIn(true);
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
