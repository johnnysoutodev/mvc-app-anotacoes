const formNota = document.getElementById("formNota");
const listaNotas = document.getElementById("listaNotas");
const mensagem = document.getElementById("mensagem");

async function carregarNotas() {
  const resposta = await fetch("/api/notas");
  const notas = await resposta.json();

  listaNotas.innerHTML = "";
  notas.forEach((nota) => {
    const item = document.createElement("li");

    const estrela = document.createElement("button");
    estrela.className = nota.favorita ? "estrela favorita" : "estrela";
    estrela.textContent = nota.favorita ? "★" : "☆";
    estrela.title = nota.favorita ? "Remover dos favoritos" : "Favoritar";
    estrela.onclick = async () => {
      await fetch(`/api/notas/${nota.id}/favorita`, { method: "PATCH" });
      carregarNotas();
    };
    item.appendChild(estrela);

    const texto = document.createElement("div");
    texto.className = "texto";

    const titulo = document.createElement("strong");
    titulo.textContent = nota.titulo;
    texto.appendChild(titulo);

    if (nota.conteudo) {
      const conteudo = document.createElement("p");
      conteudo.textContent = nota.conteudo;
      texto.appendChild(conteudo);
    }
    item.appendChild(texto);

    const botao = document.createElement("button");
    botao.textContent = "Excluir";
    botao.onclick = async () => {
      await fetch(`/api/notas/${nota.id}`, { method: "DELETE" });
      carregarNotas();
    };
    item.appendChild(botao);

    listaNotas.appendChild(item);
  });
}

formNota.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;

  const resposta = await fetch("/api/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, conteudo }),
  });

  if (!resposta.ok) {
    const { erro } = await resposta.json();
    mensagem.textContent = erro;
    return;
  }

  mensagem.textContent = "";
  formNota.reset();
  carregarNotas();
});

carregarNotas();
