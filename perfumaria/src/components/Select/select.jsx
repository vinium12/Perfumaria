import React from "react";
import styles from "./select.module.css"; // reaproveita o mesmo CSS

const Select = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Selecione...",
  options = [], // pode ser [{label, value}] ou ["Opção 1", "Opção 2"]
  ...rest
}) => {
  // normaliza opções se vierem como string[]
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
          {/* placeholder “fantasma” */}
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* seta (chevron) */}
        <span className={styles.selectArrow} aria-hidden="true">
          ▾
        </span>
      </div>
    </div>
  );
};

export default Select;