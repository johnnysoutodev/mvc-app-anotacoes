require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

// Conexão com o banco no mesmo arquivo das rotas e do HTML
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

app.get("/", async (requisicao, resposta) => {
  try {
    // SQL, regra de negócio (favoritas primeiro) e HTML, tudo na mesma rota
    const resultado = await pool.query(
      "SELECT * FROM notas ORDER BY favorita DESC, criado_em DESC"
    );

    const linhas = resultado.rows
      .map(
        (nota) => `
        <li>
          <form method="POST" action="/notas/${nota.id}/favorita">
            <button class="estrela ${nota.favorita ? "favorita" : ""}"
              title="${nota.favorita ? "Remover dos favoritos" : "Favoritar"}">
              ${nota.favorita ? "★" : "☆"}
            </button>
          </form>
          <div class="texto">
            <strong>${escapar(nota.titulo)}</strong>
            ${nota.conteudo ? `<p>${escapar(nota.conteudo)}</p>` : ""}
          </div>
          <form method="POST" action="/notas/${nota.id}/excluir">
            <button class="excluir">Excluir</button>
          </form>
        </li>`
      )
      .join("");

    const erro = requisicao.query.erro
      ? `<p class="mensagem">${escapar(requisicao.query.erro)}</p>`
      : "";

    resposta.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <title>Minhas Notas (sem MVC)</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #222; }
          form.nova { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
          input, textarea, button { padding: 8px; font-size: 1rem; font-family: inherit; }
          button { cursor: pointer; background: #2d6cdf; color: white; border: none; border-radius: 4px; }
          ul { list-style: none; padding: 0; }
          li { display: flex; align-items: flex-start; gap: 12px; padding: 10px; border-bottom: 1px solid #ddd; }
          li form { margin: 0; }
          .texto { flex: 1; }
          .texto strong { font-size: 1.1rem; }
          .texto p { margin: 4px 0 0; font-size: 0.95rem; color: #555; }
          button.excluir { background: #c8553d; padding: 4px 10px; font-size: 0.9rem; }
          button.estrela { background: none; color: #999; padding: 0; font-size: 1.4rem; line-height: 1; }
          button.estrela.favorita { color: #f2b705; }
          .mensagem { color: #c8553d; }
        </style>
      </head>
      <body>
        <h1>Minhas Notas (sem MVC)</h1>
        <form class="nova" method="POST" action="/notas">
          <input name="titulo" placeholder="Título" required />
          <textarea name="conteudo" placeholder="Conteúdo"></textarea>
          <button type="submit">Salvar</button>
        </form>
        ${erro}
        <ul>${linhas}</ul>
      </body>
      </html>
    `);
  } catch (erro) {
    resposta.status(500).send("Erro ao listar notas");
  }
});

app.post("/notas", async (requisicao, resposta) => {
  const { titulo, conteudo } = requisicao.body;

  // Validação, regra de negócio e persistência, tudo dentro da rota
  if (!titulo) {
    return resposta.redirect("/?erro=" + encodeURIComponent("Título é obrigatório"));
  }

  try {
    await pool.query(
      "INSERT INTO notas (titulo, conteudo) VALUES ($1, $2)",
      [titulo, conteudo]
    );
    resposta.redirect("/");
  } catch (erro) {
    resposta.redirect("/?erro=" + encodeURIComponent("Erro ao salvar a nota"));
  }
});

app.post("/notas/:id/excluir", async (requisicao, resposta) => {
  const id = requisicao.params.id;

  if (!Number.isInteger(Number(id))) {
    return resposta.redirect("/?erro=" + encodeURIComponent("Id inválido"));
  }

  try {
    await pool.query("DELETE FROM notas WHERE id = $1", [id]);
    resposta.redirect("/");
  } catch (erro) {
    resposta.redirect("/?erro=" + encodeURIComponent("Erro ao excluir a nota"));
  }
});

app.post("/notas/:id/favorita", async (requisicao, resposta) => {
  const id = requisicao.params.id;

  if (!Number.isInteger(Number(id))) {
    return resposta.redirect("/?erro=" + encodeURIComponent("Id inválido"));
  }

  try {
    await pool.query(
      "UPDATE notas SET favorita = NOT favorita WHERE id = $1",
      [id]
    );
    resposta.redirect("/");
  } catch (erro) {
    resposta.redirect("/?erro=" + encodeURIComponent("Erro ao favoritar a nota"));
  }
});

app.listen(PORT, () => {
  console.log(`Servidor (sem MVC) rodando em http://localhost:${PORT}`);
});
