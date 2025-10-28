import React, { useState, useMemo } from "react";
import Input from "../Input/input";
import styles from "./formedit.module.css";

/**
 * Props:
 * - titulo: string (ex.: "Editar Produto" | "Cadastrar Produto")
 * - modo: "editar" | "cadastrar" | "auto" (default "auto")
 * - campos: [{ name, label, type?, placeholder? }]
 * - valoresIniciais: {} (para edição)
 * - onCreate?: (dados) => void
 * - onUpdate?: (dados) => void
 * - onSubmit?: (dados) => void   // fallback/retrocompatibilidade
 */
const Formedit = ({
  titulo,
  modo = "auto",
  campos = [],
  onCreate,
  onUpdate,
  onSubmit,
  valoresIniciais = {},
}) => {
  const [formData, setFormData] = useState(valoresIniciais);

  // Resolve modo: prioridade para prop 'modo'; se "auto", infere do título.
  const resolvedMode = useMemo(() => {
    if (modo !== "auto") return modo;
    if (/^\s*editar/i.test(titulo)) return "editar";
    if (/^\s*cadastrar/i.test(titulo)) return "cadastrar";
    // fallback seguro
    return Object.keys(valoresIniciais || {}).length ? "editar" : "cadastrar";
  }, [modo, titulo, valoresIniciais]);

  const buttonLabel =
    resolvedMode === "editar" ? "Salvar alterações" : "Cadastrar";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (resolvedMode === "editar" && typeof onUpdate === "function") {
      onUpdate(formData);
      return;
    }
    if (resolvedMode === "cadastrar" && typeof onCreate === "function") {
      onCreate(formData);
      return;
    }
    // retrocompatível: mantém comportamento antigo
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }
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
            value={formData[campo.name] ?? ""}
            onChange={handleChange}
            placeholder={campo.placeholder}
          />
        ))}

        <button type="submit" className={styles.button}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default Formedit;

