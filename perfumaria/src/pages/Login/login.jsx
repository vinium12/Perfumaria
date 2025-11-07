import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/input";
import styles from "./login.module.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          senha: credentials.password,
        }),
      });

      const data = await res.json();
      console.log("🔍 Backend respondeu:", data);

      if (!res.ok) {
        setErro(data.message || "Erro no login");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.vendedor));
      onLogin(data.vendedor);
      navigate("/");
    } catch (err) {
      setErro("Falha na conexão com o servidor");
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginCard}>
        <h2>Login</h2>

        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

          <button
            onClick={handleLogin}
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--RoxoMain)",
              font: "var(--Titulos)",
              fontSize: "2rem",
              color: "var(--BrancoMain)",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
              width: "100%",
              marginTop: "20px",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;