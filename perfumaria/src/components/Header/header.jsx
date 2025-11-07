{
  /* Classe de Criação do Componente Header */
}

import React from "react";

{
  /* Import da Biblioteca de Rotas */
}
import { Link } from "react-router-dom";

{
  /* Import da Logo Utilizada na Navbar */
}
import logo from '../../assets/T-Scent Logo Nav.svg';

{
  /* Import do CSS do Componente */
}
import styles from "./header.module.css";

{
  /* Função de Criação do Header */
}
const Header = ({ isLoggedIn, activeScreen, onLogout }) => {
  {
    /* Array com os Links Presentes na Navbar */
  }
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Vendas", path: "/vendas" },
    { name: "Clientes", path: "/clientes" },
    { name: "Produtos", path: "/produtos" },
    { name: "Frota", path: "/frota" },
  ];

  return (
    <header className={styles.headerContainer}>
      {/* Começo do Header */}
      <div className={styles.logoTitle}>
        <img  src={logo} alt="T-Scent Logo" className={styles.logoImage}/>
        <h1 className={styles.headerTitle}>T-Scent</h1>
      </div>
    
      {isLoggedIn ? (
        <>
          <nav className={styles.headerNav}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${styles.navItem} ${
                  item.name === activeScreen ? styles.active : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button className={styles.logoutButton} onClick={onLogout}>
            Sair
          </button>
        </>
      ) : (
        <div />
      )}
      {/* Fim do Header */}
    </header>
  );
};

export default Header;