import { query } from "../db.js";

// Função utilitária para lançar erros de serviço
const throwServiceError = (message, error) => {
  console.error(`Erro no serviço: ${message}`, error);
  throw new Error(message);
};

export const getAparelho = async () => {
  try {
    const { rows } = await query("select * from estoque.aparelho");
    return rows;
  } catch (error) {
    throwServiceError("Falha ao buscar aparelhos no banco de dados.", error);
  }
};

/* INSERÇÃO DE APARELHOS */
export const createAparelho = async (aparelhoData) => {
  try {
    // Verifique a ordem dos campos no SQL e nos dados
    const { rows } = await query(
      `INSERT INTO estoque.aparelho
      (tipo_aparelho, modelo_aparelho, numero_serie_aparelho,
       numero_telefone_aparelho, patrimonio_aparelho, data_entrega_aparelho,
       entregou_aparelho, profissional_aparelho, aparelho_proprio) -- Ajuste os nomes das colunas conforme seu DB
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
      [
        aparelhoData.tipo_aparelho,
        aparelhoData.modelo_aparelho,
        aparelhoData.numero_serie_aparelho,
        aparelhoData.numero_telefone_aparelho,
        aparelhoData.patrimonio_aparelho,
        aparelhoData.data_entrega_aparelho,
        aparelhoData.entregou_aparelho, // Campo de quem entregou
        aparelhoData.profissional_aparelho, // Campo do profissional responsável
        aparelhoData.aparelho_proprio,
      ]
    );
    return rows[0];
  } catch (error) {
    throwServiceError("Falha ao inserir aparelho no banco de dados.", error);
  }
};

/* UPDATE DE APARELHOS */
export const updateAparelho = async (aparelhoId, aparelhoData) => {
  try {
    const {
      tipo_aparelho,
      modelo_aparelho,
      numero_serie_aparelho,
      numero_telefone_aparelho,
      patrimonio_aparelho,
      data_entrega_aparelho,
      entregou_aparelho, // Quem entregou
      profissional_aparelho, // Profissional responsável
      aparelho_proprio,
    } = aparelhoData;

    const { rows } = await query(
      `UPDATE estoque.aparelho SET
        tipo_aparelho = $1,
        modelo_aparelho = $2,
        numero_serie_aparelho = $3,
        numero_telefone_aparelho = $4,
        patrimonio_aparelho = $5,
        data_entrega_aparelho = $6,
        entregou_aparelho = $7,
        profissional_aparelho = $8,
        aparelho_proprio = $9
      WHERE id_aparelho = $10 RETURNING *`, // Corrigido para $10 e removido 'responsabilidade_aparelho' se não for usada
      [
        tipo_aparelho,
        modelo_aparelho,
        numero_serie_aparelho,
        numero_telefone_aparelho,
        patrimonio_aparelho,
        data_entrega_aparelho,
        entregou_aparelho,
        profissional_aparelho,
        aparelho_proprio,
        aparelhoId, // id_aparelho é o 10º parâmetro
      ]
    );
    return rows[0]; // Retorna o aparelho atualizado ou undefined se não encontrar
  } catch (error) {
    throwServiceError("Falha ao atualizar aparelho no banco de dados.", error);
  }
};

export const deleteAparelho = async (aparelhoId) => {
  try {
    const { rowCount } = await query(
      `DELETE FROM estoque.aparelho WHERE id_aparelho = $1`,
      [aparelhoId]
    );
    return rowCount > 0; // Retorna true se algo foi deletado, false caso contrário
  } catch (error) {
    throwServiceError("Falha ao deletar aparelho no banco de dados.", error);
  }
};

/* PESQUISAS AVANÇADAS */
export const searchAparelhos = async (searchTerm) => {
  try {
    const { rows } = await query(
      `SELECT * FROM estoque.aparelho
      WHERE
      tipo_aparelho ILIKE $1
      OR modelo_aparelho ILIKE $1
      OR numero_serie_aparelho ILIKE $1
      OR numero_telefone_aparelho ILIKE $1
      OR patrimonio_aparelho::text ILIKE $1`, // Converte para texto para busca LIKE
      [`%${searchTerm}%`]
    );
    return rows;
  } catch (error) {
    throwServiceError("Falha ao buscar aparelhos no banco de dados.", error);
  }
};

export const searchProfissionais = async (searchTerm) => { // Nome consistente
  try {
    const { rows } = await query(
      `SELECT * FROM estoque.profissionais
      WHERE
      nome_profissional ILIKE $1
      OR cpf_profissional ILIKE $1
      OR funcao_profissional ILIKE $1
      OR local_trabalho_profissional ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  } catch (error) {
    throwServiceError("Falha ao buscar profissionais no banco de dados.", error);
  }
};

/** SERVIÇOS DE PROFISSIONAIS */
export const getProfissional = async () => {
  try {
    const { rows } = await query("select * from estoque.profissionais");
    return rows;
  } catch (error) {
    throwServiceError("Falha ao buscar profissionais no banco de dados.", error);
  }
};

export const createProfissional = async (profissionalData) => {
  try {
    const {
      nome_profissional,
      cpf_profissional,
      funcao_profissional,
      local_trabalho_profissional,
    } = profissionalData;
    const { rows } = await query(
      `INSERT INTO estoque.profissionais
      (nome_profissional, cpf_profissional, funcao_profissional, local_trabalho_profissional)
      VALUES($1, $2, $3, $4) RETURNING *`,
      [
        nome_profissional,
        cpf_profissional,
        funcao_profissional,
        local_trabalho_profissional,
      ]
    );
    return rows[0]; // **CORRIGIDO: Retornar o novo profissional**
  } catch (error) {
    throwServiceError("Falha ao inserir profissional no banco de dados.", error);
  }
};

export const updateProfissional = async (profissionalId, profissionalData) => {
  try {
    const {
      nome_profissional,
      cpf_profissional,
      funcao_profissional,
      local_trabalho_profissional,
    } = profissionalData;
    const { rows } = await query(
      `UPDATE estoque.profissionais SET  -- Corrigido para 'profissionais'
        nome_profissional = $1,
        cpf_profissional = $2,
        funcao_profissional = $3,
        local_trabalho_profissional = $4
      WHERE id_profissional = $5 RETURNING *`,
      [
        nome_profissional,
        cpf_profissional,
        funcao_profissional,
        local_trabalho_profissional,
        profissionalId,
      ]
    );
    return rows[0]; // Retorna o profissional atualizado ou undefined se não encontrar
  } catch (error) {
    throwServiceError("Falha ao atualizar profissional no banco de dados.", error);
  }
};

export const deleteProfissional = async (profissionalId) => {
  try {
    const { rowCount } = await query(
      `DELETE FROM estoque.profissionais WHERE id_profissional = $1`,
      [profissionalId]
    );
    return rowCount > 0;
  } catch (error) {
    throwServiceError("Falha ao deletar profissional no banco de dados.", error);
  }
};