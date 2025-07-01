// src/controllers/authController.js
import * as authService from "../services/authServices.js"; // Importa os novos serviços

// Função auxiliar para tratamento de erros em controladores
const handleError = (res, err) => {
  console.error("Erro no controlador de autenticação:", err); // Log para depuração
  // Mensagem genérica para o cliente, evite expor detalhes de erro de servidor
  const statusCode = err.message.includes("Credenciais inválidas") ? 401 : 500;
  res.status(statusCode).json({ error: err.message || "Ocorreu um erro interno no servidor." });
};

// 1. Controlador para registro de usuário
export const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Nome de usuário e senha são obrigatórios." });
  }
  // Validação básica, você pode adicionar mais validações com bibliotecas como Joi
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  try {
    const newUser = await authService.registerUser(username, password, email);
    res.status(201).json({ message: "Usuário registrado com sucesso!", user: newUser }); // Status 201 para criação
  } catch (err) {
    handleError(res, err);
  }
};

// 2. Controlador para login de usuário
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Nome de usuário e senha são obrigatórios." });
  }

  try {
    const { token, user } = await authService.loginUser(username, password);
    res.status(200).json({ message: "Login bem-sucedido!", token, user });
  } catch (err) {
    handleError(res, err);
  }
};