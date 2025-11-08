{
  /* Classe de Definição da Lógica e Estrutura do Site */
}

import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

{
  /* Import da Biblioteca de Animações ao Ativar uma Rota do Site  */
}
import { AnimatePresence, motion } from "framer-motion";

{
  /* Import do Componente Header(Navbar) */
}
import Header from "./components/Header/header";

{
  /* Import da Página de Login */
}
import Login from "./pages/Login/login";

{
  /* Import da Página de Dashboard */
}
import Dashboard from "./pages/Home/home";

{
  /* Import da Página com as Informações dos Clientes */
}
import Clientes from "./pages/Clients/clients";

{
  /* Import da Página com as Informações da Frota da Perfumaria */
}
import Cars from "./pages/Cars/cars";

{
  /* Import da Página de Edição das Informações do Perfil */
}
import EditarPerfil from "./pages/EditPerfil/editPerfil";

{
  /* Import da Página de Edição dos Produtos Registrados */
}
import EditarProduto from "./pages/EditProduct/editproduct";

{
  /* Import da Página de Cadastro de Produtos */
}
import CadastrarProduto from "./pages/CadastrarProduct/cadastrarProduct";

{
  /* Import da Página de Visualização dos Produtos Cadastrados */
}
import Produtos from "./pages/Produtos/produtos";

{
  /* Import da Página de Edição de uma Venda Realizada */
}
import EditarVenda from "./pages/EditarVendas/editarVenda";

{
  /* Import da Página com o Histórico de Vendas */
}
import Vendas from "./pages/Vendas/vendas";

{
  /* Import da Página de Registro de uma Nova Venda */
}
import CadastrarVenda from "./pages/CadastrarVenda/cadastrarVenda";

{
  /* Import do CSS da Classe Principal do Projeto */
}
import "./App.css";

{
  /* Função Para Ativação das Rotas(Links) do Site */
}
function AppRouter({ isLoggedIn, onLogin, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  let path = location.pathname.substring(1);
  if (path === "") path = "home";
  const activeScreen = path.charAt(0).toUpperCase() + path.slice(1);

  const mainPadding =
    location.pathname === "/login" ||
    location.pathname === "/editar" ||
    location.pathname === "/editarproduto" ||
    location.pathname === "/cadastrarproduto" ||
    location.pathname === "/cadastrarvenda" ||
    location.pathname.startsWith("/editarvenda")
      ? "0"
      : "20px 100px";

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        activeScreen={activeScreen}
        onLogout={onLogout}
      />

      <main style={{ padding: mainPadding }}>
        
        {/* Método do Motion Framer Para Identificar a Ativação de Rotas */}
        <AnimatePresence mode="wait">

          {/* Método do Motion Framer Para Aplicar a Animação nas Trocas de Rota */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/login" element={<Login onLogin={onLogin} />} />

              {/* Rota da Página com a Dashboard */}
              <Route
                path="/"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página com as Informações do Cliente */}
              <Route
                path="/clientes"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <Clientes />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página com as Informações da Frota */}
              <Route
                path="/frota"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <Cars />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página com as Informações dos Produtos */}
              <Route
                path="/produtos"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <Produtos />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página com as Vendas Realizadas */}
              <Route
                path="/vendas"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <Vendas />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página de Edição dos Dados do Perfil */}
              <Route
                path="/editar"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <EditarPerfil />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página de Edição dos Dados dos Produtos */}
              <Route
                path="/editarproduto"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {" "}
                    {/* Aplicando a Função Para Exigir Login */}
                    <EditarProduto />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página de Edição das Vendas Registradas */}
              <Route
                path="/editarvenda/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {/* Aplicando a Função Para Exigir Login */}
                    <EditarVenda />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página de Cadastro de Produtos */}
              <Route
                path="/cadastrarproduto"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {/* Aplicando a Função Para Exigir Login */}
                    <CadastrarProduto />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Página de Registro de Novas Vendas */}
              <Route
                path="/cadastrarvenda"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {/* Aplicando a Função Para Exigir Login */}
                    <CadastrarVenda />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

{
  /* Função Para Restringir o Acesso ao Site e Forçar Autenticação */
}
const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

{
  /* Função de Criação da Classe Principal */
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem("user");
    return user !== null;
  });

  const handleLogin = (vendedor) => {
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(vendedor));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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