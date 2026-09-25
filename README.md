# Aula-teste SENAI — Arquitetura MVC

Projeto de apoio para a aula-teste prática sobre MVC (25/09/2026).

## Estrutura

- `docs/` — plano de aula (com quiz e referências), conteúdo dos slides, e-mails (confirmação e envio dos documentos)
- `app-mvc/` — app de anotações estruturado em MVC (Node + Express + Postgres)
- `app-sem-mvc/` — mesmas funcionalidades e mesmo banco, tudo misturado em um único arquivo (exemplo de contraste)

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

Usa o mesmo banco de dados da versão MVC (suba o Docker antes):

```bash
cd app-sem-mvc
npm install
cp .env.example .env
npm start
```

Abrir [http://localhost:3001](http://localhost:3001)

## Observação

As duas versões têm as mesmas funcionalidades (criar, listar, favoritar e
excluir notas) e usam a mesma tabela no PostgreSQL. A diferença é só a
organização do código: na versão sem MVC, SQL, regras de negócio e HTML
ficam juntos em um único arquivo (`server.js`). As duas podem rodar ao
mesmo tempo (portas 3000 e 3001) e mostram as mesmas notas.
