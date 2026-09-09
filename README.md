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
- Pousada fictícia navegável: `/demo/pousada/`.
- Proposta de preço em validação: R$ 1.990 de implantação + R$ 397/mês após publicação.
- Plano, simulador de faturamento e estratégia: `docs/mvp/`. A documentação operacional não entra no build do site.
- O modelo gera uma simulação de cotação; não consulta inventário nem confirma reservas. O formulário comercial prepara o link para o WhatsApp configurado, sem envio automático nem armazenamento.
- Construir: `node scripts/build-demo.cjs`. Publicar `dist` no projeto Cloudflare Pages `meuhotelonline`, conta comercial `8c4f3b0ccc2ee9001b6dd8322b8b6ca9`.
- A home, os assets e o material mkt preexistentes são preservados. Não executar `wrangler pages deploy .`, pois isso exporia documentação operacional.
- Conferir `demo/release.json` no deploy para identificar o SHA. URLs de demo têm `noindex`.
