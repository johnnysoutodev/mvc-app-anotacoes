# Conteúdo dos Slides — Aula-teste MVC (com fala sugerida)

Exemplo usado: app de anotações (CRUD simples), ilustrativo, independente da stack final.

---

## Slide 1 — Abertura
**Conteúdo:** Título "Arquitetura MVC no Desenvolvimento de Aplicações Web" + nome do instrutor

> *Fala:* "Antes de mostrar código, quero fazer uma pergunta: quando vocês pensam em criar um sistema, como organizam os arquivos? Tudo num arquivo só, ou já separam por responsabilidade? É exatamente disso que vamos falar hoje."

## Slide 2 — O problema que o MVC resolve
**Conteúdo:**
- Sistema sem organização = lógica de banco, regra de negócio e tela misturadas no mesmo arquivo
- Consequência: difícil de testar, difícil de dar manutenção, difícil de trabalhar em equipe

> *Fala:* "Imaginem um arquivo onde, na mesma função, vocês têm a consulta no banco de dados, a validação da regra de negócio e o HTML sendo montado. Funciona? Funciona. Mas se amanhã vocês precisarem mudar só o visual, vão ter que mexer no mesmo lugar onde está a lógica do banco. Isso é risco."

## Slide 3 — O que é MVC
**Conteúdo:**
- MVC = Model, View, Controller
- Padrão arquitetural que separa uma aplicação em três responsabilidades distintas
- Objetivo: cada camada muda por um motivo diferente

> *Fala:* "MVC é a sigla de Model, View e Controller. É um padrão de arquitetura, ou seja, uma forma organizada de dividir responsabilidades dentro do código. A regra de ouro é: cada camada tem um único motivo para mudar."

## Slide 4 — Model
**Conteúdo:**
- Representa os dados e as regras de negócio
- Comunica-se com o banco de dados
- Não sabe nada sobre a tela

> *Fala:* "O Model é o guardião dos dados. Ele sabe como uma 'nota' é estruturada, sabe validar se ela pode ser salva, e conversa com o banco de dados. O que ele não sabe é como isso vai aparecer na tela — isso não é problema dele."

## Slide 5 — View
**Conteúdo:**
- Camada responsável pela apresentação
- Exibe os dados ao usuário
- Não contém lógica de negócio

> *Fala:* "A View é tudo que o usuário enxerga. É a tela, o HTML, o layout. Ela recebe dados prontos e só se preocupa em mostrar bem — ela não decide regra nenhuma."

## Slide 6 — Controller
**Conteúdo:**
- Recebe a ação do usuário (requisição)
- Decide o que fazer: chama o Model, processa, decide qual View retornar
- É o "orquestrador" entre Model e View

> *Fala:* "O Controller é o intermediário. Quando o usuário clica em 'salvar', é o Controller que recebe essa ação, pede pro Model salvar o dado, e depois decide o que mostrar na View como resposta."

## Slide 7 — Fluxo de uma requisição (diagrama)
**Conteúdo:**
```
Usuário → View (ação) → Controller → Model → Banco de Dados
                ↑                        ↓
                └──────── resposta ───────┘
```

> *Fala:* "Juntando tudo: o usuário interage com a View, a View dispara uma ação para o Controller, o Controller fala com o Model, o Model busca ou salva no banco, e o caminho de volta devolve a resposta até a tela atualizar. Vamos ver isso rodando agora."

## Slide 8 — Vantagens do MVC
**Conteúdo:**
- Manutenção mais fácil (mudanças isoladas por camada)
- Facilita testes (cada camada testável separadamente)
- Facilita trabalho em equipe (front e back podem evoluir em paralelo)

> *Fala:* "Por isso o MVC importa na prática: se eu quiser mudar o visual, mexo só na View. Se eu quiser mudar uma regra, mexo só no Model. E times diferentes podem trabalhar em paralelo sem pisar no trabalho um do outro."

---

## Exemplo Prático — App de Anotações

> *Fala de contexto:* "Para tornar isso concreto, vou usar um exemplo simples: uma funcionalidade de um app de anotações, onde o usuário cria uma nota. Vamos seguir o caminho completo, camada por camada."

## Slide 9 — Estrutura do projeto
**Conteúdo:**
```
/model      → Nota.js
/view       → notas.html
/controller → NotasController.js
```

> *Fala:* "Reparem que já na estrutura de pastas o MVC aparece: cada responsabilidade tem seu próprio espaço."

## Slide 10 — Model (Nota.js)
**Conteúdo (pseudocódigo):**
```js
// Model: define os dados e a regra de negócio
class Nota {
  constructor(titulo, conteudo) {
    if (!titulo) throw new Error("Título é obrigatório");
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.criadoEm = new Date();
  }

  salvar() {
    // grava a nota no banco de dados
  }
}
```

> *Fala:* "Aqui está o Model. Reparem: ele valida se o título foi preenchido — isso é regra de negócio — e sabe como se salvar. Ele não sabe nada sobre botão, tela ou clique."

## Slide 11 — Controller (NotasController.js)
**Conteúdo:**
```js
// Controller: recebe a ação do usuário e orquestra
function criarNota(requisicao, resposta) {
  const { titulo, conteudo } = requisicao.body;

  const nota = new Nota(titulo, conteudo);
  nota.salvar();

  resposta.renderizar("notas", { mensagem: "Nota criada!" });
}
```

> *Fala:* "O Controller recebe o que veio do formulário, pede pro Model criar e salvar a nota, e decide qual tela mostrar depois — nesse caso, a lista de notas atualizada com uma mensagem de sucesso."

## Slide 12 — View (notas.html)
**Conteúdo:**
```html
<!-- View: apenas exibe os dados recebidos -->
<h2>Minhas Notas</h2>
<p>{{ mensagem }}</p>
<ul>
  <li>{{ titulo }} - {{ conteudo }}</li>
</ul>
```

> *Fala:* "E a View só recebe os dados prontos e exibe. Não tem validação, não tem lógica — só apresentação."

## Slide 13 — Fluxo completo aplicado ao exemplo
**Conteúdo:**
```
Usuário preenche formulário
  → Controller.criarNota()
    → Model (Nota) valida e salva
      → Banco de Dados
    ← Controller decide a resposta
  ← View exibe "Nota criada!"
```

> *Fala:* "Esse é o ciclo completo: da ação do usuário até a tela atualizada, passando pelas três camadas, cada uma fazendo só a sua parte. É isso que torna esse código organizado, testável e fácil de evoluir."
