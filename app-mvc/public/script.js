const formNota = document.getElementById("formNota");
const listaNotas = document.getElementById("listaNotas");

async function carregarNotas() {
  const resposta = await fetch("/api/notas");
  const notas = await resposta.json();

  listaNotas.innerHTML = "";
  notas.forEach((nota) => {
    const item = document.createElement("li");
    item.textContent = `${nota.titulo} - ${nota.conteudo}`;
    listaNotas.appendChild(item);
  });
}

formNota.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;

  await fetch("/api/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, conteudo }),
  });

  formNota.reset();
  carregarNotas();
});

carregarNotas();
