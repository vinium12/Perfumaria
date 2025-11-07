{
  /* */
}

import React from "react";

{
  /* Import dos Ícones de Edição e Exclusão na Tabela */
}
import { Pencil, Trash2 } from "lucide-react";

{
  /* Import do CSS do Componente */
}
import styles from "./table.module.css";

{
  /* Função Para Padronizar a Formatação dos Dados que Entram na Tabela */
}
const normalizeHeader = (header) => {
  let key = header.toLowerCase();
  key = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  key = key.replace(/\s/g, "");
  return key;
};

{
  /* Função de Criação do Componente */
}
function Table({
  columns = [],
  data = [],
  showActions = false,
  onEdit,
  onDelete,
  actionButton,
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
                const cellKey = normalizeHeader(col);

                return (
                  <div key={j} className={styles.cell}>
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