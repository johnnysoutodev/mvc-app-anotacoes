const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// "Banco de dados" em memória - tudo misturado no mesmo arquivo
let notas = [];
let proximoId = 1;

app.get("/", (requisicao, resposta) => {
  // HTML, lógica e dados, tudo junto - sem separação de responsabilidades
  const linhas = notas
    .map((nota) => `<li>${nota.titulo} - ${nota.conteudo}</li>`)
    .join("");

  resposta.send(`
    <html>
      <body>
        <h1>Minhas Notas (sem MVC)</h1>
        <form method="POST" action="/notas">
          <input name="titulo" placeholder="Título" />
          <input name="conteudo" placeholder="Conteúdo" />
          <button type="submit">Salvar</button>
        </form>
        <ul>${linhas}</ul>
      </body>
    </html>
  `);
});

app.post("/notas", (requisicao, resposta) => {
  const { titulo, conteudo } = requisicao.body;

  // validação, regra de negócio e persistência, tudo aqui dentro da rota
  if (!titulo) {
    return resposta.status(400).send("Título é obrigatório");
  }

  notas.push({ id: proximoId++, titulo, conteudo });
  resposta.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor (sem MVC) rodando em http://localhost:${PORT}`);
});
