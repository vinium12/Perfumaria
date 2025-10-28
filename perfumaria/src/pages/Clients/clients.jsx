import React from 'react';
import Table from '../../components/Table/table'; 
import styles from './clients.module.css'; 

const Clients = () => {

    
    return (
        <div className={styles.clientesContainer}>
            <h1 className={styles.pageTitle}>Clientes</h1>
            
            <div className={styles.tableWrapper}>

                
                <Table
                columns={["Nome", "Endereço", "Email"]}
                data={[
                    { nome: "Vinicius Augusto", endereço: "Rua Erva do Sereno, SP", email: "vinicius@gmail.com" },
                    { nome: "Lucas Silva", endereço: "Av. Paulista, SP", email: "lucas@gmail.com" },
                ]}
                />

            </div>
        </div>  
    );
};

export default Clients;