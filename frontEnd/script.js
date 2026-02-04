const API_URL = 'http://localhost:3000/users';

function carregarUsuarios() {
  fetch(API_URL)
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById('lista-usuarios');
      lista.innerHTML = '';

      dados.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${user.nome} (${user.email})
          <button onclick="deletarUsuario(${user.id})">Excluir</button>
        `;
        lista.appendChild(li);
      });
    });
}

function criarUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email })
  })
  .then(() => {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    carregarUsuarios();
  });
}

function deletarUsuario(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregarUsuarios());
}

carregarUsuarios();


fetch("http://localhost:3000/usuarios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nome: nomeDigitado,
    email: emailDigitado
  })
})
