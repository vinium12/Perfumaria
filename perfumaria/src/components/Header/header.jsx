{
  /* Classe de Criação do Componente Header */
}

import React from "react";

{
  /* Import da Biblioteca de Rotas */
}
import { Link } from "react-router-dom";

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
      {" "}
      {/* Começo do Header */}
      <h1 className={styles.headerTitle}>T-Scent</h1> {/* Título da Navbar */}
      {isLoggedIn ? (
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

          <button className={styles.logoutButton} onClick={onLogout}>
            Sair
          </button>
        </nav>
      ) : (
        <div />
      )}
      {/* Fim do Header */}
    </header>
  );
};

export default Header;