# QA local — 09/09/2026

Chrome real via Playwright CLI. 60 verificações aprovadas nas páginas e 5 no plano interativo.

- Desktop 1440px, tablet 768px e mobile 375px sem overflow.
- Todos os assets de imagem carregados; uma correção de contraste aplicada na legenda do navegador demonstrativo.
- Axe WCAG 2 A/AA e 2.1 AA sem violações nas duas páginas nas três larguras. Verificação automática não equivale a certificação completa de acessibilidade.
- Navegação, menu mobile, FAQ, âncoras e redução de movimento verificados.
- Briefing: campos vazios/espaços rejeitados, caracteres acentuados e & preservados, destinatário comercial existente e URL codificada; prévia antiga escondida ao editar.
- Cotação: categoria e capacidade sincronizadas; datas vazias, passado e saída igual à chegada rejeitados; 3 noites calculadas; prévia antiga escondida ao editar; botão de copiar respondendo. Sem envio externo.
- Simulador: R$ 10.322 de MRR, R$ 18.282 com 4 implantações, R$ 10.342 com 6 ativos + 4 implantações; mensalidade zero rejeitada; sem overflow 375px.
- Nenhum erro de JavaScript capturado. Scripts inline e builder parseados.
- Inspeção visual humana/agente das capturas desktop e 375px realizada.
- Origem estática anterior no deployment c158e199 corresponde à home do checkout normalizando CRLF/LF. O domínio customizado injeta scripts/transformações Cloudflare, portanto hash bruto dele não é igualdade de fonte.

Evidências locais: `D:/operations/meuhotelonline-mvp-20260909/qa-local.json`, `qa-plano.json` e capturas `local-*.png`.

QA público e SHA final serão registrados nas issues meuhotelonline#1 e central#132 após deploy.
