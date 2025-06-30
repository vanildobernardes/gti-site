import pg from "pg";
import env from "dotenv";

env.config();

const { Pool } = pg; // Importa Pool do pg

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  // Opcional: Adicione configurações para o pool, como max conexões, idleTimeoutMillis, etc.
  // max: 20, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

// Testar a conexão do pool ao iniciar a aplicação
pool.connect((err, client, release) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    process.exit(-1); // Sai da aplicação se não conseguir conectar
  }
  console.log("Conectado ao banco de dados PostgreSQL!");
  release(); // Libera o cliente de volta para o pool
});

// Evento de erro do pool
pool.on("error", (err, client) => {
  console.error("Erro inesperado no pool de conexões do DB:", err.stack);
  // Não encerre o processo aqui, o pool tentará se recuperar
});

export const query = (text, params) => pool.query(text, params); // Agora usa o pool