// src/models/clienteModel.js
import pool from "../config/db.js"; 

// NOVO: Função que aceita o ID da Região como argumento
export const getClientesByRegiao = async (regiaoId) => {
    try {
        // 1. SQL com JOIN e WHERE para filtrar pela região e linkar com o vendedor
        // Assumimos que a tabela Cliente tem a coluna ID_Regiao. Se for por Vendedor,
        // a consulta precisa ser adaptada com JOIN. 
        // VAMOS ASSUMIR QUE O CLIENTE ESTÁ DIRETAMENTE LIGADO A UMA REGIÃO:

        const [rows] = await pool.query(
            `
            SELECT 
            ID_Cliente, 
            Nome, 
            Endereco AS endereco_db,
            Email 
            FROM cliente 
            WHERE ID_Regiao = ?
            `,
            [regiaoId] // 2. Passa o ID da Região para o WHERE
        );
        
        return rows;
    } catch (error) {
        console.error("Erro no Model ao buscar clientes por região:", error);
        throw new Error("Falha ao buscar clientes no banco de dados.");
    }
};

// Certifique-se de que a sua tabela Cliente realmente tem uma coluna ID_Regiao.
// Se a ligação for feita através de uma tabela intermediária ou outra regra, a consulta deve mudar.