# Landing page premium: SegEnergy Salvador (energia solar)

Crie do zero uma landing page premium, pronta para produção, para a unidade de Salvador da SegEnergy Energia Solar. Padrão de site de agência: precisa impressionar na primeira tela e converter. Não pergunte nada: onde faltar dado, use o marcador indicado e siga.

## 0. ANTES DE CODAR
1. Leia `INFORMACOES.md` (dados, avaliações reais, paleta, pendências) e `referencias/LEIA.md`, e olhe com atenção as 3 referências em `referencias/` (ref1 para o hero, ref2 para a estrutura das seções, ref3 para os cards flutuantes do simulador).
2. Olhe `logo/logo-segenergy-referencia.png` e todas as imagens das pastas.
3. Use as skills de `.claude/skills/`: landing-page-guide-v2 para a estrutura e conversão; design-taste-frontend e frontend-design para a direção visual; copywriting para os textos; emil-design-eng para animações; impeccable e web-design-guidelines para revisar tudo no final.

## 1. OBJETIVO
Transformar quem pesquisa energia solar em Salvador em orçamento qualificado no WhatsApp. O simulador de economia filtra o curioso que só pergunta preço de placa e entrega ao Maurício um contato que já sabe quanto paga de luz.
WhatsApp numa constante única no topo do `script.js`: `const WHATSAPP = "5571991746677";`

## 2. IDENTIDADE
- Paleta: preto #1E1E1C, verde escuro #106D41, verde #30B671 (destaque e botões), fundo claro #F5F7F4, branco. Verde do WhatsApp #25D366 só no botão flutuante.
- Tipografia (Google Fonts): títulos em "Inter Tight" 700/800 com letter-spacing negativo; texto em "Inter".
- Logo: recrie em SVG vetorial a partir de `logo/logo-segenergy-referencia.png` (triângulo em três partes: preto, verde escuro e verde claro; "SegEnergy" em preto; "ENERGIA SOLAR" em verde). A captura tem o cursor do mouse por cima: ignore o cursor. Versão clara e escura. Marque `<!-- CONFIRMAR LOGO OFICIAL -->`.
- O triângulo da logo vira elemento gráfico recorrente: divisores, marcadores de lista e detalhe de fundo em baixa opacidade.
- Ícones SVG próprios de linha fina. Nada de foto de banco de imagem. Onde precisar de foto, use ilustração SVG (casa com placas, sol, raio) e `<!-- TROCAR POR FOTO REAL DE INSTALAÇÃO -->`.

## 3. ARQUIVOS DE MÍDIA
- Vídeo do hero (pronto, sem áudio): `0-video/hero.mp4` (1280x720, drone sobre telhado com placas solares, palmeiras e o mar ao entardecer) e `0-video/hero-mobile.mp4` (720x1280, recorte vertical), com `hero-poster.jpg` e `hero-mobile-poster.jpg`. Copie para `assets/` sem recomprimir. Duas `<source>` por media query, autoplay, muted, loop, playsinline, poster.
- Os frames do vídeo (poster) também podem ser usados como imagem de fundo em outras seções, com tratamento escuro ou desfoque.
- Qualidade máxima: nunca reduzir resolução; WebP/AVIF com fallback e srcset 1x/2x; nada esticado.

