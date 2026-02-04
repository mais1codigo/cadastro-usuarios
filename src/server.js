const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



const db = require("./database/db");
const usersRoutes = require("./routes/users");



const PORT = 3000;

app.use("/users", usersRoutes);



app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



