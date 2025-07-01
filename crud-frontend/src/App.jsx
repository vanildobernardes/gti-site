// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css"; // Certifique-se de que este caminho está correto

// Importe todos os componentes necessários
import Navbar from "./componentes/Navbar.jsx";
import Footer from "./componentes/Footer.jsx";
import Login from "./componentes/Login.jsx";
import AparelhosPage from "./pages/AparelhosPage.jsx";
import ProfissionaisPage from "./pages/ProfissionaisPage.jsx";
import Register from "./pages/Register.jsx"; // Importe a nova página de registro

import axios from "axios"; // Importe o Axios

function App() {
  // Inicializa isAuthenticated lendo diretamente do localStorage.
  // Isso define o estado inicial com base no que já está salvo.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });
  const navigate = useNavigate();

  // O useEffect agora foca apenas nos interceptores do Axios,
  // pois o estado inicial já é definido pelo useState.
  useEffect(() => {
    // Interceptor para adicionar o token JWT em todas as requisições
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para lidar com respostas 401 (Não Autorizado)
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expirado ou inválido. Redirecionando para login.");
          localStorage.removeItem('token');
          localStorage.removeItem('user'); // Limpa os dados do usuário também
          setIsAuthenticated(false); // Define o estado para não autenticado
          navigate('/login'); // Redireciona para a página de login
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]); // Dependência para que o useEffect seja executado quando navigate muda

  // Função para lidar com o sucesso do login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // A navegação para /aparelhos já é feita dentro de Login.jsx
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    localStorage.removeItem('user'); // Remove informações do usuário
    setIsAuthenticated(false); // Atualiza o estado para não autenticado
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <>
      {/* O link para o Font Awesome é geralmente colocado no index.html (público)
          para ser carregado uma única vez para toda a aplicação.
          Mantido aqui por compatibilidade, mas mover é uma boa prática. */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/* Navbar é renderizado uma única vez para toda a aplicação */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* As rotas são definidas uma única vez */}
      <Routes>
        {/* Rotas acessíveis sem autenticação */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas (só acessíveis se isAuthenticated for true) */}
        {isAuthenticated ? (
          <>
            {/* Rota padrão após login. Redirecione para AparelhosPage diretamente. */}
            <Route path="/" element={<AparelhosPage />} />
            <Route path="/aparelhos" element={<AparelhosPage />} />
            <Route path="/profissionais" element={<ProfissionaisPage />} />
            {/* Adicione outras rotas protegidas aqui conforme necessário */}
          </>
        ) : (
          /* Qualquer outra rota que não seja /login ou /register
             e que o usuário não esteja autenticado, redireciona para login. */
          <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>

      {/* Footer é renderizado uma única vez para toda a aplicação */}
      <Footer />
    </>
  );
}

export default App;