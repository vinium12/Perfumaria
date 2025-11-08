{/* Classe do Método de Renderização Principal da Aplicação */}

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

{/* Import do CSS da Página da Estrutura do Site */}
import "./index.css";

{/* Import da Página que Agrupa Todos os Elementos do Site */}
import App from "./App.jsx";

{/* Método de Renderização Segura do Site */}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);