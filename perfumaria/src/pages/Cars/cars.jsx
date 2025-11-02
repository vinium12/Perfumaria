import React, { useEffect, useState } from "react";
import Table from "../../components/Table/table";
import styles from "./Cars.module.css";

const Cars = () => {
  const [veiculos, setVeiculos] = useState([]); // Estado para os veículos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Colunas para a tabela de frota
  const columns = ["Marca", "Modelo", "Placa", "Cor"];

  useEffect(() => {
    const fetchVeiculos = async () => {
      setLoading(true);

      // A. OBTÉM O ID DA REGIÃO DO VENDEDOR LOGADO (do localStorage)
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("Sessão não encontrada. Faça login novamente.");
        setLoading(false);
        return;
      }

      const vendedor = JSON.parse(storedUser);
      const regiaoId = vendedor.regiaoId;

      if (regiaoId === undefined || regiaoId === null) {
        // Corrigido para permitir o valor 0 (se for o caso)
        if (regiaoId !== 0) {
          setError("ID da Região não encontrado na sessão.");
          setLoading(false);
          return;
        }
      }

      try {
        // B. FAZ A REQUISIÇÃO para o endpoint de frota FILTRADO
        const url = `http://localhost:3000/veiculos?regiao=${regiaoId}`;
        const res = await fetch(url);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Falha ao carregar veículos.");
        }

        // C. MAPEA OS DADOS (para as chaves minúsculas que a Table espera)
        const mappedVeiculos = data.map((v) => ({
          id: v.ID_Veiculo, // Chave única
          marca: v.Marca,
          modelo: v.Modelo,
          placa: v.Placa,
          cor: v.Cor,
          // Se o backend retornar a região formatada, use-a:
        }));

        setVeiculos(mappedVeiculos);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar veículos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculos();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando frota...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erro: {error}</div>;
  }

  return (
    <div className={styles.carsContainer}>
      <h1 className={styles.pageTitle}>Frota</h1>

      <div className={styles.tableWrapper}>
        {/* 2. CHAMADA SIMPLIFICADA: Apenas columns e data */}
        <Table
          columns={columns}
          data={veiculos} // Passa os veículos mapeados
        />
      </div>
    </div>
  );
};

export default Cars;