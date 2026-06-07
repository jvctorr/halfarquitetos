# Manual rápido — Half Arquitetos

## Editar conteúdos sem programar
- **Textos**: abra `index.html` no VS Code (ou Bloco de Notas), use Ctrl+F para localizar e edite.
- **Imagens**: substitua arquivos em `assets/images/` mantendo o mesmo nome — ou troque o caminho no HTML.

## Quiz inteligente
Em `script.js`:
- `questions` controla as perguntas.
- `results` controla os 5 resultados possíveis (título + texto).
- `computeResult()` define como as respostas mapeiam para cada resultado — ajuste as regex se quiser refinar.

## Galeria de projetos
Em `script.js`, edite o array `projects`. Cada item:
- `img`: caminho da imagem.
- `cat`: `residencial | comercial | interiores | reforma | planejados`.
- `title`, `desc`: textos do card e do modal.
- `span`: largura em colunas (4, 6, 8 ou 12 — base 12).
- `h`: proporção — `h-sq`, `h-tall`, `h-wide`.

## Chat IA (H.A. Concierge)
- Webhook em `script.js`: `https://memoken.com/webhook/artificial-inteligence/completion`.
- Envia `{ chat_id, human_message }` via POST JSON.
- O retorno é lido em `data.message || data.response || data.reply || data.output || data.text`.

## WhatsApp / Instagram / E-mail
Use Localizar/Substituir global:
- `5571991276838` → novo número (sem espaços, com DDI).
- `halfarquitetos` (Instagram).
- `contato@halfarquitetos.com` (e-mail).

## Dark mode
- Cores no topo de `style.css`. O bloco `[data-theme="dark"]` controla o modo escuro.

## Hospedagem rápida
- **Netlify Drop**: arraste a pasta em https://app.netlify.com/drop — pronto.
- **GitHub Pages**: suba o repo, ative Pages no Settings.
- **Vercel**: `vercel` na pasta.
