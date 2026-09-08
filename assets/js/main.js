/**
 * MeuHotelOnline.com.br — Scripts de Interação & WhatsApp Capture
 */

// Configurações Gerais
const CONFIG = {
  WHATSAPP_DEFAULT_PHONE: '5521997316583', // Número oficial de contato
  DEFAULT_UTM_SOURCE: 'meuhotelonline_site',
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhatsAppCaptureModal();
  initFaqAccordion();
  initPhoneMask();
  initHeaderScroll();
});

/* ================================================================
   1. MENU MOBILE
   ================================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('btn-mobile-menu');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('btn-close-mobile');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.remove('hidden');
    mobileNav.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileNav.classList.add('hidden');
    mobileNav.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Fechar ao clicar em qualquer link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ================================================================
   2. HEADER SCROLL EFFECT
   ================================================================ */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-opacity-95', 'backdrop-blur-md', 'shadow-lg');
      header.classList.remove('bg-opacity-80');
    } else {
      header.classList.add('bg-opacity-80');
      header.classList.remove('shadow-lg');
    }
  });
}

/* ================================================================
   3. WHATSAPP CAPTURE MODAL (Inspiração HotelariaWeb + WDB)
   ================================================================ */
function initWhatsAppCaptureModal() {
  const modal = document.getElementById('whatsapp-capture-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="whatsapp"]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const form = document.getElementById('whatsapp-capture-form');

  if (!modal) return;

  const openModal = (context = 'Geral') => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const contextInput = document.getElementById('lead-context');
    if (contextInput) contextInput.value = context;
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ctx = btn.getAttribute('data-context') || 'Hero CTA';
      openModal(ctx);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Esc para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Submissão do Formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lead-name')?.value.trim() || '';
      const whatsapp = document.getElementById('lead-whatsapp')?.value.trim() || '';
      const hotelName = document.getElementById('lead-hotel-name')?.value.trim() || '';
      const city = document.getElementById('lead-city')?.value.trim() || '';
      const rooms = document.getElementById('lead-rooms')?.value || '1 a 10 acomodações';
      const mainGoal = document.getElementById('lead-goal')?.value || 'Aumentar reservas diretas';
      const context = document.getElementById('lead-context')?.value || 'Site';

      // Salva localmente como histórico
      const leadData = {
        name,
        whatsapp,
        hotelName,
        city,
        rooms,
        mainGoal,
        context,
        createdAt: new Date().toISOString(),
      };

      try {
        const storedLeads = JSON.parse(localStorage.getItem('mho_leads') || '[]');
        storedLeads.push(leadData);
        localStorage.setItem('mho_leads', JSON.stringify(storedLeads));
      } catch (err) {
        console.warn('Erro ao salvar no localStorage:', err);
      }

      // Constrói mensagem amigável e profissional para o WhatsApp
      let msg = `*Solicitação de Orçamento — Meu Hotel Online*\n\n`;
      msg += `*Nome:* ${name}\n`;
      msg += `*WhatsApp:* ${whatsapp}\n`;
      if (hotelName) msg += `*Hospedagem:* ${hotelName}\n`;
      if (city) msg += `*Localização:* ${city}\n`;
      msg += `*Acomodações:* ${rooms}\n`;
      msg += `*Objetivo Principal:* ${mainGoal}\n`;
      msg += `\n_Vim pelo site meuhotelonline.com.br e gostaria de uma proposta para meu hotel/pousada!_`;

      const encodedMsg = encodeURIComponent(msg);
      const targetPhone = CONFIG.WHATSAPP_DEFAULT_PHONE;
      const zapUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;

      closeModal();

      // Feedback visual rápido antes de redirecionar
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Redirecionando para o WhatsApp...';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          window.open(zapUrl, '_blank');
        }, 300);
      } else {
        window.open(zapUrl, '_blank');
      }
    });
  }
}

/* ================================================================
   4. MÁSCARA INTELIGENTE DE TELEFONE (XX) XXXXX-XXXX
   ================================================================ */
function initPhoneMask() {
  const inputs = document.querySelectorAll('input[type="tel"]');
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        // Formato com 9 dígitos: (XX) 9XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length > 5) {
        // Formato com 8 dígitos: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        value = value.replace(/^(\d*)/, '($1');
      }
      e.target.value = value;
    });
  });
}

/* ================================================================
   5. FAQ ACCORDION
   ================================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Fecha todos os outros
      faqItems.forEach((otherItem) => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answer.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* Função global para acionar o modal via onclick em botões inline */
window.openWhatsAppCapture = function(context = 'CTA') {
  const modal = document.getElementById('whatsapp-capture-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const contextInput = document.getElementById('lead-context');
  if (contextInput) contextInput.value = context;
};
