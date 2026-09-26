const Nota = require("../models/Nota");

async function listar(requisicao, resposta) {
  try {
    const notas = await Nota.listarTodas();
    resposta.json(notas);
  } catch (erro) {
    resposta.status(500).json({ erro: "Erro ao listar notas" });
  }
}

async function criar(requisicao, resposta) {
  try {
    const { titulo, conteudo } = requisicao.body;
    const novaNota = await Nota.criar(titulo, conteudo);
    resposta.status(201).json(novaNota);
  } catch (erro) {
    resposta.status(400).json({ erro: erro.message });
  }
}



async function favoritar(requisicao, resposta) {
  try {
    const nota = await Nota.alternarFavorita(requisicao.params.id);
    resposta.json(nota);
  } catch (erro) {
    resposta.status(400).json({ erro: erro.message });
  }
}

module.exports = { listar, criar, favoritar };
