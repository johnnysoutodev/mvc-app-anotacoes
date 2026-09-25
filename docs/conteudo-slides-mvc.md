# Conteúdo dos Slides — Como desenvolver aplicações web na arquitetura MVC

Cada slide tem: **Título**, **Texto do slide** (o que aparece no slide) e **Fala** (notas do apresentador — cole no campo "Anotações do orador").
O código mostrado é o do projeto real `app-mvc/` (Node.js + Express + PostgreSQL).
Apresentação pronta no PowerPoint: `aula-mvc.pptx` (19 slides, com as falas nas anotações do orador). Versão em PDF para envio: `aula-mvc.pdf`.

---

## Slide 1 — Capa
**Título:** Como desenvolver aplicações web na arquitetura MVC
**Texto do slide:**
- Instrutor: Johnny Souto
- Curso Técnico em Desenvolvimento de Sistemas — SENAI-SP

> *Fala:* "Boa tarde, turma! Hoje vocês vão sair daqui sabendo não só o que é MVC, mas como desenvolver uma funcionalidade de verdade usando essa arquitetura."

## Slide 2 — O monólito
**Título:** O monólito: tudo misturado
**Texto do slide:**
- Tela, regras e banco de dados no mesmo arquivo
- Mudar o visual pode quebrar a regra de negócio
- Difícil de testar, manter e dividir na equipe
- **Situação:** organizar o app de anotações em MVC e criar a função "Excluir nota"

**Código ao lado (cada linha pintada com a cor da camada a que pertence):**
```js
// app-sem-mvc/server.js
app.post("/notas", (req, res) => {
  const { titulo } = req.body;        // vermelho = Controller
  if (!titulo)                        // verde    = Model (regra)
    return res.send("Erro");
  notas.push({ titulo });             // verde    = Model (dados)
  res.send(`<html>                    // amarelo  = View
    <ul>${linhas}</ul>
  </html>`);
});
```

*(Mostrar ao vivo: `app-sem-mvc/server.js`)*

> *Fala:* "Olhem esse arquivo, um monólito: o HTML, a validação e os dados estão todos juntos na mesma rota. Funciona? Funciona. Mas se eu precisar mudar só o visual, vou mexer no mesmo lugar onde está a regra. Isso é risco. Reparem nas cores: vermelho recebe o pedido, verde é regra e dado, amarelo é tela. As três responsabilidades já estão aí, só que embaralhadas. Pergunta pra vocês: como organizariam esse código?"

## Slide 3 — O que é MVC
**Título:** MVC = Model, View, Controller
**Texto do slide:**
- Padrão de arquitetura criado por Trygve Reenskaug (Xerox PARC, 1979)
- Divide a aplicação em 3 responsabilidades
- Cada camada muda por um único motivo

> *Fala:* "MVC é uma forma de dividir o código por responsabilidade. Surgiu no fim dos anos 70 e hoje está em frameworks como Spring, ASP.NET, Laravel, Rails e Express."

## Slide 4 — As 3 camadas
**Título:** Quem faz o quê
**Texto do slide:**

| Camada | Pergunta que responde | No nosso app |
|---|---|---|
| **Model** | Onde ficam os dados e as regras? | `models/Nota.js` |
| **View** | O que o usuário vê? | `public/` (HTML, CSS, JS) |
| **Controller** | O que fazer quando o usuário age? | `controllers/notasController.js` |

> *Fala:* "O Model é o guardião dos dados e das regras. A View é a tela. O Controller é o maestro: recebe o pedido, chama o Model e devolve a resposta."

## Slide 5 — Model
**Título:** Model
**Texto do slide:**
- *Representa os dados e as regras de negócio da aplicação.*
- **O que faz:** define como é uma "nota"; valida regras (título obrigatório); salva, busca e remove no banco
- **O que NÃO faz:** não monta tela nem HTML; não sabe qual botão foi clicado
- **No restaurante:** é a cozinha — conhece as receitas e os ingredientes, e prepara o prato.

> *Fala:* "O Model é o guardião dos dados. Ele sabe como uma nota é estruturada, sabe validar se ela pode ser salva — por exemplo, título obrigatório — e conversa com o banco de dados. O que ele não sabe é como isso vai aparecer na tela. Pensem na cozinha de um restaurante: ela prepara o prato, mas não atende o cliente."

