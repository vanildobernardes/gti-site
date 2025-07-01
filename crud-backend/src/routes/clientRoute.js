// src/routes/clientRoute.js
import express from "express";
import * as clientController from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js"; // Importe o middleware de proteção

const router = express.Router();

/* ROTAS DE APARELHO (AGORA PROTEGIDAS) */
// A ordem da rota de busca é importante: coloque-a antes da rota com :id_aparelho
router.get("/aparelho/search", protect, clientController.searchAparelhos); // Protegida
router.get("/aparelho", protect, clientController.getAparelho);           // Protegida
router.post("/aparelho", protect, clientController.createAparelho);       // Protegida
router.put("/aparelho/:id_aparelho", protect, clientController.updateAparelho); // Protegida
router.delete("/aparelho/:id_aparelho", protect, clientController.deleteAparelho); // Protegida

/* ROTAS DE PROFISSIONAIS (AGORA PROTEGIDAS)*/
// A ordem da rota de busca é importante: coloque-a antes da rota com :id_profissional
router.get("/profissional/search", protect, clientController.searchProfissional); // Protegida
router.get("/profissional", protect, clientController.getProfissional);           // Protegida
router.post("/profissional", protect, clientController.createProfissional);       // Protegida
router.put(
  "/profissional/:id_profissional",
  protect,
  clientController.updateProfissional
); // Protegida
router.delete(
  "/profissional/:id_profissional",
  protect,
  clientController.deleteProfissional
); // Protegida

export default router;