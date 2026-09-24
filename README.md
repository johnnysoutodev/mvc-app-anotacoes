# Aula-teste SENAI — Arquitetura MVC

Projeto de apoio para a aula-teste prática sobre MVC (25/09/2026).

## Estrutura

- `docs/` — plano de aula, conteúdo dos slides e resposta de e-mail
- `app-mvc/` — app de anotações estruturado em MVC (Node + Express + Postgres)
- `app-sem-mvc/` — mesma funcionalidade, tudo misturado em um único arquivo (exemplo de contraste)

## Como rodar a versão MVC

1. Subir o banco de dados (Docker já confirmado na máquina, versão 28.5.1):
   ```bash
   cd app-mvc
   docker compose up -d
   ```
2. Instalar dependências:
   ```bash
   npm install
   ```
3. Copiar as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Rodar o servidor:
   ```bash
   npm start
   ```
5. Abrir [http://localhost:3000](http://localhost:3000)

Para derrubar o banco depois: `docker compose down` (ou `docker compose down -v` para apagar os dados também).

## Como rodar a versão sem MVC (contraste)

```bash
cd app-sem-mvc
npm install
npm start
```

Abrir [http://localhost:3001](http://localhost:3001)

## Observação

A versão sem MVC usa um array em memória (sem banco de dados) — é só para
ilustrar visualmente o contraste de organização de código, não precisa
rodar em paralelo com a versão MVC durante a demonstração.
