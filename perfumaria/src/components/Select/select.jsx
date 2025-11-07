{
  /* Classe de Criação do Componente Select Utilizado nos Formulários do Site */
}

import React from "react";

{
  /* Import do CSS do Componente */
}
import styles from "./select.module.css";

{/* Função de Criação do Componente */}
const Select = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Selecione...",
  options = [],
  ...rest
}) => {
  const normalized = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.selectField}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className={styles.selectArrow} aria-hidden="true">
          ▾
        </span>
      </div>
    </div>
  );
};

export default Select;