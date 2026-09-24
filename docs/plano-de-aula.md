# Plano de Aula — Arquitetura MVC no Desenvolvimento de Aplicações Web

## 1. Identificação
- **Tema:** Como desenvolver aplicações web na arquitetura MVC
- **Duração:** 30 minutos
- **Modalidade:** Aula-teste prática (remota, via Teams)
- **Público-alvo (simulado):** Alunos do curso de Desenvolvimento de Sistemas
- **Processo:** SENAI-SP — Instrutor de Formação Profissional III - TI (104-2026)
- **Data da aula-teste:** 25/09/2026, 16h30

## 2. Objetivo Geral
Apresentar o padrão arquitetural MVC (Model-View-Controller) e demonstrar sua aplicação prática no desenvolvimento de uma aplicação web.

## 3. Objetivos Específicos

**Objetivo 1 — Compreender o papel de cada camada (Model, View, Controller)**
- Model → "Onde ficam meus dados e as regras do meu negócio?"
- View → "O que o usuário vê na tela?"
- Controller → "Quem decide o que fazer quando o usuário clica em algo?"

**Objetivo 2 — Identificar as vantagens do MVC**
- Contraste com um sistema sem separação de responsabilidades ("tudo misturado num arquivo só")
- Consequências: difícil de testar, difícil de dar manutenção, difícil de trabalhar em equipe

**Objetivo 3 — Visualizar a arquitetura em funcionamento através de exemplo prático**
- Cumprido pela demonstração prática (item 5) — reforçar no fechamento que o aluno viu o conceito "sair do papel"

## 4. Conteúdo Programático
- Conceito de arquitetura de software e por que ela importa
- As três camadas do MVC e o fluxo de dados entre elas
- Exemplo prático: fluxo completo de uma requisição (front-end → controller → model → banco de dados → view)

Ver detalhamento completo (slides + fala) em `conteudo-slides-mvc.md`.

## 5. Metodologia / Estratégia Didática (distribuição dos 30 min)

| Etapa | Tempo | Atividade |
|---|---|---|
| Abertura e contextualização | 3 min | Pergunta disparadora sobre organização de código |
| Explicação teórica | 7 min | Diagrama das camadas Model, View e Controller e o fluxo de uma requisição |
| Demonstração prática | 15 min | Slides com exemplo de app de anotações estruturado em MVC, mostrando o código de cada camada e o fluxo de ponta a ponta |
| Fechamento e avaliação | 5 min | Pergunta de verificação de aprendizagem + síntese dos pontos-chave |

Detalhamento completo (fala e conteúdo de cada slide) em `conteudo-slides-mvc.md`.

## 6. Recursos Didáticos
- Slides/diagrama da arquitetura MVC
- Ambiente de desenvolvimento com aplicação de exemplo já configurada
- Compartilhamento de tela via Teams

## 7. Elementos de Avaliação (verificação de aprendizagem)
- Pergunta oral direcionada durante a demonstração (ex: "Se eu mudar essa regra de negócio, em qual camada eu mexo?") para checar compreensão em tempo real
- Pergunta de fechamento (ex: "Qual camada você tocaria para mudar como os dados são exibidos, sem mudar a lógica de negócio?") como checagem final dos objetivos específicos 1 e 2
- Observação da participação/interação dos alunos como indicador qualitativo de engajamento

## 8. Referências
- Documentação oficial dos frameworks utilizados na demonstração
- Bibliografia de padrões de arquitetura de software (ex: GoF, Martin Fowler — *Patterns of Enterprise Application Architecture*)
