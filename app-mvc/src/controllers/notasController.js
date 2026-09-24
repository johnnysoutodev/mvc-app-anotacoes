const Nota = require("../models/Nota");

async function listar(requisicao, resposta) {
  const notas = await Nota.listarTodas();
  resposta.json(notas);
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

async function remover(requisicao, resposta) {
  await Nota.remover(requisicao.params.id);
  resposta.status(204).send();
}

module.exports = { listar, criar, remover };
