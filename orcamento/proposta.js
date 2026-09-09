/* =====================================================================
   Proposta comercial — calculadora de escolhas e aceite por WhatsApp.

   Uma única página serve todos os prospects: os dados do destinatário vêm
   da query string, então não existe um HTML por cliente para manter em dia.

     /orcamento/?h=Pousada+Recanto&c=Petrópolis&t=boutique&p=2026-0910-PR&v=2026-09-24

     h  nome da hospedagem      c  cidade
     t  essencial | boutique    p  número da proposta
     v  validade (AAAA-MM-DD)

   Nada é armazenado e nada é cobrado aqui: o botão só monta um link do
   WhatsApp com o que estiver marcado, que o cliente revisa antes de enviar.
   ===================================================================== */
(function () {
  'use strict';

  var WA = '5521997316583';
  var NL = String.fromCharCode(10);

  /* ---------------------------------------------------------------
     Tabela de preços. Único lugar a editar quando os valores mudarem.

     O Essencial é a oferta já publicada em /demo/. O Boutique está em
     validação — o modelo tem página por suíte, gastronomia, eventos e
     ofertas, escopo que não cabe no preço do Essencial.
     --------------------------------------------------------------- */
  var PLANOS = {
    essencial: {
      nome: 'Essencial',
      descricao: 'pousadas, chalés e hospedagens pequenas',
      setup: 1990,
      mensal: 397,
      prazo: 'em até 7 dias úteis'
    },
    boutique: {
      nome: 'Boutique',
      descricao: 'hotéis com gastronomia, eventos e spa',
      setup: 4900,
      mensal: 697,
      prazo: 'em até 12 dias úteis'
    }
  };

  var TRACKING = 500;
  var FOTOS = 390;
  var VALIDADE_DIAS = 15;

  /* --------------------------------------------------------------- */

  var g = function (id) { return document.getElementById(id); };

  function brl(n) {
    return 'R$ ' + n.toLocaleString('pt-BR', {
      minimumFractionDigits: n % 1 ? 2 : 0,
      maximumFractionDigits: 2
    });
  }

  function dataBR(d) {
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  /* A query string vem de fora: entra na página só como texto, nunca como
     HTML, e com tamanho limitado. */
  function param(nome, padrao, max) {
    var v = new URLSearchParams(location.search).get(nome);
    if (!v) return padrao;
    v = v.trim().slice(0, max || 80);
    return v || padrao;
  }

  var hotel = param('h', '');
  var cidade = param('c', '', 60);
  var tier = param('t', 'essencial', 12).toLowerCase();
  if (!PLANOS[tier]) tier = 'essencial';

  /* Número da proposta: usa o informado ou deriva da data, para o
     documento nunca sair sem identificação. */
  var hoje = new Date();
  function pad(n) { return String(n).padStart(2, '0'); }
  var numeroAuto =
    hoje.getFullYear() + '-' + pad(hoje.getMonth() + 1) + pad(hoje.getDate()) +
    (hotel ? '-' + hotel.replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 2).toUpperCase() : '');
  var numero = param('p', numeroAuto, 24);

  var validade = new Date(hoje.getTime());
  var vParam = param('v', '', 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(vParam)) {
    var partes = vParam.split('-');
    validade = new Date(+partes[0], +partes[1] - 1, +partes[2]);
  } else {
    validade.setDate(validade.getDate() + VALIDADE_DIAS);
  }

  /* --- cabeçalho e personalização ------------------------------- */
  g('heroHotel').textContent = hotel || 'sua hospedagem';
  g('propNum').textContent = '#' + numero;
  g('propData').textContent = dataBR(hoje);
  g('validade').textContent = dataBR(validade);
  g('footMeta').textContent =
    'Proposta #' + numero + (hotel ? ' · ' + hotel : '') + (cidade ? ' · ' + cidade : '') +
    ' · documento privado';
  document.title = hotel
    ? 'Proposta para ' + hotel + ' | Meu Hotel Online'
    : 'Proposta comercial | Meu Hotel Online';

  /* --- preços fixos nos cards ----------------------------------- */
  g('pEssSetup').innerHTML = brl(PLANOS.essencial.setup) + '<small> na implantação</small>';
  g('pEssMensal').textContent = 'mais ' + brl(PLANOS.essencial.mensal) + '/mês de manutenção';
  g('pBouSetup').innerHTML = brl(PLANOS.boutique.setup) + '<small> na implantação</small>';
  g('pBouMensal').textContent = 'mais ' + brl(PLANOS.boutique.mensal) + '/mês de manutenção';
  g('amtTrk').textContent = brl(TRACKING);
  g('amtFotos').textContent = brl(FOTOS);

  var ess = g('planoEssencial');
  var bou = g('planoBoutique');
  var mensal = g('optMensal');
  var trk = g('optTrk');
  var fotos = g('optFotos');
  var nf = g('optNf');
  var btn = g('waBtn');
  if (!ess || !btn) return;

  if (tier === 'boutique') bou.checked = true;

  function marca(el, cardId) {
    var c = g(cardId);
    if (c) c.classList.toggle('is-on', el.checked);
  }

  function render() {
    var plano = bou.checked ? PLANOS.boutique : PLANOS.essencial;

    marca(ess, 'planoEssencialCard');
    marca(bou, 'planoBoutiqueCard');
    marca(mensal, 'optMensalCard');
    marca(trk, 'optTrkCard');
    marca(fotos, 'optFotosCard');
    marca(nf, 'optNfCard');

    g('stMensal').textContent = mensal.checked ? 'Incluída' : 'Sem manutenção';
    g('stTrk').textContent = trk.checked ? 'Adicionado ao pedido' : 'Não adicionado';
    g('stFotos').textContent = fotos.checked ? 'Adicionado ao pedido' : 'Não adicionado';
    g('stNf').textContent = nf.checked ? 'Solicitada' : 'Não solicitada';

    g('amtMensal').textContent = brl(plano.mensal) + '/mês';
    g('lblPlano').textContent = 'Implantação · ' + plano.nome;
    g('prazoTxt').textContent =
      'Prazo proposto para o modelo ' + plano.nome + ': ' + plano.prazo +
      ', contados a partir do recebimento dos materiais completos. A publicação acontece depois da sua aprovação.';

    var entrada = Math.round(plano.setup / 2);
    var restante = plano.setup - entrada;
    var vTrk = trk.checked ? TRACKING : 0;
    var vFotos = fotos.checked ? FOTOS : 0;
    var vMensal = mensal.checked ? plano.mensal : 0;
    var unico = plano.setup + vTrk + vFotos;

    g('tSetup').textContent = brl(plano.setup);
    g('tEntrada').textContent = brl(entrada);
    g('tRestante').textContent = brl(restante);
    g('rowTrk').hidden = !vTrk;
    g('tTrk').textContent = brl(vTrk);
    g('rowFotos').hidden = !vFotos;
    g('tFotos').textContent = brl(vFotos);
    g('tUnico').textContent = brl(unico);
    g('tMensal').textContent = vMensal ? brl(vMensal) + '/mês' : 'sem manutenção';
    g('tAno').textContent = brl(unico + vMensal * 12);

    var adicionais = [];
    if (vTrk) adicionais.push('medição');
    if (vFotos) adicionais.push('fotos');
    if (nf.checked) adicionais.push('NFS-e');

    g('sPlano').textContent = plano.nome;
    g('sEntrada').textContent = brl(entrada);
    g('sRestante').textContent = brl(restante);
    g('sAdd').textContent = adicionais.length ? adicionais.join(', ') : 'nenhum';
    g('sMensal').textContent = vMensal ? brl(vMensal) + '/mês' : '—';
    g('sUnico').textContent = brl(unico);

    /* --- mensagem de aceite ------------------------------------- */
    var L = [];
    L.push('Olá! Recebi a proposta *#' + numero + '* do Meu Hotel Online e quero seguir com:');
    L.push('');
    if (hotel) {
      L.push('*Hospedagem:* ' + hotel + (cidade ? ' — ' + cidade : ''));
      L.push('');
    }
    L.push('✅ *Modelo ' + plano.nome + '* — ' + brl(plano.setup) + ' de implantação');
    L.push('   • Para ' + plano.descricao);
    L.push('   • ' + brl(entrada) + ' na aprovação e ' + brl(restante) + ' na publicação');
    L.push('   • Entrega ' + plano.prazo + ' após os materiais completos');
    if (vMensal) {
      L.push('✅ *Manutenção mensal* — ' + brl(vMensal) + '/mês, sem fidelidade');
      L.push('   • Hospedagem, verificação mensal e até 2 atualizações por mês');
    } else {
      L.push('⬜ *Sem manutenção mensal* — quero só a implantação');
    }
    if (vTrk) {
      L.push('✅ *Medição e anúncios* — ' + brl(vTrk) + ' (pagamento único)');
      L.push('   • GA4, Pixel da Meta com API de Conversões e tag do Google Ads');
    }
    if (vFotos) {
      L.push('✅ *Tratamento de fotos* — ' + brl(vFotos) + ' (pagamento único)');
      L.push('   • Seleção, recorte e otimização de até 30 fotos');
    }
    if (nf.checked) L.push('✅ *Com nota fiscal* (NFS-e)');
    L.push('');
    L.push('*Total de entrada:* ' + brl(unico) + ' (pagamento único)');
    if (vMensal) L.push('*Mensalidade:* ' + brl(vMensal) + '/mês a partir da publicação');
    L.push('');
    L.push('Confirmo que li as premissas e exclusões da proposta.');

    var texto = L.join(NL);
    btn.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto);
    g('waPreview').textContent = texto;
    g('waLabel').textContent = 'Enviar aceite: ' + plano.nome +
      (vMensal ? ' + mensal' : ' (sem mensal)');
  }

  [ess, bou, mensal, trk, fotos, nf].forEach(function (el) {
    el.addEventListener('change', render);
  });

  render();
})();
