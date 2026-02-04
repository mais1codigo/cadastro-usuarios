const express = require("express");
const db = require("../database/db");

const router = express.Router();

// cadastrar usuário
router.post("/", (req, res) => {
  const { nome, email } = req.body;
  

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  const sql = "INSERT INTO users (nome, email) VALUES (?, ?)";

  db.run(sql, [nome, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      nome,
      email,
    });
  });

  console.log("REQ BODY:", req.body)

});

module.exports = router;

// listar usuários
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// atualizar usuário
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  const sql = "UPDATE users SET nome = ?, email = ? WHERE id = ?";

  db.run(sql, [nome, email, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário atualizado com sucesso" });
  });
});

// excluir usuário
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário removido com sucesso" });
  });
});


