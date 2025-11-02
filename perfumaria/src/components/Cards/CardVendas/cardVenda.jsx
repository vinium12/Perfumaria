import React from 'react';
import { Truck, Receipt, Trash2, Pencil } from 'lucide-react';
import styles from './cardVenda.module.css'; 

const cardVenda= ({ venda, onEdit, onDelete }) => {
    // 1. Formatação dos Dados
    const dataFormatada = new Date(venda.Data_Venda).toLocaleDateString('pt-BR');
    const precoUnitario = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.Preco_Produto || 0);
    const precoTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.Valor_Total);
    
    // Lista de Produtos/Itens (assumindo que seja um array, ou simulação de um item principal)
    const itens = venda.Itens || [{ 
        nome: venda.Produto_Nome || 'Produto Principal', 
        quantidade: venda.Quantidade || 1, 
        preco: precoUnitario 
    }];

    return (
        <div className={styles.notaCard}>
            <div className={styles.header}>
                <Receipt size={24} className={styles.icon} />
                <h3 className={styles.title}>Venda #{venda.ID_Venda}</h3>
                <span className={styles.status}>{venda.Status}</span>
            </div>
            
            {/* Seção 1: Cliente e Data */}
            <div className={styles.infoSection}>
                <p className={styles.detail}><strong>Vendedor:</strong> {venda.Vendedor_Nome || 'Você'}</p>
                <p className={styles.detail}><strong>Cliente:</strong> {venda.Cliente_Nome || 'Não Informado'}</p>
                <p className={styles.detail}><strong>Data:</strong> {dataFormatada}</p>
            </div>

            {/* Seção 2: Itens da Venda */}
            <h4 className={styles.sectionTitle}>Itens Comprados:</h4>
            <div className={styles.itemsList}>
                {itens.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <span className={styles.itemDesc}>{item.nome}</span>
                        <span className={styles.itemQtd}>Qtd: {item.quantidade}</span>
                        <span className={styles.itemPreco}>Unit.: {item.preco}</span>
                    </div>
                ))}
            </div>

            {/* Seção 3: Total e Ações */}
            <div className={styles.footer}>
                <h3 className={styles.total}>Total: {precoTotal}</h3>
                <div className={styles.actions}>
                    <button onClick={() => onEdit(venda)} className={styles.editBtn} title="Editar Venda">
                        <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(venda)} className={styles.deleteBtn} title="Excluir Venda">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default cardVenda;