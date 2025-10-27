import React from 'react';
import { Link } from 'react-router-dom'; 

import styles from './header.module.css';

const Header = ({ isLoggedIn, activeScreen, onLogout }) => {

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Vendas', path: '/vendas' },
        { name: 'Clientes', path: '/clientes' },
        { name: 'Produtos', path: '/produtos' },
        { name: 'Frota', path: '/frota' },
    ];
    
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>T-Scent</h1>

            {isLoggedIn ? (
                <nav className={styles.headerNav}>
                    {navItems.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.path}
                            className={`${styles.navItem} ${item.name === activeScreen ? styles.active : ''}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    
                    <button 
                        className={styles.logoutButton} 
                        onClick={onLogout}
                    >
                        Sair
                    </button>
                </nav>
            ) : (
                <div /> 
            )}
        </header>
    );
};

export default Header;