## Slide 6 — View
**Título:** View
**Texto do slide:**
- *É a camada de apresentação: tudo o que o usuário vê e com que interage.*
- **O que faz:** exibe os dados (lista de notas); mostra formulários e botões; envia a ação do usuário
- **O que NÃO faz:** não contém regra de negócio; não acessa o banco de dados
- **No restaurante:** é o prato servido e o cardápio — é o que o cliente vê.

> *Fala:* "A View é tudo que o usuário enxerga: a tela, o HTML, o CSS, os botões. Ela recebe dados prontos e só se preocupa em mostrar bem. Ela não decide regra nenhuma. No restaurante, é o prato bem apresentado e o cardápio."

## Slide 7 — Controller
**Título:** Controller
**Texto do slide:**
- *É o intermediário: recebe a requisição, aciona o Model e devolve a resposta.*
- **O que faz:** recebe a requisição (via rota); chama o Model certo; decide a resposta (status, dados)
- **O que NÃO faz:** não guarda regra de negócio; não monta o visual da tela
- **No restaurante:** é o garçom — anota o pedido, leva à cozinha e traz o prato.

> *Fala:* "O Controller é o maestro. Quando o usuário clica em salvar, é o Controller que recebe esse pedido, pede ao Model para salvar e devolve a resposta para a View. É o garçom: não cozinha e não é o prato, mas conecta o cliente à cozinha."

## Slide 8 — Fluxo de uma requisição
**Título:** O caminho de um clique
**Texto do slide (diagrama):**
```
Usuário clica  →  VIEW  →  ROTA  →  CONTROLLER  →  MODEL  →  BANCO
                   ↑                     │
                   └──── resposta ───────┘
```

> *Fala:* "O usuário clica na View, a requisição chega numa rota, a rota chama o Controller, o Controller pede ao Model, o Model fala com o banco, e a resposta volta até a tela."

## Slide 9 — Vantagens
**Título:** Por que usar MVC?
**Texto do slide:**
1. **Manutenção** — Mudou o visual? Mexe só na View. Mudou a regra? Só no Model.
2. **Testes** — Cada camada pode ser testada separadamente.
3. **Equipe** — Front-end e back-end evoluem em paralelo, sem conflito.
- Usado em Spring, ASP.NET, Laravel, Ruby on Rails, Django e Express.

> *Fala:* "Por isso o MVC importa na prática: se eu quiser mudar o visual, mexo só na View. Se eu quiser mudar uma regra, mexo só no Model. Cada camada pode ser testada separadamente, e times diferentes trabalham em paralelo sem pisar no trabalho um do outro. Por isso os principais frameworks do mercado usam essa ideia."

## Slide 10 — A receita para desenvolver em MVC
**Título:** 5 passos para criar qualquer funcionalidade
**Texto do slide:**
1. **Model** — o que fazer com os dados?
2. **Controller** — como receber o pedido e responder?
3. **Rota** — qual URL chama o Controller?
4. **View** — como o usuário aciona e vê o resultado?
5. **Testar** — funciona de ponta a ponta?

> *Fala:* "Essa é a receita que vocês vão levar pra vida. Toda funcionalidade nova em MVC segue esse caminho. Agora vamos aplicar ao vivo."

---

## PRÁTICA — Desenvolvendo a funcionalidade "Excluir nota"

## Slide 11 — Estrutura do projeto
**Título:** Organização das pastas
**Texto do slide:**
```
app-mvc/
├── db/init.sql                → tabela notas
├── src/
│   ├── config/db.js           → conexão com o banco
│   ├── models/Nota.js         → MODEL
│   ├── controllers/notasController.js → CONTROLLER
│   ├── routes/notasRoutes.js  → ROTAS
│   └── app.js                 → servidor
└── public/                    → VIEW
```

> *Fala:* "Só olhando as pastas já dá pra saber onde cada coisa está. Isso é organização. Vou rodar o app e criar uma nota... Agora o cliente pediu: quer poder excluir notas. Vamos seguir a receita."

