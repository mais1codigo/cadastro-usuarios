const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// cria o caminho do banco
const dbPath = path.resolve(__dirname, "database.db");

// conecta ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Banco de dados conectado!");
  }
});

// cria a tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

module.exports = db;
