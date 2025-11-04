import React from 'react';
import { Receipt, Trash2, Pencil } from 'lucide-react';
import styles from './cardVenda.module.css'; 

const CardNotaFiscal = ({ venda, onEdit, onDelete }) => {
    
    // 1. Formatação dos Dados
    const dataFormatada = venda.Data_Venda || 'Data Indisponível'; 
    
    const precoTotal = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(venda.Valor_Total || 0);
    
    const itens = venda.Itens || [];

    return (
        <div className={styles.notaCard}>
            {/* Cabeçalho da nota */}
            <div className={styles.header}>
                <Receipt size={24} className={styles.icon} />
                <h3 className={styles.title}>Venda #{venda.ID_Venda || 'Não Informada'}</h3>
            </div>
            
            {/* Seção 1: Cliente e Data */}
            <div className={styles.infoSection}>
                <p className={styles.detail}><strong>Cliente:</strong> {venda.Cliente_Nome || 'Não Informado'}</p>
                <p className={styles.detail}><strong>Data:</strong> {dataFormatada}</p>
            </div>

            {/* Seção 2: Itens da Venda */}
            <h4 className={styles.sectionTitle}>Itens Comprados:</h4>
            <div className={styles.itemsList}>
                {itens.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <span className={styles.itemDesc}>{item.Produto_Nome}</span>
                        <span className={styles.itemQtd}>Qtd: {item.Qtd_Vendida}</span>
                        <span className={styles.itemPreco}>
                            Unit.: {new Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                            }).format(item.Preco_Unitario || 0)}
                        </span>
                    </div>
                ))}
                {itens.length === 0 && <p>Nenhum item na nota.</p>}
            </div>

            {/* Seção 3: Total e Ações */}
            <div className={styles.footer}>
                <h3 className={styles.total}>Total: {precoTotal}</h3>
                <div className={styles.actions}>
                    <button 
                        onClick={() => onEdit(venda)} 
                        className={styles.editBtn} 
                        title="Editar Venda"
                    >
                        <Pencil size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(venda)} 
                        className={styles.deleteBtn} 
                        title="Excluir Venda"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardNotaFiscal;
