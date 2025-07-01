// src/services/authServices.js
import { query } from "../db.js"; // Importa sua função de query do DB
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"; // Para carregar variáveis de ambiente

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte"; // Use a mesma chave do .env
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // Tempo de expiração do token

// Função auxiliar para tratamento de erros em serviços
const throwServiceError = (message, error) => {
  console.error(`Erro no serviço de autenticação: ${message}`, error);
  // Não exponha detalhes internos do erro em produção, apenas uma mensagem genérica ou específica para o usuário.
  throw new Error(message);
};

// 1. Registro de um novo usuário
export const registerUser = async (username, password, email) => {
  try {
    const password_hash = await bcrypt.hash(password, 10); // Gera um hash da senha
    const { rows } = await query(
      `INSERT INTO estoque.users (username, password_hash, email)
       VALUES($1, $2, $3) RETURNING id, username, email;`,
      [username, password_hash, email]
    );
    return rows[0];
  } catch (error) {
    if (error.code === '23505') { // Código de erro PostgreSQL para violação de unique constraint
      throwServiceError("Nome de usuário ou email já registrado.", error);
    }
    throwServiceError("Falha ao registrar usuário no banco de dados.", error);
  }
};

// 2. Login de um usuário existente
export const loginUser = async (username, password) => {
  try {
    const { rows } = await query(
      `SELECT id, username, password_hash FROM estoque.users WHERE username = $1;`,
      [username]
    );

    if (rows.length === 0) {
      throw new Error("Credenciais inválidas: Usuário não encontrado.");
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash); // Compara a senha fornecida com o hash

    if (!isMatch) {
      throw new Error("Credenciais inválidas: Senha incorreta.");
    }

    // Gerar JWT (JSON Web Token)
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload do token
      JWT_SECRET, // Sua chave secreta
      { expiresIn: JWT_EXPIRES_IN } // Tempo de expiração
    );

    return { token, user: { id: user.id, username: user.username } };
  } catch (error) {
    // Propaga erros de credenciais inválidas ou outros erros para o controlador
    throwServiceError(error.message || "Falha ao fazer login.", error);
  }
};