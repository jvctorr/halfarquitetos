# Half Arquitetos — Site Institucional

Site estático (HTML + CSS + JavaScript) para o escritório Half Arquitetos (Salvador — BA). Pronto para baixar, editar no VS Code e hospedar onde quiser (GitHub Pages, Vercel, Netlify, Hostinger etc.).

## Como abrir localmente
1. Baixe e descompacte a pasta `half-arquitetos/`.
2. Abra `index.html` no navegador (duplo clique).
3. Para uma experiência completa (vídeo, fetch do chat), recomendamos um servidor local:
   - VS Code: extensão **Live Server** → botão "Go Live".
   - Ou no terminal: `npx serve .` / `python3 -m http.server`.

## Estrutura
```
half-arquitetos/
├── index.html
├── style.css
├── script.js
├── README.md
├── docs/instructions.md
└── assets/
    ├── images/      (logo, fundadores, projetos)
    └── videos/      (apresentacao.mp4)
```

## Como editar
| O quê | Onde |
|---|---|
| Textos | `index.html` — cada seção é comentada (`<!-- HERO -->`, `<!-- SOBRE -->` …) |
| Cores / fontes / tema | `style.css` — bloco `:root` (claro) e `[data-theme="dark"]` (escuro) |
| Projetos da galeria | `script.js` — array `projects` (img, cat, title, desc, span, h) |
| Perguntas do quiz | `script.js` — array `questions` e objeto `results` |
| WhatsApp | Buscar `wa.me/5571991276838` (HTML + JS) e substituir |
| Instagram | Buscar `instagram.com/halfarquitetos` |
| E-mail | Buscar `contato@halfarquitetos.com` |
| Endereço | `index.html` seção `#local` e `footer` |
| Webhook do chat | `script.js` → linha `fetch('https://memoken.com/webhook/...')` |

### Trocar imagens
Coloque novas imagens em `assets/images/` e atualize os caminhos no HTML/JS. Preferência por `.webp` ou `.jpg` otimizado.

### Adicionar um projeto
Edite o array `projects` em `script.js`:
```js
{ img:'assets/images/novo.webp', cat:'residencial', title:'…', desc:'…', span:6, h:'h-sq' }
```
Categorias usadas nos filtros: `residencial`, `comercial`, `interiores`, `reforma`, `planejados`.

## Modo claro / escuro
- Botão no header (ícone sol/lua).
- Preferência salva em `localStorage` (`ha-theme`).

## Chat H.A. Concierge
- Botão flutuante no canto inferior direito.
- `chat_id` único por usuário, salvo em `localStorage` (`ha-chat-id`).
- POST JSON `{ chat_id, human_message }` para o webhook configurado.
- Em caso de falha, mostra fallback e botão WhatsApp.

## Hospedagem
**GitHub Pages**
1. Crie um repositório, suba os arquivos.
2. Settings → Pages → Branch `main` / pasta `/root`.

**Vercel** — `vercel deploy` na pasta, ou importe o repo no painel.

**Netlify** — arraste a pasta em https://app.netlify.com/drop, ou conecte o repo.

## SEO
- Título, meta description, Open Graph e Twitter Card já configurados.
- Imagens com `alt`, `loading="lazy"` onde aplicável.
- Estrutura semântica (header / nav / section / footer / article).

---
Half Arquitetos · Arquitetura e Interiores · Salvador — BA · Fundada em 2017.
