{
  /* Classe de Criação do Componente Padrão Para as Telas de Edição */
}

import React, { useState, useMemo } from "react";

{
  /* Import do Componente Input */
}
import Input from "../Input/input";

{
  /* Import do CSS do Componente */
}
import styles from "./formedit.module.css";

{
  /* Função de Criação do Formulário de Edição */
}
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

  {/* Função Para Reutilização do Forms Tanto Para Edição Quanto Cadastro */}
  const resolvedMode = useMemo(() => {
    if (modo !== "auto") return modo;
    if (/^\s*editar/i.test(titulo)) return "editar";
    if (/^\s*cadastrar/i.test(titulo)) return "cadastrar";
    return Object.keys(valoresIniciais || {}).length ? "editar" : "cadastrar";
  }, [modo, titulo, valoresIniciais]);

  const buttonLabel =
    resolvedMode === "editar" ? "Salvar alterações" : "Cadastrar";

    {/* Função de Ativação do Botão */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   {/* Condicionais Para Ativar Funcionalidades Distintas do Botão */}
    if (resolvedMode === "editar" && typeof onUpdate === "function") {
      onUpdate(formData);
      return;
    }
    if (resolvedMode === "cadastrar" && typeof onCreate === "function") {
      onCreate(formData);
      return;
    }
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }
  };

  {/* Criação dos Elementos Visuais do Componente */}
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