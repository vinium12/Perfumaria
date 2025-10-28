import React, { useState } from "react";
import Input from "../Input/input";
import styles from "./formedit.module.css";

const Formedit = ({ titulo, campos, onSubmit, valoresIniciais = {} }) => {
  const [formData, setFormData] = useState(valoresIniciais);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{titulo}</h2>

        {campos.map((campo) => (
          <Input
            key={campo.name}
            label={campo.label}
            name={campo.name}
            type={campo.type || "text"}
            value={formData[campo.name] || ""}
            onChange={handleChange}
            placeholder={campo.placeholder}
          />
        ))}

        <button type="submit" className={styles.button}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Formedit;