## Slide 12 — Passo 1: Model
**Título:** Passo 1 — Model: falar com o banco
**Texto do slide:**
```js
// src/models/Nota.js
static async remover(id) {
  await pool.query("DELETE FROM notas WHERE id = $1", [id]);
}
```

> *Fala:* "Pergunta: onde fica o comando que apaga do banco? No Model! Reparem que ele não sabe nada de botão ou tela. O `$1` protege contra SQL Injection."

## Slide 13 — Passo 2: Controller
**Título:** Passo 2 — Controller: receber e responder
**Texto do slide:**
```js
// src/controllers/notasController.js
async function remover(requisicao, resposta) {
  await Nota.remover(requisicao.params.id);
  resposta.status(204).send();
}
```

> *Fala:* "O Controller pega o id que veio na URL, pede ao Model para remover e responde 204 — 'deu certo, sem conteúdo'. Ele orquestra, não acessa o banco diretamente."

## Slide 14 — Passo 3: Rota
**Título:** Passo 3 — Rota: ligar a URL ao Controller
**Texto do slide:**
```js
// src/routes/notasRoutes.js
router.get("/notas", controller.listar);
router.post("/notas", controller.criar);
router.delete("/notas/:id", controller.remover);
```

> *Fala:* "A rota é a porta de entrada. Quando chegar um DELETE em /api/notas/5, ela chama o Controller. Vejam: GET lista, POST cria, DELETE remove."

## Slide 15 — Passo 4: View
**Título:** Passo 4 — View: o botão na tela
**Texto do slide:**
```js
// public/script.js — dentro do notas.forEach
const botao = document.createElement("button");
botao.textContent = "Excluir";
botao.onclick = async () => {
  await fetch(`/api/notas/${nota.id}`, { method: "DELETE" });
  carregarNotas();
};
item.appendChild(botao);
```

> *Fala:* "Na View só criamos o botão e mandamos o pedido. Nenhuma regra aqui. Se amanhã quiserem o botão vermelho, mexemos só aqui."

## Slide 16 — Passo 5: Testar
**Título:** Passo 5 — Testar de ponta a ponta
**Texto do slide:**
- Criar uma nota → aparece na lista
- Clicar em "Excluir" → some da lista e do banco
- **Pergunta:** e se a regra fosse "só excluir notas com mais de 1 dia"? Em qual camada?

> *Fala:* "Funcionou! E respondendo: a regra de negócio entraria no Model. A mudança fica isolada — esse é o ganho do MVC."

---

## Slide 17 — Quiz
**Título:** Hora do Quiz!
**Texto do slide:**
- Acesse: **kahoot.it**
- PIN: _(inserir no dia)_
- 5 perguntas — 20 segundos cada

> *Fala:* "Peguem o celular! Vamos ver se ficou claro." (Perguntas e respostas no item 9 do plano de aula.)

## Slide 18 — Resumo
**Título:** O que aprendemos hoje
**Texto do slide:**
- **Model** = dados e regras | **View** = tela | **Controller** = orquestra
- Receita: Model → Controller → Rota → View → Testar
- Vantagens: manutenção fácil, testes isolados, equipe trabalhando em paralelo
- **Desafio para casa:** desenvolva a função "Editar nota" seguindo a mesma receita — Model → Controller → Rota → View → Testar.

> *Fala:* "Hoje vocês desenvolveram uma funcionalidade inteira em MVC. Com essa receita vocês conseguem criar editar, buscar, qualquer coisa — sempre camada por camada. Fica o desafio: desenvolver o Editar nota seguindo a mesma receita."

## Slide 19 — Para estudar mais
**Título:** Referências
**Texto do slide:**
- GAMMA et al. *Padrões de Projeto*. Bookman, 2000.
- FOWLER, M. *Padrões de Arquitetura de Aplicações Corporativas*. Bookman, 2006.
- SOMMERVILLE, I. *Engenharia de Software*. 10. ed. Pearson, 2018.
- MDN Web Docs — MVC: developer.mozilla.org/pt-BR/docs/Glossary/MVC
- Express.js — Roteamento: expressjs.com/pt-br/guide/routing.html

> *Fala:* "Deixo essas fontes para quem quiser se aprofundar. Obrigado, turma!"
