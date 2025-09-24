Eugene Schwartz Brain - Digital Clone

LINK Para Testar: https://clone-digital-do-eugene-schwartz.vercel.app/

VIDEO Mostrando Funcionanmento: https://drive.google.com/file/d/1NsuqDPN413WMk3twaBFREaVRSOXT3M6y/view?usp=drive_link

Clone digital da mente de Eugene Schwartz para análise inteligente de leads de VSLs, utilizando embeddings do livro Breakthrough Advertising e LLMs de última geração.

🚀 Visão Geral

Este projeto tem como objetivo criar um clone digital do Eugene Schwartz, capaz de analisar e melhorar copies com base nos 5 Níveis de Consciência do Mercado descritos em seu livro clássico.
O sistema recebe uma Lead de VSL como input, consulta um banco vetorial com o livro vetorizado, processa com GPT-5 e retorna uma análise estruturada em JSON contendo:
* Nível de Consciência
* Estrutura da Lead (framework utilizado)
* Pontos de melhoria (com exemplos reescritos)
* Novos ângulos criativos
* Justificativas baseadas em Eugene

￼<img width="1384" height="702" alt="EUGENE SCHWARTZ BRAIN" src="https://github.com/user-attachments/assets/1d404267-7b89-4e83-a46e-0b0bb69e0a9f" />
<img width="744" height="700" alt="image" src="https://github.com/user-attachments/assets/9f6be1fe-66da-48fe-83be-a00236900e60" />



🧠 Planejamento e Pesquisa

Objetivo

Construir um agente robusto e confiável, que pense como Eugene Schwartz, com foco em precisão na análise de copywriting e em evitar erros de classificação de consciência.
Decisões Técnicas

* LLM escolhido: GPT-5
    * Baixa taxa de alucinação em comparação a modelos anteriores.
    * Capacidade de raciocínio mais longa (cadeia de pensamento mais estruturada).
    * Melhor suporte a contextos extensos (ideal para embutir trechos inteiros do livro).
* Vetorização
    * Modelo usado: text-embedding-3-large (3070 dimensões).
    * Banco: Supabase Postgres + pgvector.
    * Chunking configurado para 1000 tokens com overlap de 200 (otimização entre contexto e granularidade).
* Orquestração
    * n8n como workflow principal (importável via JSON).
    * Pipeline simples, mas modular: Input Lead → Embedding → Busca vetorial → Agente LLM → JSON Output.
* Frontend
    * Interface futurista em Next.js 14 + Tailwind + Three.js.
    * Permite input rápido e visualização dos resultados de análise.
