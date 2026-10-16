# SegEnergy Salvador | Landing page

Landing page da unidade de Salvador da SegEnergy Energia Solar. HTML, CSS e JS puro, sem build.

## Estrutura
- `index.html`, `styles.css`, `script.js`: o site
- `assets/`: vídeo do hero, posters (JPG, WebP, AVIF), imagem Open Graph, logo em SVG (clara e escura) e favicon
- `vercel.json`: cache dos arquivos estáticos na Vercel
- `PROMPT-CLAUDE-CODE.md`, `INFORMACOES.md`, `referencias/`, `logo/`, `0-video/`: material de briefing

## Publicar
- **Vercel:** importar o repositório, sem framework e sem comando de build.
- **GitHub Pages:** Settings > Pages > branch principal, pasta raiz.

## Ajustes rápidos
- WhatsApp: constante `WHATSAPP` no topo do `script.js`.
- Meta Pixel: colar no `<head>` (marcador `COLAR AQUI O PIXEL DA META`) e descomentar `trackContact` e `trackLead` no `script.js`.
- Domínio: trocar `segenergysalvador.com.br` no `<head>` e no JSON-LD.

## Pendências com o cliente
Procure por `CONFIRMAR` e `TROCAR` no `index.html`.
