const formNota = document.getElementById("formNota");
const listaNotas = document.getElementById("listaNotas");
const mensagem = document.getElementById("mensagem");

async function carregarNotas() {
  const resposta = await fetch("/api/notas");
  const notas = await resposta.json();

  listaNotas.innerHTML = "";
  notas.forEach((nota) => {
    const item = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = nota.conteudo
      ? `${nota.titulo} - ${nota.conteudo}`
      : nota.titulo;
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
