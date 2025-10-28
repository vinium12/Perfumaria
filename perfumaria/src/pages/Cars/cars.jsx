import React from 'react';
import Table from '../../components/Table/table'; 
import styles from './Cars.module.css'; 

const Cars = () => {

    
    const columns = ["Marca", "Modelo", "Placa", "Cor"];

    const frotaData = [
        { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
        { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
        { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
    
    ];

    return (
        <div className={styles.carsContainer}>
            <h1 className={styles.pageTitle}>Frota</h1>
            
            <div className={styles.tableWrapper}>
            
                
                <Table
                columns={columns} 
                data={frotaData} 
                   />

            </div>
        </div>  
    );  
};

export default Cars;