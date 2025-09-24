# Documento de Concepção – Clone Digital de Eugene Schwartz

## 1. Visão Geral
O objetivo deste projeto é desenvolver um **Clone Digital da Mente de Eugene Schwartz**, baseado nos princípios do livro *Breakthrough Advertising*.  
Esse agente será capaz de analisar **Leads de VSLs** (Video Sales Letters), identificar o **nível de consciência**, o **framework predominante** e propor **melhorias estruturais**, além de sugerir **novos ângulos criativos** de copywriting.

A proposta vai além de um simples analisador: trata-se de um **sistema completo** que une front-end futurista, workflow automatizado no **n8n**, banco de dados para histórico, e o livro vetorizado para consultas contextuais.

---

## 2. Objetivos
- Construir um **agente de análise de copywriting** com base em Eugene Schwartz.  
- Prover **insights estruturados em JSON** para fácil integração com qualquer aplicação.  
- Garantir que os resultados sejam **consistentes, explicáveis e testáveis**.  
- Disponibilizar uma **interface web interativa** para input de Leads.  
- Criar um **pipeline escalável** via n8n + banco de dados + vetorização.  

---

## 3. Estrutura da Solução

### 3.1 Fluxo Macro
1. **Input do usuário**: Lead de VSL enviada via interface (Next.js) ou API.  
2. **Pré-processamento no n8n**:  
   - Normalização do texto.  
   - Enriquecimento com fontes citadas.  
3. **Consulta ao livro vetorizado**:  
   - Busca semântica nos trechos mais relevantes do *Breakthrough Advertising*.  
   - Contexto injetado no prompt.  
4. **Agente Clone Eugene Schwartz**:  
   - Análise aplicada com instruções específicas.  
   - Geração de saída em JSON validado.  
5. **Visualização no Front-end**:  
   - Interface futurista exibe os insights com animações e destaque para pontos de melhoria.

---

### 3.2 Tecnologias
- **Front-end**: Next.js 14 + TailwindCSS + Three.js (HUD futurista).  
- **Orquestração**: n8n (workflow de análise).  
- **IA**: GPT-5 (taxa menor de alucinação, capacidade de raciocínio em cadeia, contexto longo).  
- **Banco de Dados**: PostgreSQL (estruturação dos resultados e histórico).  
- **Vetorização**: Livro *Breakthrough Advertising* processado em embeddings.  
- **Infra**: Docker Swarm + Traefik para deploy.  

---

## 4. Justificativa do GPT-5
A escolha do **GPT-5** se baseia em três fatores principais:  
1. **Baixa taxa de alucinação** → reduz risco de inventar conceitos que não existem em Schwartz.  
2. **Capacidade de raciocínio em cadeia (Chain of Thought)** → essencial para avaliar frameworks de copywriting e propor melhorias estruturadas.  
3. **Contexto longo** → permite carregar trechos do livro vetorizado junto com a Lead, sem perder consistência.  

---

## 5. Estrutura do Banco de Dados (Visão Conceitual)
- **Tabela `leads`**: Lead original + metadados (fonte, data, autor).  
- **Tabela `analises`**: JSON estruturado com nível de consciência, framework e melhorias.  
- **Tabela `contexto`**: Trechos relevantes do livro citados em cada análise.  
- **Tabela `usuarios`**: Histórico de quem enviou a análise (quando aplicável).  

---

## 6. Plano de Validação
- Testar o clone com **Leads reais** (VSLs enviadas).  
- Comparar com interpretações humanas especializadas em copywriting.  
- Ajustar **prompt e embeddings** até alcançar >90% de concordância.  
- Definir métricas:  
  - Coerência no nível de consciência.  
  - Clareza dos pontos de melhoria.  
  - Criatividade e aplicabilidade dos novos ângulos.  

---

## 7. Próximos Passos
1. Finalizar workflow no n8n.  
2. Popular banco de dados inicial.  
3. Integrar front-end com o agente.  
4. Rodar os primeiros testes de validação.  
5. Documentar tudo no repositório GitHub.  
