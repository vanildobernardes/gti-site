import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

/* ROTA DE CADASTRO APARELHO */

// Rotas de busca devem vir antes de rotas com parâmetros de ID para evitar conflitos
router.get("/aparelho/search", clientController.searchAparelhos); // Sem '?' no path

router.get("/aparelho", clientController.getAparelho);
router.post("/aparelho", clientController.createAparelho);
router.put("/aparelho/:id_aparelho", clientController.updateAparelho);
router.delete("/aparelho/:id_aparelho", clientController.deleteAparelho);


/* ROTA DE CADASTRO PROFISSIONAIS*/

// Rotas de busca devem vir antes de rotas com parâmetros de ID
router.get("/profissional/search", clientController.searchProfissional);

router.get("/profissional", clientController.getProfissional);
router.post("/profissional", clientController.createProfissional);
router.put(
  "/profissional/:id_profissional",
  clientController.updateProfissional
);
router.delete(
  "/profissional/:id_profissional",
  clientController.deleteProfissional
);

export default router;