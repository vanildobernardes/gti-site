// src/routes/authRoute.js
import express from "express";
import * as authController from "../controllers/authController.js"; // Importa os novos controladores

const router = express.Router();

router.post("/register", authController.register); // Rota para registrar
router.post("/login", authController.login);     // Rota para fazer login

export default router;