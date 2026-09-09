# Meu Hotel Online — demo e MVP

## Briefing e procedência

Pedido: localizar hoteis.criacaodesitesbr.com, gerar demo/MVP e plano prático para faturar R$ 10 mil/mês. Em 09/09/2026 o usuário confirmou **site + manutenção mensal**.

Fonte: cspgabriel/meuhotelonline, main 255cd497f2326d3211b79ad39025aedacc5f4d29. Cloudflare Pages meuhotelonline, conta 8c4f3b0ccc2ee9001b6dd8322b8b6ca9, produção c158e199-b28c-410d-9369-c67538d0d57a. Número comercial existente no código: 5521997316583. Nenhum AGENTS.md específico encontrado. Quadros: issue local #1 e central #132, Project 3 em andamento.

Oferta atual: projetos avulsos desde R$ 1.890 e comunicação sem mensalidade. A modalidade nova será apresentada em /demo/, sem mudar contratos nem substituir a home. Preços propostos, não histórico de vendas: R$ 1.990 implantação + R$ 397/mês de manutenção após publicação. Não existe cobrança automática nesta entrega.

Objetivo: permitir ao dono de uma hospedagem ver a entrega e iniciar conversa comercial informada. Canal inicial proposto: prospecção individual, rede profissional e indicações. Tom simples, acolhedor e específico. Prova disponível: demonstração funcional. Sem depoimentos, resultados, tempo de mercado ou certificações verificados para usar.

## ICP de trabalho

Hipótese a testar em 20 conversas: pousadas e pequenos hotéis independentes com 5–40 acomodações, inicialmente RJ, sem site próprio adequado e com recepção no WhatsApp. Decisor: proprietário, gerente geral ou responsável comercial. Idade e formação não informadas e não usadas para segmentação. Busca: apresentar quartos, facilitar pedidos de cotação, ter apoio para manter informações corretas. Sinais de qualificação: fotos próprias disponíveis, decisor acessível, orçamento para implantação e manutenção, vontade de publicar em 30 dias. Redes que precisam de PMS/channel manager customizado ficam fora do MVP. Dores e objeções são hipóteses derivadas da oferta atual, não pesquisa concluída.

## Proposta de valor em quatro níveis

| Nível | Proposta |
| --- | --- |
| Empresa | Serviço especializado na apresentação de hospedagens, com demo verificável antes da contratação. Sem alegar exclusividade. |
| Persona | O dono entrega fotos e informações; recebe um site para apoiar a recepção, com responsável pela manutenção. |
| Produto | Galeria, acomodações, pedido de cotação por WhatsApp e manutenção com limite e preço claros. |
| Aquisição | Ver o modelo e conversar sobre sua hospedagem sem fornecer cadastro extenso. |

## Framework e wireframe

AIDA: oferta conhecida, decisão simples e demonstração tangível. Evita narrativa longa de venda complexa. BAB só como demonstração, sem métricas fictícias. Resultado a medir após uso: conversa qualificada, não reserva prometida.

| Seção | Framework | Elemento | Copy real | Design |
| --- | --- | --- | --- | --- |
| Cabeçalho | Atenção | Marca e navegação | Meu Hotel Online / O que inclui / Demonstração / Investimento | Claro, logo tipográfico, CTA verde |
| Hero | Atenção | Benefício + fotografia | Seu próximo hóspede começa pelo seu site. | Tipografia editorial, verde escuro e creme, hotel em destaque |
| Faixa | Interesse | Escopo | Site próprio. Contato direto. Cuidado contínuo. | Três colunas simples |
| Serviço | Interesse | Entregáveis | Você cuida da hospedagem. A gente cuida do site. | Lista objetiva com limites |
| Demo | Desejo | Modelo navegável | Antes de contratar, experimente. | Link para /demo/pousada/, modelo fictício explícito |
| Processo | Desejo | Etapas | Do seu material ao site publicado. | Briefing, montagem, revisão, publicação |
| Oferta | Ação | Implantação + mensalidade | Uma estrutura simples. Um cuidado contínuo. | Preço proposto e exclusões visíveis |
| FAQ | Ação | Objeções | O site confirma reservas automaticamente? | Details nativo acessível |
| Contato | Ação | Briefing curto | Vamos olhar para a sua hospedagem? | Nome da hospedagem e cidade, prévia da mensagem |
| Rodapé | Ação | Identidade e crédito | Meu Hotel Online / Demonstração de serviço | Sem prova inventada |

## Design system

Identidade nova derivada da referência: verde floresta #173d33; verde CTA #215b45; creme #f6f5ef; cinza texto #52605a; borda #d9dfd5; acento lima #dcec9d. Títulos Georgia/serif para hospitalidade, texto Arial/sans-serif. Container 1180px, escala fluida 40–76px no h1, corpo 16–18px, gutters 24px. Seções alternam fundo claro e verde. Botões mínimo 44px, foco visível 3px. Grid 2 colunas desktop, 1 em mobile <760px. Sem animação automática, reduced motion respeitado. Imagens ilustrativas Unsplash nas URLs originais, sem pessoas apresentadas como clientes. Modelo pousada fictício, sem localização ou disponibilidade real.

## Escopo funcional

- /demo/: apresentação de site + manutenção, perguntas frequentes, prévia do briefing e link comercial WhatsApp. Nada é enviado automaticamente.
- /demo/pousada/: hotel fictício com acomodações e formulário de datas/hóspedes; gera uma mensagem de demonstração na tela, sem reservar nem enviar a um hotel inexistente.
- Plano operacional em docs/mvp/plano-10k.md e HTML local, não incluído na publicação estática.
- Build de allowlist: home/assets/mkt existentes e demo; docs, ferramentas e estratégia não entram no deploy.

## Quality gate

| Dimensão | Evidência prevista |
| --- | --- |
| Motivação | Benefício explícito no h1, sem ocupação garantida. |
| Valor | Acomodações + cotação + manutenção demonstradas. |
| Incentivo | Modelo navegável e proposta antes de contratar, sem escassez falsa. |
| Fricção | Dois campos no comercial, CTA direto disponível e navegação 375px. |
| Incerteza | Preços propostos, prazo condicionado aos materiais, escopo da manutenção e ausência de confirmação automática claros. |

## Execução

- [x] Repositório, acessos, quadros e briefing confirmados.
- [x] Estratégia e wireframe definidos segundo o escopo autorizado.
- [x] Implementar páginas e plano operacional.
- [x] QA local desktop/mobile, casos válidos e inválidos: 60 verificações + 5 no plano.
- [ ] Commit, deploy aditivo, QA público e fechamento dos quadros.

