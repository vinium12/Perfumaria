import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import styles from "./table.module.css";

// 🚨 FUNÇÃO DE NORMALIZAÇÃO: Essencial para remover acentos e padronizar o acesso
const normalizeHeader = (header) => {
    // 1. Converte para minúsculo
    let key = header.toLowerCase();
    
    // 2. Remove acentos e cedilha de forma robusta
    // Isso transforma 'endereço' em 'endereco'
    key = key.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
    // 3. Remove espaços (se houver)
    key = key.replace(/\s/g, ''); 
    
    return key;
};

function Table({
  columns = [],
  data = [],
  showActions = false,
  onEdit,
  onDelete,
  actionButton
}) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          {columns.map((col, i) => (
            <div key={i} className={styles.headerCell}>
              {col}
            </div>
          ))}
          {showActions && <div className={styles.headerCell}>Ações</div>}
        </div>

        {data.length > 0 ? (
          data.map((row, i) => (
            <div key={i} className={styles.row}>
              {columns.map((col, j) => {
                
                // 🚨 CORREÇÃO APLICADA: Gera a chave de acesso
                const cellKey = normalizeHeader(col);
                
                return (
                  <div key={j} className={styles.cell}>
                    {/* Acessa o valor do dado usando a chave normalizada */}
                    {row[cellKey]} 
                  </div>
                );
              })}
              {showActions && (
                <div className={`${styles.cell} ${styles.actions}`}>
                  {onEdit && (
                    <button
                      className={styles.editBtn}
                      onClick={() => onEdit(row)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(row)}
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noData}>Nenhum registro encontrado</div>
        )}

        {actionButton && (
          <div className={styles.bottomButton}>{actionButton}</div>
        )}
      </div>
    </>
  );
}

export default Table;