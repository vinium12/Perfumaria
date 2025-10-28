import React,  { useEffect, useState } from 'react';
import Table from '../../components/Table/table'; 
import styles from './Cars.module.css'; 

const Cars = () => {

    
    // const columns = ["Marca", "Modelo", "Placa", "Cor"];

    // const frotaData = [
    //     { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
    //     { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
    //     { marca: "Chevrolet", modelo: "Prisma 2022 1.0 Flex", placa: "BRA2E19", cor: "Preto" },
    
    // ];

     const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vendedores")
      .then((res) => res.json())
      .then((data) => setVendedores(data))
      .catch((err) => console.error("Erro ao carregar vendedores:", err));
  }, []);

  const handleEdit = (item) => {
    console.log("Editar:", item);
  };

  const handleDelete = (item) => {
    console.log("Excluir:", item);
  };


    return (
        <div className={styles.carsContainer}>
            <h1 className={styles.pageTitle}>Frota</h1>
            
            <div className={styles.tableWrapper}>
            
                
                <Table
  columns={["ID", "Nome", "Email"]}
  data={vendedores.map((v) => ({
    id: v.ID_Vendedor,
    nome: v.Nome,
    email: v.Email,
  }))}
  showActions
  onEdit={handleEdit}
  onDelete={handleDelete}
  actionButton={<button>Novo Vendedor</button>}
/>


            </div>
        </div>  
    );  
};

export default Cars;