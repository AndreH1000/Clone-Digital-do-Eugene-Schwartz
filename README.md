# Eugene Schwartz Brain - Digital Clone

Uma interface web futurista inspirada no Iron Man HUD para análise inteligente de leads, criada como um clone digital da mente de Eugene Schwartz.

## 🚀 Características

- **Design Futurista**: Interface inspirada no Tony Stark HUD com elementos neon e animações suaves
- **Mente 3D Interativa**: Cérebro 3D giratório com efeitos visuais usando Three.js
- **Análise de Leads**: Sistema de análise estruturada de textos de marketing
- **Efeitos Visuais**: Partículas animadas, conexões neurais e brilhos neon
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Stack Tecnológica

- **Next.js 14** (App Router)
- **React 18** com TypeScript
- **TailwindCSS** para estilização
- **Framer Motion** para animações
- **Three.js** e **React Three Fiber** para gráficos 3D
- **Lucide React** para ícones
- **React Syntax Highlighter** para formatação de código

## 🎨 Design System

### Cores Neon
- **Azul**: `#00D4FF` (Neon Blue)
- **Ciano**: `#00FFFF` (Neon Cyan) 
- **Roxo**: `#8B5CF6` (Neon Purple)
- **Rosa**: `#EC4899` (Neon Pink)

### Tipografia
- **Orbitron**: Para títulos e elementos tecnológicos
- **Inter**: Para texto corrido e interface

### Efeitos Visuais
- Partículas flutuantes no background
- Conexões neurais animadas
- Brilhos neon (glow effects)
- Animações de entrada suaves
- Mente 3D com rotação e pulsação

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd eugene-schwartz-brain
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:3000` no seu navegador

## 🎯 Funcionalidades

### Interface Principal
- Mente 3D central giratória com efeitos visuais
- Campo de input para colar leads
- Botão de análise com animações
- Status do sistema neural em tempo real

### Análise de Leads
- **Nível de Consciência**: Avaliação da qualidade da lead
- **Estrutura da Lead**: Análise da organização do texto
- **Pontos de Melhoria**: Sugestões específicas
- **Novos Ângulos**: Perspectivas alternativas

### Efeitos Visuais
- Partículas animadas conectadas por linhas
- Mente 3D com esfera central, conexões neurais e orbes pulsantes
- Animações de entrada para cards de resultado
- Efeitos de hover e interação

## 🎮 Como Usar

1. **Cole sua Lead**: Digite ou cole o texto da sua lead no campo de texto
2. **Analise**: Clique em "Analisar com Eugene Brain"
3. **Aguarde**: O sistema processa a análise (simulação de 3 segundos)
4. **Visualize**: Os resultados aparecem em cards animados
5. **Interaja**: Explore cada seção da análise

## 🔧 Estrutura do Projeto

```
├── app/
│   ├── globals.css          # Estilos globais e variáveis CSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── ui/                  # Componentes base (shadcn/ui)
│   ├── Brain3D.tsx          # Componente da mente 3D
│   ├── ParticleBackground.tsx # Efeitos de partículas
│   ├── AnalysisResult.tsx   # Modal de resultados
│   └── EugeneBrainInterface.tsx # Interface principal
├── lib/
│   └── utils.ts             # Utilitários
└── package.json
```

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `app/globals.css` para alterar as cores neon:

```css
.neon-blue { color: #00D4FF; }
.neon-cyan { color: #00FFFF; }
.neon-purple { color: #8B5CF6; }
.neon-pink { color: #EC4899; }
```

### Animações
Ajuste as animações no `tailwind.config.js`:

```javascript
keyframes: {
  "glow": {
    "0%, 100%": { boxShadow: "0 0 20px #00D4FF" },
    "50%": { boxShadow: "0 0 10px #00D4FF" }
  }
}
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
npm run export
```

## 📱 Responsividade

A interface é totalmente responsiva e se adapta a:
- **Desktop**: Layout em duas colunas com mente 3D à esquerda
- **Tablet**: Layout empilhado com mente 3D no topo
- **Mobile**: Layout otimizado para telas pequenas

## 🔮 Futuras Melhorias

- [ ] Integração com API real de análise de leads
- [ ] Mais tipos de análise (copywriting, email marketing, etc.)
- [ ] Sistema de histórico de análises
- [ ] Exportação de resultados em PDF
- [ ] Temas personalizáveis
- [ ] Modo escuro/claro
- [ ] Animações mais complexas na mente 3D

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para revolucionar a análise de marketing digital**
