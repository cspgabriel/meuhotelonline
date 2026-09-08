# MeuHotelOnline.com.br 🏨✨

> **Sites de Alta Conversão para Hotéis e Pousadas que Lotam Quartos Sem Depender do Booking.**

Criado a partir da fusão estratégica das três maiores referências do mercado:
1. **Web Design Brasil** (`webdesignbrasil.org` — *"a mais legal"*): Estética Emerald Luxury (`#1a3828`, `#22c55e`, `#facc15`), copy de alto impacto contra comissões das OTAs, marquee contínuo de prova social e credenciais em glassmorphism.
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
├── README.md               # Documentação e guia de deploy
└── assets/
    ├── css/
    │   └── styles.css      # Sistema de cores emerald luxury, glassmorphism e animações
    └── js/
        └── main.js         # Interações, WhatsApp Capture modal, máscara de telefone e FAQ
```

---

## 🌐 Deploy em Produção

Este projeto é 100% estático, seguro e ultrarrápido (Core Web Vitals nota 100). Pode ser publicado imediatamente em qualquer provedor:

### Cloudflare Pages (Recomendado)
1. Conecte o repositório ou faça deploy via Wrangler:
   ```bash
   npx wrangler pages deploy . --project-name=meuhotelonline
   ```
2. Aponte o domínio personalizado `meuhotelonline.com.br` no painel da Cloudflare.

### Vercel
```bash
npx vercel --prod
```

---

## ⚙️ Configuração do WhatsApp
Para alterar o número de WhatsApp padrão que recebe os orçamentos:
1. Abra `assets/js/main.js`.
2. Altere a constante `CONFIG.WHATSAPP_DEFAULT_PHONE` para o número desejado (com DDI e DDD, ex: `5521997316583`).
