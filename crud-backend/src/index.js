// src/index.js
import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
import authRoutes from "./routes/authRoute.js"; // Importe as rotas de autenticação
// import { protect } from "./middleware/authMiddleware.js"; // Se quiser proteger todas as rotas aqui

const app = express();
const port = process.env.PORT || 3000; // Use a variável de ambiente para a porta

app.use(cors());
app.use(express.json()); // Para parsear o body das requisições JSON

app.use("/api/auth", authRoutes); // Adicione as rotas de autenticação primeiro (não protegidas)
app.use("/api", clientRoutes);    // Suas rotas existentes para aparelhos e profissionais

// Middleware de tratamento de erros global (mantenha como já otimizado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;