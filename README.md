# MeuHotelOnline.com.br 🏨✨

> **Sites de Alta Conversão para Hotéis e Pousadas que Lotam Quartos Sem Depender do Booking.**

- 🌐 **URL de Produção Ativa:** [https://hoteis.criacaodesitesbr.com](https://hoteis.criacaodesitesbr.com)
- ☁️ **Cloudflare Pages:** [https://meuhotelonline.pages.dev](https://meuhotelonline.pages.dev)
- 🐙 **Repositório GitHub:** [https://github.com/cspgabriel/meuhotelonline](https://github.com/cspgabriel/meuhotelonline)

---

## 🎯 Síntese Estratégica das 3 Referências

Criado a partir da fusão estratégica das três maiores referências do mercado:
1. **Web Design Brasil** (`webdesignbrasil.org` — *"a mais legal"*): Estética Emerald Luxury (`#0c1a12`, `#142a1d`, `#22c55e`, `#facc15`), copy de alto impacto contra comissões das OTAs, marquee contínuo de prova social e credenciais em glassmorphism.
2. **HotelariaWeb** (`hotelariaweb.com`): Tecnologia **WhatsApp Capture** (pré-qualificação de hóspedes com datas e acomodações antes de abrir o WhatsApp) e simplificação da operação hoteleira.
3. **Cloudbeds** (`cloudbeds.com`): *“Beleza recebe elogios. Inteligência gera reservas.”* Menos código e complexidade, mais hospitalidade e conversão.

---

## 🚀 Como Rodar e Testar Localmente

### Opção 1: Abrir direto no Navegador
Basta abrir o arquivo `index.html` em qualquer navegador moderno:
```bash
# Windows
start index.html
```

### Opção 2: Rodar com Servidor HTTP Local (Node / Python / Live Server)
```bash
# Com Node / npx
npx serve .

# Ou com Python
python -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.

---

## 🛠 Estrutura do Projeto

```
meuhotelonline.com.br/
├── index.html              # Landing page principal completa e semântica
├── README.md               # Documentação e links de produção
└── assets/
    ├── css/
    │   └── styles.css      # Sistema de cores emerald luxury, glassmorphism e animações
    └── js/
        └── main.js         # Interações, WhatsApp Capture modal, máscara de telefone e FAQ
```

---

## 🌐 Deploy Contínuo no Cloudflare Pages

O site está implantado nativamente no Cloudflare Pages com SSL global automático:
```bash
# Atualizar deploy quando houver mudanças locais
npx wrangler pages deploy . --project-name=meuhotelonline --branch=main --commit-dirty=true
```

---

## ⚙️ Configuração do WhatsApp
Para alterar o número de WhatsApp padrão que recebe os orçamentos:
1. Abra `assets/js/main.js`.
2. Altere a constante `CONFIG.WHATSAPP_DEFAULT_PHONE` para o número desejado (com DDI e DDD, ex: `5521997316583`).

## Demo MVP — site + manutenção (09/09/2026)

- Página comercial: `/demo/`.
- Pousada fictícia navegável (tier essencial): `/demo/pousada/`.
- Hotel boutique fictício navegável (tier completo): `/demo/boutique/`.
- Proposta de preço em validação: R$ 1.990 de implantação + R$ 397/mês após publicação.
- Plano, simulador de faturamento e estratégia: `docs/mvp/`. A documentação operacional não entra no build do site.
- O modelo gera uma simulação de cotação; não consulta inventário nem confirma reservas. O formulário comercial prepara o link para o WhatsApp configurado, sem envio automático nem armazenamento.
- Construir: `node scripts/build-demo.cjs`. Publicar `dist` no projeto Cloudflare Pages `meuhotelonline`, conta comercial `8c4f3b0ccc2ee9001b6dd8322b8b6ca9`.
- A home, os assets e o material mkt preexistentes são preservados. Não executar `wrangler pages deploy .`, pois isso exporia documentação operacional.
- Conferir `demo/release.json` no deploy para identificar o SHA. URLs de demo têm `noindex`.

---

## 🏨 Demo Boutique — template Next.js embutido

A segunda demo (`/demo/boutique/`) é o template
[hotel-boutique-luxury](https://github.com/cspgabriel/hotel-boutique-luxury)
exportado como HTML estático e versionado aqui. Serve o tier alto do funil:
hotel 5★ com suítes, gastronomia, eventos, spa e ofertas — escopo que não cabe
na proposta de R$ 1.990 + R$ 397/mês.

### Como atualizar

```bash
# clona/atualiza o template, builda em modo demo e sincroniza demo/boutique/
node scripts/sync-boutique-demo.cjs

# usando um clone local do template
TEMPLATE_DIR=../hotel-boutique-luxury node scripts/sync-boutique-demo.cjs
```

Depois revise o diff e commite `demo/boutique/`. O SHA do template usado fica em
`demo/boutique/source.json`.

### O que o modo demo garante

O template lê variáveis `NEXT_PUBLIC_*` no build; o script de sync as define:

| Variável | Efeito |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Serve o site em `/demo/boutique/` sem quebrar assets e rotas |
| `NEXT_PUBLIC_DEMO_BANNER` | Faixa "site de demonstração · hotel fictício" + `noindex` no `<head>` |
| `NEXT_PUBLIC_DEMO_BANNER_HREF` | Link de volta para a oferta real |
| `NEXT_PUBLIC_DEMO_WHATSAPP` | Redireciona os CTAs para o WhatsApp comercial |
| `NEXT_PUBLIC_DEMO_PHONE` | Redireciona os links `tel:` para o telefone comercial |

Os dois últimos são obrigatórios: os contatos do hotel fictício no template
podem pertencer a terceiros reais, e o lead interessado precisa chegar a quem
vende o site.

### Imagens da demo

A demo usa hotlinks do Unsplash, aceitável em página `noindex`. Para site de
cliente pago isso não serve — o template traz o pipeline que resolve:
`npm run localize-images` baixa, converte para WebP e gera `CREDITS.md` com a
origem de cada foto, e `npm run validate:client` bloqueia a entrega enquanto
sobrar qualquer hotlink. Veja o README do template.

---

## 📄 Página de proposta — `/orcamento/`

Proposta comercial com calculadora e aceite pelo WhatsApp, no mesmo padrão da
proposta da Mell: o cliente marca o que quer, os valores se ajustam e o botão
abre o WhatsApp com a mensagem de aceite já montada. Nada é armazenado e nada é
cobrado na página.

**Uma página serve todos os prospects.** Os dados do destinatário vêm da URL, em
vez de um HTML por cliente para manter em dia:

```
/orcamento/?h=Pousada+Recanto&c=Petrópolis&t=boutique&p=2026-0910-PR&v=2026-09-24
```

| Param | O que é | Padrão |
| --- | --- | --- |
| `h` | Nome da hospedagem | "sua hospedagem" |
| `c` | Cidade | vazio |
| `t` | `essencial` ou `boutique` | `essencial` |
| `p` | Número da proposta | derivado da data |
| `v` | Validade `AAAA-MM-DD` | hoje + 15 dias |

Sem nenhum parâmetro a página funciona como orçamento self-service — é assim que
`/demo/` a linka.

### Preços

Ficam todos em `PLANOS`, no topo de `orcamento/proposta.js`. Um lugar só.

| | Implantação | Mensal |
| --- | --- | --- |
| Essencial | R$ 1.990 | R$ 397 |
| Boutique | R$ 4.900 | R$ 697 |

⚠️ **Os valores do Boutique são proposta, não decisão.** O Essencial é o que já
está publicado em `/demo/`; o Boutique foi estimado pelo escopo maior (página por
suíte, gastronomia, eventos, ofertas) e precisa da sua validação antes de ir a
um cliente real.

Adicionais: medição e anúncios R$ 500, tratamento de fotos R$ 390 — ambos
pagamento único.

### Indexação

`/orcamento/*` sai com `noindex, nofollow` na meta tag e no `_headers`. É
documento comercial privado, não página de captação.
