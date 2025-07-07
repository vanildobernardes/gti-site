import * as clientService from "../services/clientServices.js";

// Função utilitária para tratamento de erros comuns
const handleError = (res, err) => {
  console.error("Erro no controlador:", err); // Log do erro interno
  res.status(500).json({ error: "Ocorreu um erro interno no servidor." }); // Mensagem genérica para o cliente
};

export const getAparelho = async (req, res) => {
  try {
    const aparelhos = await clientService.getAparelho();
    res.status(200).json(aparelhos);
  } catch (err) {
    handleError(res, err);
  }
};

export const createAparelho = async (req, res) => {
  try {
    const aparelhoData = req.body;
    const newAparelho = await clientService.createAparelho(aparelhoData);
    res.status(201).json(newAparelho); // Status 201 para criação bem-sucedida
  } catch (err) {
    handleError(res, err);
  }
};

export const updateAparelho = async (req, res) => {
  try {
    const aparelhoId = req.params.id_aparelho;
    const aparelhoData = req.body;
    const updatedAparelho = await clientService.updateAparelho(
      aparelhoId,
      aparelhoData
    );
    if (!updatedAparelho) {
      // Se o service retornar null/undefined, significa que não encontrou o aparelho
      return res.status(404).json({ error: "Aparelho não encontrado." });
    }
    res.status(200).json(updatedAparelho);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteAparelho = async (req, res) => {
  try {
    const aparelhoId = req.params.id_aparelho;
    const deleted = await clientService.deleteAparelho(aparelhoId);
    if (!deleted) {
      return res.status(404).json({ error: "Aparelho não encontrado para exclusão." });
    }
    res.status(204).send(); // Status 204 No Content para exclusão bem-sucedida
  } catch (err) {
    handleError(res, err);
  }
};

export const searchAparelhos = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "O termo de busca (q) é obrigatório." });
    }
    const aparelhos = await clientService.searchAparelhos(searchTerm);
    res.status(200).json(aparelhos);
  } catch (err) {
    handleError(res, err);
  }
};

// Novo controlador para buscar opções distintas de tipo e modelo de aparelho
export const getDistinctAparelhoOptions = async (req, res) => {
  try {
    const options = await clientService.getDistinctAparelhoTypesAndModels();
    res.status(200).json(options);
  } catch (err) {
    handleError(res, err);
  }
};


/**CONTROLES DE PROFISSIONAIS */

export const getProfissional = async (req, res) => {
  try {
    const profissionais = await clientService.getProfissional();
    res.status(200).json(profissionais);
  } catch (err) {
    handleError(res, err);
  }
};

export const createProfissional = async (req, res) => {
  try {
    const profissionalData = req.body;
    const newProfissional = await clientService.createProfissional(
      profissionalData
    );
    res.status(201).json(newProfissional); // Status 201 para criação
  } catch (err) {
    handleError(res, err);
  }
};

export const updateProfissional = async (req, res) => {
  try {
    const profissionalId = req.params.id_profissional;
    const profissionalData = req.body;
    const updatedProfissional = await clientService.updateProfissional(
      profissionalId,
      profissionalData
    );
    if (!updatedProfissional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }
    res.status(200).json(updatedProfissional);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteProfissional = async (req, res) => {
  try {
    const profissionalId = req.params.id_profissional;
    const deleted = await clientService.deleteProfissional(profissionalId);
    if (!deleted) {
      return res.status(404).json({ error: "Profissional não encontrado para exclusão." });
    }
    res.status(204).send(); // Status 204 No Content
  } catch (err) {
    handleError(res, err);
  }
};

export const searchProfissional = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "O termo de busca (q) é obrigatório." });
    }
    const profissionais = await clientService.searchProfissionais(searchTerm); // Corrigido para searchProfissionais
    res.status(200).json(profissionais);
  } catch (err) {
    handleError(res, err);
  }
};