## 4. SEÇÕES, NA ORDEM
1. **Topo** com logo, links (Simulador, Como funciona, Avaliações, Dúvidas) e botão "Simular economia". Vira vidro (backdrop-filter) ao rolar.
2. **Hero** em tela cheia com o vídeo, no estilo da `ref1`: a palavra gigante "Solar" em branco, peso fino, atravessando o vídeo (tamanho com clamp até ~22vw). Menu em pílula de vidro. Embaixo à esquerda, título em duas linhas: "Sua conta de luz pode ser quase zero." e subtítulo: "Energia solar em Salvador e Região Metropolitana, do projeto à homologação." Botões: pílula branca "Simular minha economia" + botão redondo de seta, e link "Falar com um especialista" (WhatsApp). Embaixo à direita, dois cards de vidro escuro com número grande e barra: "5,0 · nota no Google (25 avaliações)" e "até 95% · de economia na conta de luz". No celular, a palavra gigante fica no topo e os cards descem para baixo dos botões. Cantos inferiores do hero recortados em curva, como na `ref3`.
3. **Faixa de confiança**: "Projeto sob medida · Instalação técnica · Homologação na concessionária · Atendimento em Salvador e RMS" (`<!-- CONFIRMAR -->`).
4. **Simulador de economia** (peça principal, visual de app):
   - Tipo de imóvel: Casa · Apartamento · Comércio · Indústria · Condomínio · Rural
   - "Quanto você paga de luz por mês?": slider de R$ 100 a R$ 5.000 com o valor grande em tempo real
   - Resultado animado: economia estimada por mês (até 95% da conta), por ano e em 25 anos, com a nota "estimativa; o valor exato sai no projeto". Não prometer valores fixos.
   - Visual no estilo da `ref3`: ao lado do formulário (no computador), uma imagem do poster do vídeo com cards flutuantes que atualizam junto com o slider ("Economia por mês", "Economia em 25 anos" e um mini gráfico de barras).
   - Forma de pagamento: À vista · Financiado · Ainda não sei
   - Prazo: Este mês · Até 3 meses · Só pesquisando
   - Nome e bairro
   - Botão verde "Receber meu orçamento no WhatsApp" com a mensagem:
     ```
     Olá! Vim pelo site da SegEnergy Salvador.
     Nome: [nome] | Bairro: [bairro]
     Imóvel: [tipo]
     Conta de luz: R$ [valor]/mês
     Economia estimada: R$ [valor]/mês
     Pagamento: [forma] | Prazo: [prazo]
     Origem: [utm_source ou utm_campaign, se houver]
     ```
5. **Por que energia solar em Salvador**: 3 blocos (economia na conta, valorização do imóvel, ar-condicionado sem medo da conta). Texto curto, sem números inventados.
6. **Como funciona** em 4 passos com linha do tempo animada: Simulação · Visita técnica e projeto · Instalação · Homologação e economia.
7. **Avaliações reais do Google**: as 6 de `INFORMACOES.md`, com nome, 5 estrelas e o texto como está lá. Topo da seção: "5,0 no Google com 25 avaliações". Carrossel no celular, grid no computador.
8. **Dúvidas frequentes** (accordion): Funciona em dia nublado? Quanto tempo duram as placas? Posso financiar? Quanto tempo leva a instalação? Precisa de manutenção? Respostas corretas e genéricas; o que depender da empresa marque `<!-- CONFIRMAR -->`.
9. **Chamada final**: fundo verde escuro, "Comece a economizar este mês." Botão para o simulador.
10. **Rodapé**: logo, endereço (Av. Dom João VI, 74, Brotas, Salvador, BA), WhatsApp (71) 99174-6677, Instagram @segenergy.salvador, link "Como chegar" no Google Maps, ano automático.
11. **Botão flutuante de WhatsApp** depois do hero ("Olá! Vim pelo site da SegEnergy Salvador e quero um orçamento.").

## 5. ANIMAÇÕES
Entradas suaves com fade e leve subida; contadores animados no simulador; linha do tempo que se desenha ao rolar; brilho de sol passando pelos cards. Respeitar `prefers-reduced-motion`.

## 6. TÉCNICO
- HTML, CSS e JS puro, sem build: `index.html`, `styles.css`, `script.js`, `assets/`. Caminhos relativos. Funciona na Vercel e no GitHub Pages.
- Mobile first; testar em 360, 390, 768, 1440 e 1920px; sem rolagem horizontal.
- Meta tags, Open Graph 1200x630, favicon com o triângulo, JSON-LD de LocalBusiness com o endereço de Brotas.
- `<!-- COLAR AQUI O PIXEL DA META -->` no head e funções comentadas para "Contact" e "Lead".
- Acessibilidade AA e Lighthouse 90+.
- `.gitignore` e `README.md` curto.

## 7. SEM CARA DE IA
Sem travessão (traço longo) e sem emoji no layout. Sem clichês ("soluções inovadoras", "excelência", "sua melhor escolha"). Nunca inventar números, garantias, prazos ou depoimentos: use só as avaliações reais do arquivo.

## 8. ANTES DE ENTREGAR
1. Screenshots da página inteira em 390px e 1440px; revisar e corrigir até ficar impecável.
2. Testar o simulador do início ao fim e conferir a mensagem do WhatsApp.
3. Procurar travessão e emojis no código e remover.
4. Listar os marcadores TROCAR e CONFIRMAR.
5. Commit inicial: "Site SegEnergy Salvador".
