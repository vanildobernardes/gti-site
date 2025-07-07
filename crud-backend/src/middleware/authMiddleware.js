// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import "dotenv/config"; // Para carregar JWT_SECRET

const JWT_SECRET = process.env.JWT_SECRET || "OKjVIuGrXIAwZE16UUpdpiqVgoz9fyIxbqTrmEUSDTVMGgTo9gpzEHuH9R7x07Wi"; // Use a mesma chave do .env

export const protect = (req, res, next) => {
  let token;

  // Verifica se o token está no cabeçalho Authorization como "Bearer TOKEN"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extrai o token da string "Bearer TOKEN"
      token = req.headers.authorization.split(" ")[1];

      // Verifica e decodifica o token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Você pode anexar o payload decodificado ao objeto req,
      // para que os controladores posteriores possam acessar o ID/username do usuário
      req.user = decoded;
      next(); // Continua para a próxima função middleware ou rota
    } catch (error) {
      console.error("Erro na verificação do token:", error);
      return res.status(401).json({ error: "Não autorizado, token inválido ou expirado." });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Não autorizado, nenhum token fornecido." });
  }
};