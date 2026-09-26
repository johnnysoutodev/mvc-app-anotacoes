# Perguntas que a banca pode fazer — com respostas sugeridas

Preparação para a aula-teste "Como desenvolver aplicações web na arquitetura MVC" (SENAI-SP, 25/09/2026).
As respostas são roteiros curtos: fale com suas palavras e, sempre que possível, mostre no código do projeto.

---

## 1. Técnicas — sobre MVC

**1. "Neste app, a View é um HTML com JavaScript que chama uma API. Isso ainda é MVC?"**
Sim, é uma variação comum hoje: o Controller devolve JSON e a View roda no navegador. No MVC "clássico", o servidor renderiza a tela com templates (EJS, Thymeleaf, Blade). A separação de responsabilidades é a mesma.

**2. "A validação fica no Model ou no Controller?"**
A regra de negócio ("título obrigatório", "id precisa ser número") fica no Model, para valer em qualquer entrada. O Controller só traduz o erro numa resposta HTTP (400). A validação no front (`required`) é só conforto para o usuário — nunca substitui a do servidor.

**3. "E quando as regras crescem muito?"**
Cria-se uma camada de serviço (Service) entre o Controller e o Model. A ideia de "Controller magro" continua valendo: ele só orquestra.

**4. "Qual a diferença entre MVC, MVP e MVVM?"**
Os três separam a tela da lógica. O que muda é o intermediário: o MVP usa um Presenter que controla a View; o MVVM usa um ViewModel com *data binding* (Angular, Vue, WPF).

**5. "O MVC é o contrário de monólito?"**
Não. O MVC organiza o monólito por dentro — o `app-mvc` também é um monólito (um único servidor Express). Microsserviços é outra discussão: como dividir o sistema em serviços separados.

**6. "Como você testaria isso?"**
O Model, com testes unitários num banco de teste. O Controller e as rotas, com testes de integração (Jest + Supertest). A separação em camadas facilita justamente isso: cada parte é testada isoladamente.

**7. "Por que o `$1` no SQL?"**
É uma consulta parametrizada: o valor vai separado do comando, o que protege contra SQL Injection.

**8. "Por que 204, 400 e 500?"**
204 = sucesso sem conteúdo (excluir). 400 = erro do cliente (dado inválido). 500 = erro do servidor (por exemplo, banco fora do ar).

**9. "Por que as rotas ficam separadas do Controller?"**
A rota só mapeia URL + método HTTP para uma função. Assim a mesma função pode ser reaproveitada, e o mapa da API fica legível em um lugar só (`notasRoutes.js`).

**10. "Onde está a regra 'favoritas aparecem primeiro'?"**
No Model: `ORDER BY favorita DESC, criado_em DESC` em `Nota.js`, marcada com o comentário "Regra de negócio". A View só exibe na ordem que recebe. (É também a pergunta de verificação do slide 17.)

**11. "Quem é a Gang of Four (GoF) e o que ela tem a ver com o MVC?"**
São os quatro autores de *Design Patterns: Elements of Reusable Object-Oriented Software* (1994) — no Brasil, *Padrões de Projeto* (Bookman, 2000):
- **Erich Gamma** — suíço; depois ajudou a criar o JUnit e liderou o desenvolvimento do Eclipse e do VS Code na Microsoft.
- **Richard Helm** — australiano.
- **Ralph Johnson** — professor da Universidade de Illinois.
- **John Vlissides** — pesquisador da IBM (faleceu em 2005).

O livro cataloga **23 padrões de projeto**, divididos em criacionais, estruturais e comportamentais. Logo no capítulo 1, o GoF explica o MVC como uma combinação de três padrões:
- **Observer** — a View é avisada quando o Model muda.
- **Composite** — Views montadas dentro de Views.
- **Strategy** — o Controller define como a View responde ao usuário.

---

## 2. Didáticas — no SENAI costumam pesar muito

**12. "Como você avaliaria esses alunos?"**
Pelos critérios críticos e desejáveis do plano (item 8), pelo quiz e pela situação de aprendizagem. Citar a **Metodologia SENAI de Educação Profissional (MSEP)**: situação de aprendizagem, capacidades técnicas e socioemocionais, critérios de avaliação.

**13. "E se um aluno não acompanhar?"**
Retomar pela analogia do restaurante (cozinha = Model, prato = View, garçom = Controller), formar duplas com um colega mais avançado e usar a receita de 5 passos como roteiro.

**14. "E o aluno que termina antes?"**
Desafio "Editar nota" (slide 19), seguindo a mesma receita: Model → Controller → Rota → View → Testar.

**15. "Como seria essa aula presencial, no laboratório?"**
Os alunos codam junto, em duplas, com o projeto já clonado. O instrutor faz um passo e a turma replica; o instrutor circula tirando dúvidas.

**16. "Por que Node e Express?"**
JavaScript é a linguagem que o aluno já usa no front — menos barreira de entrada. O conceito é o mesmo em Java/Spring, C#/ASP.NET ou PHP/Laravel.

**17. "E se o sistema der erro ao vivo?"**
O erro vira oportunidade de ensinar a ler a mensagem de erro. E existe a branch `main` com a versão pronta (`git stash` + `git checkout main`).

---

## 3. Perfil e vaga

**18. "Por que o SENAI, e por que dar aula?"**
(Resposta pessoal: experiência de mercado + vontade de formar profissionais; o SENAI une teoria e prática, como nesta aula.)

**19. "Você tem disponibilidade de segunda a sexta ou de terça a sábado, das 8h às 17h, na Escola SENAI 'Nadir Dias de Figueiredo', em Osasco?"**
Está no e-mail da vaga — tenha a resposta pronta.

**20. "Como você se mantém atualizado?"**
(Resposta pessoal: documentação oficial, cursos, projetos próprios no GitHub, comunidade.)
