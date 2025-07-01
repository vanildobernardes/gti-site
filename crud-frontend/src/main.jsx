// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importe BrowserRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Adicione o BrowserRouter aqui */}
      <App />
    </BrowserRouter>
  </StrictMode>
);