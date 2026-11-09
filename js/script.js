/**
 * ==========================================================================
 * BIOMARMITA — INTERATIVIDADES E NAVEGAÇÃO (JAVASCRIPT PURO)
 * ==========================================================================
 * Este arquivo adiciona comportamentos simples e leves ao site:
 * 1. Abrir e fechar o menu no telemóvel/celular (Menu Hambúrguer).
 * 2. Abrir e fechar as perguntas frequentes (Efeito Sanfona / Accordion).
 * 3. Envio simulado do formulário de contacto com mensagem de confirmação.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. MENU RESPONSIVO MOBILE (HAMBÚRGUER)
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function () {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Fechar o menu ao clicar num link de navegação
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. PERGUNTAS FREQUENTES (FAQ ACCORDION)
  // ------------------------------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const parentItem = this.closest('.faq-item');
      if (!parentItem) return;

      const isActive = parentItem.classList.contains('active');

      // Opcional: fechar outras perguntas abertas para manter a página limpa
      document.querySelectorAll('.faq-item').forEach(function (item) {
        if (item !== parentItem) {
          item.classList.remove('active');
        }
      });

      // Alternar o estado do item clicado
      parentItem.classList.toggle('active', !isActive);
    });
  });

  // ------------------------------------------------------------------------
  // 3. FORMULÁRIO DE CONTACTO (SIMULAÇÃO AMIGÁVEL)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obter os valores dos campos
      const nomeInput = document.getElementById('nome');
      const nome = nomeInput ? nomeInput.value.trim() : 'Cliente';

      // Exibir mensagem de sucesso acolhedora
      formFeedback.innerHTML = `
        <strong>Obrigado pela sua mensagem, ${nome}!</strong><br>
        Recebemos o seu contacto. A nossa equipa da BioMarmita responderá em menos de 1 hora no horário útil.
      `;
      formFeedback.className = 'form-feedback success';

      // Limpar os campos do formulário
      contactForm.reset();

      // Fazer scroll suave até à mensagem de sucesso
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ------------------------------------------------------------------------
  // 4. CARRINHO & FLUXO DE CHECKOUT MULTI-STEP (COM CONSTRUTOR DE CAIXA)
  // ------------------------------------------------------------------------
  const checkoutStep1 = document.getElementById('checkoutStep1');
  const checkoutStep2 = document.getElementById('checkoutStep2');
  const checkoutStep3 = document.getElementById('checkoutStep3');
  const checkoutStep4 = document.getElementById('checkoutStep4');
  const checkoutStep5 = document.getElementById('checkoutStep5');

  if (checkoutStep1) {
    let currentStep = 1;
    const stepTab1 = document.getElementById('stepTab1');
    const stepTab2 = document.getElementById('stepTab2');
    const stepTab3 = document.getElementById('stepTab3');
    const stepTab4 = document.getElementById('stepTab4');

    const selectPlano = document.getElementById('selectPlano');
    const cartPlanTitle = document.getElementById('cartPlanTitle');
    const cartPlanPrice = document.getElementById('cartPlanPrice');
    const cartDiscount = document.getElementById('cartDiscount');
    const cartFinalTotal = document.getElementById('cartFinalTotal');

    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    const btnGoToStep2 = document.getElementById('btnGoToStep2');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');
    const btnGoToStep3 = document.getElementById('btnGoToStep3');
    const btnBackToStep2 = document.getElementById('btnBackToStep2');
    const btnBackToStep3 = document.getElementById('btnBackToStep3');
    const step3AddressForm = document.getElementById('step3AddressForm');
    const paymentFieldsContainer = document.getElementById('paymentFieldsContainer');
    const checkoutFinalForm = document.getElementById('checkoutFinalForm');

    // Cálculo dinâmico da Data de Entrega (48 horas após a subscrição)
    function calculate48hDeliveryDate() {
      const now = new Date();
      const delivery = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      let str = delivery.toLocaleDateString('pt-PT', options);
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const estimatedDeliveryDateStr = calculate48hDeliveryDate();

    const estimatedDeliveryText = document.getElementById('estimatedDeliveryText');
    if (estimatedDeliveryText) {
      estimatedDeliveryText.textContent = estimatedDeliveryDateStr;
    }

    const step3DeliveryDate = document.getElementById('step3DeliveryDate') || document.getElementById('step2DeliveryDate');
    if (step3DeliveryDate) {
      step3DeliveryDate.textContent = estimatedDeliveryDateStr;
    }

    // Elementos do Construtor de Caixa Semanal
    const boxItemsGrid = document.getElementById('boxItemsGrid');
    const giftItemsGrid = document.getElementById('giftItemsGrid');
    const planTargetDisplay = document.getElementById('planTargetDisplay');
    const mealsCountDisplay = document.getElementById('mealsCountDisplay');
    const mealsStatusPill = document.getElementById('mealsStatusPill');
    const mealsProgressBar = document.getElementById('mealsProgressBar');
    const giftSnacksCountDisplay = document.getElementById('giftSnacksCountDisplay');
    const giftStatusPill = document.getElementById('giftStatusPill');
    const giftProgressBar = document.getElementById('giftProgressBar');
    const boxSelectionTags = document.getElementById('boxSelectionTags');
    const btnChefSuggest = document.getElementById('btnChefSuggest');
    const btnClearBox = document.getElementById('btnClearBox');
    const boxFilterTabs = document.querySelectorAll('.box-filter-tab');
    const boxNoticeBanner = document.getElementById('boxNoticeBanner');
    const boxNoticeText = document.getElementById('boxNoticeText');
    const closeBoxNotice = document.getElementById('closeBoxNotice');
    let currentBoxFilter = 'all';

    // Catálogo Oficial dos 10 Itens da Ementa (Todos elegíveis para a caixa semanal!)
    const catalogItems = [
      {
        id: 'peru',
        name: 'Peito de Peru Recheado com Espinafres',
        category: 'refeicao',
        typeLabel: 'Carne Magra',
        kcal: 460,
        origin: 'Quinta da Bouça Bio (Vila Verde)',
        img: './assets/imagens/prato-peru-espinafres.jpeg'
      },
      {
        id: 'bacalhau',
        name: 'Lombo de Bacalhau com Grão',
        category: 'refeicao',
        typeLabel: 'Peixe Sustentável',
        kcal: 490,
        origin: 'Maré Viva (Lota de Matosinhos)',
        img: './assets/imagens/prato-bacalhau-grao.jpeg'
      },
      {
        id: 'caril',
        name: 'Caril de Grão & Espinafres (Vegan)',
        category: 'refeicao',
        typeLabel: 'Vegetariano & Vegan',
        kcal: 430,
        origin: 'Sabor do Campo (Penafiel)',
        img: './assets/imagens/prato-caril-grao.jpeg'
      },
      {
        id: 'frango',
        name: 'Frango do Campo Grelhado com Arroz',
        category: 'refeicao',
        typeLabel: 'Carne Magra',
        kcal: 480,
        origin: 'Quinta da Bouça Bio (Vila Verde)',
        img: './assets/imagens/menu-tradicional.jpeg'
      },
      {
        id: 'salmao',
        name: 'Salmão Fresco & Quinoa Real',
        category: 'refeicao',
        typeLabel: 'Peixe Sustentável',
        kcal: 510,
        origin: 'Maré Viva (Lota de Matosinhos)',
        img: './assets/imagens/menu-fitness.jpeg'
      },
      {
        id: 'tofu',
        name: 'Bowl de Tofu & Abacate',
        category: 'refeicao',
        typeLabel: 'Vegetariano & Vegan',
        kcal: 420,
        origin: 'Sabor do Campo (Penafiel)',
        img: './assets/imagens/menu-vegetariano.jpeg'
      },
      {
        id: 'chia',
        name: 'Pudim de Chia com Frutos Vermelhos',
        category: 'lanche',
        typeLabel: 'Lanche Biológico',
        kcal: 210,
        origin: 'Sabor do Campo (Penafiel)',
        img: './assets/imagens/lanche-pudim-chia.jpeg'
      },
      {
        id: 'tostas',
        name: 'Tostas de Centeio com Abacate e Ovo',
        category: 'lanche',
        typeLabel: 'Pequeno-Almoço',
        kcal: 290,
        origin: 'Quinta da Serra & Horta do Vale',
        img: './assets/imagens/lanche-tostas-abacate.jpeg'
      },
      {
        id: 'panquecas',
        name: 'Panquecas de Aveia & Banana com Mel',
        category: 'lanche',
        typeLabel: 'Kids Friendly',
        kcal: 240,
        origin: 'Sabor do Campo (Penafiel)',
        img: './assets/imagens/lanche-panquecas-aveia.jpeg'
      },
      {
        id: 'humus',
        name: 'Húmus de Pimento com Palitos de Vegetais',
        category: 'lanche',
        typeLabel: 'Snack de Escritório',
        kcal: 180,
        origin: 'Horta do Vale (Vila do Conde)',
        img: './assets/imagens/lanche-humus-vegetais.jpeg'
      }
    ];

    // Os 4 Lanches Biológicos disponíveis para as Ofertas Gratuitas
    const giftSnacks = catalogItems.filter(item => item.category === 'lanche');

    // Estado da Seleção:
    // boxQuantities: armazena a quantidade de qualquer um dos 10 itens para a caixa
    const boxQuantities = {};
    catalogItems.forEach(item => { boxQuantities[item.id] = 0; });

    // giftQuantities: armazena os lanches de oferta gratuita
    const giftQuantities = {};
    giftSnacks.forEach(item => { giftQuantities[item.id] = 0; });

    // Dados dos Planos (Cada plano inclui a sua quota de refeições/itens + Ofertas Grátis)
    const planosData = {
      individual: {
        nome: 'Plano Individual (5 Refeições/Lanches + 🎁 1 Oferta)',
        precoBase: 39.90,
        desconto: 5.99,
        total: 33.91,
        maxRefeicoes: 5,
        maxOfertas: 1
      },
      casal: {
        nome: 'Plano Casal (10 Refeições/Lanches + 🎁 2 Ofertas)',
        precoBase: 74.90,
        desconto: 11.24,
        total: 63.66,
        maxRefeicoes: 10,
        maxOfertas: 2
      },
      familia: {
        nome: 'Plano Família (15 Refeições/Lanches + 🎁 4 Ofertas)',
        precoBase: 104.90,
        desconto: 15.74,
        total: 89.16,
        maxRefeicoes: 15,
        maxOfertas: 4
      }
    };

    // Contagem de todos os itens escolhidos para a caixa (pratos + lanches)
    function getTotalMealsCount() {
      return catalogItems.reduce((sum, item) => sum + (boxQuantities[item.id] || 0), 0);
    }

    // Contagem dos lanches de oferta
    function getTotalGiftSnacksCount() {
      return giftSnacks.reduce((sum, item) => sum + (giftQuantities[item.id] || 0), 0);
    }

    // Função para atualizar os valores do carrinho
    function updateCartValues(planoKey) {
      const plano = planosData[planoKey] || planosData.casal;
      if (cartPlanTitle) cartPlanTitle.innerText = plano.nome;
      if (cartPlanPrice) cartPlanPrice.innerText = plano.precoBase.toFixed(2).replace('.', ',') + ' €';
      if (cartDiscount) cartDiscount.innerText = '- ' + plano.desconto.toFixed(2).replace('.', ',') + ' €';
      if (cartFinalTotal) cartFinalTotal.innerText = plano.total.toFixed(2).replace('.', ',') + ' €';
      if (planTargetDisplay) planTargetDisplay.innerText = plano.maxRefeicoes;
      const cartGiftRowTitle = document.getElementById('cartGiftRowTitle');
      if (cartGiftRowTitle) {
        cartGiftRowTitle.innerText = `🎁 ${plano.maxOfertas}x Lanche${plano.maxOfertas > 1 ? 's' : ''} Biológico${plano.maxOfertas > 1 ? 's' : ''} de Oferta Especial`;
      }
      renderBoxBuilder();
    }

    // Sugestão Automática Equilibrada do Chef (preenche a caixa e os lanches de oferta)
    function fillChefSuggestion() {
      catalogItems.forEach(item => { boxQuantities[item.id] = 0; });
      giftSnacks.forEach(item => { giftQuantities[item.id] = 0; });

      const currentPlan = selectPlano.value;

      if (currentPlan === 'individual') {
        boxQuantities['peru'] = 1;
        boxQuantities['bacalhau'] = 1;
        boxQuantities['caril'] = 1;
        boxQuantities['frango'] = 1;
        boxQuantities['salmao'] = 1;
        // 1 Lanche de Oferta
        giftQuantities['chia'] = 1;
      } else if (currentPlan === 'casal') {
        boxQuantities['peru'] = 2;
        boxQuantities['bacalhau'] = 2;
        boxQuantities['caril'] = 2;
        boxQuantities['frango'] = 2;
        boxQuantities['salmao'] = 2;
        // 2 Lanches de Oferta
        giftQuantities['chia'] = 1;
        giftQuantities['panquecas'] = 1;
      } else if (currentPlan === 'familia') {
        boxQuantities['peru'] = 3;
        boxQuantities['bacalhau'] = 3;
        boxQuantities['caril'] = 2;
        boxQuantities['frango'] = 3;
        boxQuantities['salmao'] = 2;
        boxQuantities['panquecas'] = 2; // lanche delicioso para crianças dentro da caixa!
        // 4 Lanches de Oferta (Kit Familiar Completo)
        giftQuantities['chia'] = 1;
        giftQuantities['panquecas'] = 1;
        giftQuantities['tostas'] = 1;
        giftQuantities['humus'] = 1;
      }
      renderBoxBuilder();
    }

    // Limpar toda a seleção
    function clearBoxSelection() {
      catalogItems.forEach(item => { boxQuantities[item.id] = 0; });
      giftSnacks.forEach(item => { giftQuantities[item.id] = 0; });
      renderBoxBuilder();
    }

    // Renderizar e Atualizar o Construtor de Caixa e Ofertas
    function renderBoxBuilder() {
      const plan = planosData[selectPlano.value] || planosData.casal;
      const totalMeals = getTotalMealsCount();
      const totalGifts = getTotalGiftSnacksCount();

      if (planTargetDisplay) planTargetDisplay.innerText = plan.maxRefeicoes;

      // 1. Atualizar progresso das refeições/itens da caixa
      if (mealsCountDisplay) mealsCountDisplay.innerText = `${totalMeals} / ${plan.maxRefeicoes}`;
      const mealsPercent = Math.min(100, Math.round((totalMeals / plan.maxRefeicoes) * 100));
      if (mealsProgressBar) mealsProgressBar.style.width = `${mealsPercent}%`;

      if (totalMeals >= plan.maxRefeicoes) {
        if (mealsStatusPill) {
          mealsStatusPill.className = 'box-status-pill success';
          mealsStatusPill.innerText = '✓ Caixa Completa';
        }
      } else {
        const diff = plan.maxRefeicoes - totalMeals;
        if (mealsStatusPill) {
          mealsStatusPill.className = 'box-status-pill warning';
          mealsStatusPill.innerText = `Faltam ${diff} item${diff > 1 ? 's' : ''}`;
        }
      }

      // 2. Atualizar progresso dos lanches de oferta
      const maxGifts = plan.maxOfertas;
      if (giftSnacksCountDisplay) giftSnacksCountDisplay.innerText = `${totalGifts} / ${maxGifts}`;
      const giftPercent = Math.min(100, Math.round((totalGifts / maxGifts) * 100));
      if (giftProgressBar) giftProgressBar.style.width = `${giftPercent}%`;

      if (totalGifts >= maxGifts) {
        if (giftStatusPill) {
          giftStatusPill.className = 'gift-status-pill success';
          giftStatusPill.innerText = `✓ ${maxGifts} Lanche${maxGifts > 1 ? 's' : ''} de Oferta Escolhido${maxGifts > 1 ? 's' : ''}!`;
        }
      } else {
        const diffGifts = maxGifts - totalGifts;
        if (giftStatusPill) {
          giftStatusPill.className = 'gift-status-pill warning';
          giftStatusPill.innerText = `Escolha ${diffGifts} lanche${diffGifts > 1 ? 's' : ''} de oferta`;
        }
      }

      // 3. Renderizar Itens da Caixa (todos os 10 itens do menu são elegíveis!)
      if (boxItemsGrid) {
        boxItemsGrid.innerHTML = '';
        catalogItems.forEach(item => {
          if (currentBoxFilter !== 'all' && item.category !== currentBoxFilter) {
            return;
          }

          const qty = boxQuantities[item.id] || 0;
          const canAdd = totalMeals < plan.maxRefeicoes;

          const card = document.createElement('div');
          card.className = `box-item-card ${qty > 0 ? 'has-qty' : ''}`;
          card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="box-item-img">
            <div class="box-item-info">
              <div class="box-item-name" title="${item.name}">${item.name}</div>
              <div class="box-item-meta">
                <span>${item.typeLabel}</span>
                <span>•</span>
                <span>${item.kcal} kcal</span>
              </div>
              <div class="box-item-origin">📍 ${item.origin}</div>
            </div>
            <div class="box-item-qty">
              <button type="button" class="qty-btn btn-minus" data-id="${item.id}" ${qty === 0 ? 'disabled' : ''} aria-label="Remover 1 ${item.name}">-</button>
              <span class="qty-value">${qty}</span>
              <button type="button" class="qty-btn btn-plus" data-id="${item.id}" ${!canAdd ? 'disabled' : ''} aria-label="Adicionar 1 ${item.name}">+</button>
            </div>
          `;
          boxItemsGrid.appendChild(card);
        });

        // Eventos dos botões de incremento e decremento da caixa
        boxItemsGrid.querySelectorAll('.btn-minus').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            if (boxQuantities[id] > 0) {
              boxQuantities[id]--;
              renderBoxBuilder();
            }
          });
        });

        boxItemsGrid.querySelectorAll('.btn-plus').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            if (totalMeals < plan.maxRefeicoes) {
              boxQuantities[id]++;
              renderBoxBuilder();
            }
          });
        });
      }

      // 4. Renderizar Grade de Lanches de Oferta
      if (giftItemsGrid) {
        giftItemsGrid.innerHTML = '';
        const maxGifts = plan.maxOfertas;
        giftSnacks.forEach(item => {
          const giftQty = giftQuantities[item.id] || 0;
          const canAddGift = totalGifts < maxGifts;

          const giftCard = document.createElement('div');
          giftCard.className = `gift-item-card ${giftQty > 0 ? 'has-qty' : ''}`;
          giftCard.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="gift-item-img">
            <div class="box-item-info">
              <div class="box-item-name" style="font-size: 0.9rem;" title="${item.name}">${item.name}</div>
              <div class="box-item-meta" style="font-size: 0.75rem;">
                <span style="color: #b45309; font-weight: 700;">🎁 0,00 € (Grátis)</span>
                <span>•</span>
                <span>${item.kcal} kcal</span>
              </div>
              <div class="box-item-origin" style="font-size: 0.72rem;">📍 ${item.origin}</div>
            </div>
            <div class="box-item-qty">
              <button type="button" class="qty-btn btn-gift-minus" data-id="${item.id}" ${giftQty === 0 ? 'disabled' : ''} aria-label="Remover 1 oferta">-</button>
              <span class="qty-value" style="color: #b45309;">${giftQty}</span>
              <button type="button" class="qty-btn btn-gift-plus" data-id="${item.id}" ${!canAddGift ? 'disabled' : ''} aria-label="Adicionar 1 oferta">+</button>
            </div>
          `;
          giftItemsGrid.appendChild(giftCard);
        });

        // Eventos dos botões de oferta
        giftItemsGrid.querySelectorAll('.btn-gift-minus').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            if (giftQuantities[id] > 0) {
              giftQuantities[id]--;
              renderBoxBuilder();
            }
          });
        });

        giftItemsGrid.querySelectorAll('.btn-gift-plus').forEach(btn => {
          btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const currentMax = (planosData[selectPlano.value] || planosData.casal).maxOfertas;
            if (getTotalGiftSnacksCount() < currentMax) {
              giftQuantities[id]++;
              renderBoxBuilder();
            }
          });
        });
      }

      // 5. Renderizar tags de resumo dos itens selecionados
      if (boxSelectionTags) {
        const selectedMeals = catalogItems.filter(it => (boxQuantities[it.id] || 0) > 0);
        const selectedGifts = giftSnacks.filter(it => (giftQuantities[it.id] || 0) > 0);

        if (selectedMeals.length === 0 && selectedGifts.length === 0) {
          boxSelectionTags.innerHTML = `
            <span style="font-size: 0.88rem; color: var(--color-text-muted); font-style: italic;">
              Nenhum item selecionado ainda. Clique no [ + ] acima ou no botão "Sugestão do Chef"!
            </span>
          `;
        } else {
          let html = selectedMeals.map(it => `
            <span class="box-selection-tag">
              <strong>${boxQuantities[it.id]}x</strong> ${it.name}
            </span>
          `).join('');

          if (selectedGifts.length > 0) {
            html += selectedGifts.map(it => `
              <span class="box-selection-tag" style="background-color: #fef3c7; color: #92400e; border-color: #fcd34d;">
                <strong>🎁 ${giftQuantities[it.id]}x (Oferta)</strong> ${it.name}
              </span>
            `).join('');
          }

          boxSelectionTags.innerHTML = html;
        }
      }
    }

    // Filtros de abas na grade da caixa
    boxFilterTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        boxFilterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentBoxFilter = this.getAttribute('data-box-filter');
        renderBoxBuilder();
      });
    });

    if (btnChefSuggest) {
      btnChefSuggest.addEventListener('click', fillChefSuggestion);
    }
    if (btnClearBox) {
      btnClearBox.addEventListener('click', clearBoxSelection);
    }
    if (closeBoxNotice && boxNoticeBanner) {
      closeBoxNotice.addEventListener('click', function () {
        boxNoticeBanner.style.display = 'none';
      });
    }

    // ------------------------------------------------------------------------
    // SELEÇÃO INTERATIVA DE PLANOS (CARTÕES VISUAIS + SELECT)
    // ------------------------------------------------------------------------
    const planCards = document.querySelectorAll('.checkout-plan-card');

    function selectPlan(planKey, keepQuantities) {
      if (!planKey || !planosData[planKey]) return;

      // Sincronizar select escondido
      if (selectPlano) {
        selectPlano.value = planKey;
      }

      // Atualizar classe visual dos cartões de plano
      planCards.forEach(card => {
        if (card.getAttribute('data-plan') === planKey) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      // Atualizar valores de preço, meta de refeições e ofertas
      updateCartValues(planKey);

      // Ajustar automaticamente a caixa para evitar inconsistências (ex: 10 pratos num plano de 5)
      if (!keepQuantities) {
        fillChefSuggestion();
      } else {
        renderBoxBuilder();
      }
    }

    planCards.forEach(card => {
      card.addEventListener('click', function () {
        const planKey = this.getAttribute('data-plan');
        selectPlan(planKey, false);
      });
    });

    if (selectPlano) {
      selectPlano.addEventListener('change', function () {
        selectPlan(this.value, false);
      });
    }

    // ------------------------------------------------------------------------
    // MÉTODOS DE PAGAMENTO & CAMPOS ENCRIPTADOS
    // ------------------------------------------------------------------------
    paymentMethodCards.forEach(function (card) {
      card.addEventListener('click', function () {
        paymentMethodCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        renderPaymentFields();
      });
    });

    function getSelectedPaymentMethod() {
      const checked = document.querySelector('input[name="paymentMethod"]:checked');
      return checked ? checked.value : 'mbway';
    }

    function renderPaymentFields() {
      if (!paymentFieldsContainer) return;
      const method = getSelectedPaymentMethod();
      const plano = planosData[selectPlano.value] || planosData.casal;
      const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';
      const clienteTel = document.getElementById('clienteTelefone');
      const telValue = clienteTel ? clienteTel.value.trim() : '';

      if (method === 'card') {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: #ffffff; border: 2px solid var(--color-primary); border-radius: var(--radius-md); padding: 22px; box-shadow: var(--shadow-sm);">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <span>💳</span> Dados do Cartão de Pagamento (${totalStr})
            </h4>
            <div class="form-group">
              <label for="cartaoNumero" style="font-weight: 600;">Número do Cartão *</label>
              <input type="text" id="cartaoNumero" class="form-control" placeholder="4000 1234 5678 9010" maxlength="19" required>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="cartaoNome" style="font-weight: 600;">Nome Impresso no Cartão *</label>
                <input type="text" id="cartaoNome" class="form-control" placeholder="Como consta no cartão" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label for="cartaoValidade" style="font-weight: 600;">Validade *</label>
                  <input type="text" id="cartaoValidade" class="form-control" placeholder="MM/AA" maxlength="5" required>
                </div>
                <div class="form-group">
                  <label for="cartaoCvv" style="font-weight: 600;">CVV *</label>
                  <input type="text" id="cartaoCvv" class="form-control" placeholder="123" maxlength="4" required>
                </div>
              </div>
            </div>
            <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block; margin-top: 6px;">
              🔒 Transação cifrada por protocolo SSL de 256 bits. Faturação automática semanal com cancelamento livre a qualquer momento.
            </span>
          </div>
        `;
      } else if (method === 'mbway') {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: var(--color-primary-soft); border: 1px solid rgba(45, 90, 39, 0.2); border-radius: var(--radius-md); padding: 20px;">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span>📱</span> Confirmação MB WAY (${totalStr})
            </h4>
            <p style="font-size: 0.92rem; color: var(--color-text-main); margin-bottom: 8px; line-height: 1.5;">
              Ao clicar no botão de confirmação, enviaremos o pedido de pagamento de <strong>${totalStr}</strong> para o telemóvel <strong>${telValue || '(indicado na morada)'}</strong>.
            </p>
            <small style="font-size: 0.82rem; color: #166534; font-weight: 600; display: block;">
              ⚡ Terá 5 minutos para validar o pedido na sua aplicação MB WAY.
            </small>
          </div>
        `;
      } else {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px;">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span>🏦</span> Emissão de Referência Multibanco (${totalStr})
            </h4>
            <p style="font-size: 0.92rem; color: var(--color-text-main); margin-bottom: 6px; line-height: 1.5;">
              A Entidade e Referência Multibanco no valor de <strong>${totalStr}</strong> serão geradas no ecrã seguinte e enviadas por SMS e e-mail.
            </p>
            <small style="font-size: 0.82rem; color: var(--color-text-muted); display: block;">
              ⏳ Prazo de liquidação: 24 horas em qualquer terminal Multibanco ou Homebanking.
            </small>
          </div>
        `;
      }
    }

    // ------------------------------------------------------------------------
    // ATUALIZAÇÃO DO RESUMO CONSOLIDADO NA ETAPA 4 (ORDER REVIEW)
    // ------------------------------------------------------------------------
    function updateOrderReview() {
      const plano = planosData[selectPlano.value] || planosData.casal;
      const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';

      const reviewPlanName = document.getElementById('reviewPlanName');
      if (reviewPlanName) {
        reviewPlanName.innerHTML = `<strong>${plano.nome}</strong> • ${totalStr}/sem.`;
      }

      const reviewAddress = document.getElementById('reviewAddress');
      const rua = document.getElementById('entregaRua') ? document.getElementById('entregaRua').value : '';
      const andar = document.getElementById('entregaAndar') ? document.getElementById('entregaAndar').value : '';
      const concelho = document.getElementById('entregaConcelho') ? document.getElementById('entregaConcelho').value : 'porto';
      const concelhoLabel = concelho.charAt(0).toUpperCase() + concelho.slice(1);
      const codPostal = document.getElementById('entregaCodPostal') ? document.getElementById('entregaCodPostal').value : '';

      if (reviewAddress) {
        let addrStr = rua;
        if (andar) addrStr += ` (${andar})`;
        if (codPostal) addrStr += `, ${codPostal}`;
        addrStr += ` - Porto`;
        reviewAddress.textContent = addrStr || 'Porto';
      }

      const reviewDeliveryWindow = document.getElementById('reviewDeliveryWindow');
      const entregaJanelaSelect = document.getElementById('entregaJanela');
      const janelaText = entregaJanelaSelect ? entregaJanelaSelect.options[entregaJanelaSelect.selectedIndex].text : '';
      if (reviewDeliveryWindow) {
        reviewDeliveryWindow.textContent = `🚚 1ª Entrega: ${estimatedDeliveryDateStr} • ${janelaText}`;
      }

      const reviewFinalTotal = document.getElementById('reviewFinalTotal');
      if (reviewFinalTotal) {
        reviewFinalTotal.textContent = totalStr;
      }
      const btnSubmitTotalDisplay = document.getElementById('btnSubmitTotalDisplay');
      if (btnSubmitTotalDisplay) {
        btnSubmitTotalDisplay.textContent = totalStr;
      }

      const reviewDishesList = document.getElementById('reviewDishesList');
      if (reviewDishesList) {
        const selectedMeals = catalogItems.filter(it => (boxQuantities[it.id] || 0) > 0);
        const selectedGifts = giftSnacks.filter(it => (giftQuantities[it.id] || 0) > 0);

        let html = selectedMeals.map(it => `
          <li>
            <span><strong>${boxQuantities[it.id]}x</strong> ${it.name}</span>
            <span style="color: var(--color-primary); font-size: 0.8rem; font-weight: 600;">${it.kcal} kcal</span>
          </li>
        `).join('');

        if (selectedGifts.length > 0) {
          html += selectedGifts.map(it => `
            <li style="color: #92400e; font-weight: 600;">
              <span>🎁 <strong>${giftQuantities[it.id]}x</strong> ${it.name} (Oferta)</span>
              <span style="color: #2e7d32; font-weight: 700;">Grátis</span>
            </li>
          `).join('');
        }
        reviewDishesList.innerHTML = html;
      }
    }

    // ------------------------------------------------------------------------
    // NAVEGAÇÃO ENTRE ETAPAS (WIZARD DE 4 PASSOS + SUCESSO)
    // ------------------------------------------------------------------------
    function canGoToStep(targetStep) {
      if (targetStep <= currentStep) return true; // Sempre permitido retroceder livremente

      // Passo 1 -> 2
      if (targetStep === 2) return true;

      // Passo 2 -> 3 (Exige caixa completa de refeições e ofertas)
      if (targetStep === 3) {
        const plan = planosData[selectPlano.value] || planosData.casal;
        const totalMeals = getTotalMealsCount();
        const totalGifts = getTotalGiftSnacksCount();
        const mealsMissing = plan.maxRefeicoes - totalMeals;
        const giftsMissing = plan.maxOfertas - totalGifts;

        if (mealsMissing > 0 || giftsMissing > 0) {
          let msg = 'A sua caixa semanal ainda tem vagas por preencher:';
          if (mealsMissing > 0) msg += `\n• Faltam ${mealsMissing} refeição(ões) / prato(s) da subscrição.`;
          if (giftsMissing > 0) msg += `\n• Faltam ${giftsMissing} lanche(s) de oferta gratuita (0,00 €).`;
          msg += '\n\nDeseja preencher automaticamente com a nossa Sugestão do Chef para avançar para a morada?';
          if (window.confirm(msg)) {
            fillChefSuggestion();
            return true;
          }
          return false;
        }
        return true;
      }

      // Passo 3 -> 4 (Exige dados da morada válidos)
      if (targetStep === 4) {
        if (!canGoToStep(3)) return false;
        if (step3AddressForm && !step3AddressForm.checkValidity()) {
          step3AddressForm.reportValidity();
          return false;
        }
        return true;
      }

      return true;
    }

    function setStepActive(stepNum) {
      currentStep = stepNum;

      // Alternar visualização dos cartões das etapas
      const allSteps = [checkoutStep1, checkoutStep2, checkoutStep3, checkoutStep4, checkoutStep5];
      allSteps.forEach((stepEl, idx) => {
        if (stepEl) {
          stepEl.style.display = (idx + 1 === stepNum) ? 'block' : 'none';
        }
      });

      // Atualizar abas de progresso superiores (1 a 4)
      const tabs = [stepTab1, stepTab2, stepTab3, stepTab4];
      tabs.forEach((tab, idx) => {
        if (!tab) return;
        const tabNum = idx + 1;
        tab.classList.remove('active', 'completed');
        if (tabNum < stepNum) {
          tab.classList.add('completed');
        } else if (tabNum === stepNum) {
          tab.classList.add('active');
        }
      });

      // No ecrã de confirmação 5, marcar todos os 4 passos como concluídos
      if (stepNum === 5) {
        tabs.forEach(tab => { if (tab) tab.classList.add('completed'); });
      }

      // Se entrou no Passo 4, atualizar resumo da encomenda e campos de pagamento
      if (stepNum === 4) {
        updateOrderReview();
        renderPaymentFields();
      }

      // Scroll suave até ao topo do cartão ativo
      const targetCard = document.getElementById(`checkoutStep${stepNum}`);
      if (targetCard) {
        window.scrollTo({ top: targetCard.offsetTop - 90, behavior: 'smooth' });
      }
    }

    // Expor globalmente para suporte a chamadas diretas
    window.setStepActive = setStepActive;

    // Navegação ao clicar diretamente nas abas de progresso do topo
    const tabsList = [
      { tab: stepTab1, step: 1 },
      { tab: stepTab2, step: 2 },
      { tab: stepTab3, step: 3 },
      { tab: stepTab4, step: 4 }
    ];

    tabsList.forEach(item => {
      if (item.tab) {
        item.tab.addEventListener('click', function () {
          if (canGoToStep(item.step)) {
            setStepActive(item.step);
          }
        });
        item.tab.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (canGoToStep(item.step)) {
              setStepActive(item.step);
            }
          }
        });
      }
    });

    // Botão Etapa 1 -> Etapa 2
    if (btnGoToStep2) {
      btnGoToStep2.addEventListener('click', function () {
        setStepActive(2);
      });
    }

    // Botões Etapa 2
    if (btnBackToStep1) {
      btnBackToStep1.addEventListener('click', function () {
        setStepActive(1);
      });
    }
    if (btnGoToStep3) {
      btnGoToStep3.addEventListener('click', function () {
        if (canGoToStep(3)) {
          setStepActive(3);
        }
      });
    }

    // Botões Etapa 3
    if (btnBackToStep2) {
      btnBackToStep2.addEventListener('click', function () {
        setStepActive(2);
      });
    }
    if (step3AddressForm) {
      step3AddressForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (canGoToStep(4)) {
          setStepActive(4);
        }
      });
    }

    // Botão Voltar da Etapa 4 para Etapa 3
    if (btnBackToStep3) {
      btnBackToStep3.addEventListener('click', function () {
        setStepActive(3);
      });
    }

    // Alternar modo de login / registo
    const toggleLoginMode = document.getElementById('toggleLoginMode');
    let isLoginMode = false;
    if (toggleLoginMode) {
      toggleLoginMode.addEventListener('click', function () {
        isLoginMode = !isLoginMode;
        const clientePasswordLabel = document.querySelector('label[for="clientePassword"]');
        if (isLoginMode) {
          toggleLoginMode.innerText = 'Primeira encomenda? Criar Conta Nova';
          if (clientePasswordLabel) clientePasswordLabel.innerText = 'A Sua Palavra-passe *';
        } else {
          toggleLoginMode.innerText = 'Já é cliente? Iniciar Sessão';
          if (clientePasswordLabel) clientePasswordLabel.innerText = 'Criar Palavra-passe de Acesso *';
        }
      });
    }

    // Submissão Final do Checkout (Etapa 4 -> Etapa 5 Confirmação)
    if (checkoutFinalForm) {
      checkoutFinalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const rgpdConsent = document.getElementById('rgpdCheckoutConsent');
        if (rgpdConsent && !rgpdConsent.checked) {
          alert('Por favor, aceite a Política de Privacidade & RGPD para confirmar o seu pedido.');
          rgpdConsent.focus();
          return;
        }

        const method = getSelectedPaymentMethod();
        if (method === 'card') {
          const num = document.getElementById('cartaoNumero');
          const nome = document.getElementById('cartaoNome');
          const val = document.getElementById('cartaoValidade');
          const cvv = document.getElementById('cartaoCvv');
          if (!num || !num.value.trim() || !nome || !nome.value.trim() || !val || !val.value.trim() || !cvv || !cvv.value.trim()) {
            alert('Por favor, preencha todos os campos do cartão de crédito/débito.');
            return;
          }
        }

        const plano = planosData[selectPlano.value] || planosData.casal;
        const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';
        const methodLabels = {
          mbway: 'MB WAY',
          card: 'Cartão de Débito/Crédito',
          multibanco: 'Referência Multibanco'
        };

        const rua = document.getElementById('entregaRua') ? document.getElementById('entregaRua').value : '';
        const concelho = document.getElementById('entregaConcelho') ? document.getElementById('entregaConcelho').value : 'porto';
        const concelhoLabel = concelho.charAt(0).toUpperCase() + concelho.slice(1);

        // Preencher ecrã de confirmação
        const confOrderCode = document.getElementById('confOrderCode');
        if (confOrderCode) confOrderCode.innerText = Math.floor(1000 + Math.random() * 9000);

        const confPlanName = document.getElementById('confPlanName');
        if (confPlanName) confPlanName.innerText = plano.nome;

        const confPlanPrice = document.getElementById('confPlanPrice');
        if (confPlanPrice) confPlanPrice.innerText = totalStr;

        const confPayMethod = document.getElementById('confPayMethod');
        if (confPayMethod) confPayMethod.innerText = methodLabels[method] || 'MB WAY';

        const confAddress = document.getElementById('confAddress');
        if (confAddress) confAddress.innerText = rua ? (rua + ', Porto') : 'Porto';

        const entregaJanelaSelect = document.getElementById('entregaJanela');
        const janelaText = entregaJanelaSelect ? entregaJanelaSelect.options[entregaJanelaSelect.selectedIndex].text : '';
        const confDeliveryDate = document.getElementById('confDeliveryDate');
        if (confDeliveryDate) {
          confDeliveryDate.textContent = `${estimatedDeliveryDateStr} • ${janelaText}`;
        }

        // Preencher a lista de refeições da subscrição confirmadas
        const confMealsList = document.getElementById('confMealsList');
        if (confMealsList) {
          const selectedList = catalogItems.filter(it => (boxQuantities[it.id] || 0) > 0);
          confMealsList.innerHTML = selectedList.map(it => `
            <li>
              <span><strong>${boxQuantities[it.id]}x</strong> ${it.name} <em style="font-size:0.8rem; color:var(--color-text-muted);">(${it.kcal} kcal)</em></span>
              <span style="color:var(--color-primary); font-size:0.85rem; font-weight:600;">${it.origin.split(' ')[0]} ${it.origin.split(' ')[1] || ''}</span>
            </li>
          `).join('');
        }

        // Preencher a lista de lanches de oferta gratuita confirmados
        const confGiftList = document.getElementById('confGiftList');
        if (confGiftList) {
          const selectedGifts = giftSnacks.filter(it => (giftQuantities[it.id] || 0) > 0);
          confGiftList.innerHTML = selectedGifts.map(it => `
            <li style="color: #92400e; background: #fffdf5; padding: 6px 8px; border-radius: 4px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span><strong>🎁 ${giftQuantities[it.id]}x (Oferta Grátis)</strong> ${it.name}</span>
              <span style="font-weight: 700; color: #b45309;">0,00 €</span>
            </li>
          `).join('');
        }

        // Exibir ecrã de sucesso (Etapa 5)
        setStepActive(5);
      });
    }

    // ------------------------------------------------------------------------
    // INICIALIZAÇÃO DO CARRINHO (PARÂMETROS DE URL OU PLANO PADRÃO)
    // ------------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const planoParam = urlParams.get('plano');
    const itemParam = urlParams.get('item');

    let initialPlan = 'casal';
    if (planoParam && planosData[planoParam]) {
      initialPlan = planoParam;
    }

    if (itemParam && boxQuantities.hasOwnProperty(itemParam)) {
      selectPlan(initialPlan, true);
      boxQuantities[itemParam] = 1;
      const targetItem = catalogItems.find(it => it.id === itemParam);
      if (boxNoticeBanner && boxNoticeText && targetItem) {
        boxNoticeText.innerText = `Adicionámos 1x "${targetItem.name}" à sua caixa! Selecione as restantes refeições para completar o seu plano.`;
        boxNoticeBanner.style.display = 'flex';
      }
      renderBoxBuilder();
      setStepActive(2); // Avança diretamente para a caixa para o cliente continuar a personalização
    } else {
      selectPlan(initialPlan, false);
      setStepActive(1);
    }
  }

  // ------------------------------------------------------------------------
  // 5. FILTROS DE CATEGORIA DO MENU (BENCHMARK THE REVOLUTION FOOD)
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const mealCards = document.querySelectorAll('.meal-card[data-category]');

  if (filterButtons.length > 0 && mealCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Atualizar classe ativa no botão
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const selectedFilter = this.getAttribute('data-filter');

        // Filtrar os pratos e lanches com animação suave
        mealCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
          if (selectedFilter === 'all' || cardCategory === selectedFilter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. BOTÃO VOLTAR AO TOPO (SCROLL TO TOP COM ROLAGEM SUAVE)
  // ------------------------------------------------------------------------
  let backToTopBtn = document.getElementById('backToTopBtn');

  // Criar dinamicamente caso não exista no HTML
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('type', 'button');
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo da página');
    backToTopBtn.setAttribute('title', 'Voltar ao topo');
    backToTopBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  // Mostrar botão apenas ao rolar a página para baixo (> 350px)
  window.addEventListener('scroll', function () {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  // Ao clicar, sobe suavemente até o topo da página
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ========================================================================
  // BANNER DE GESTÃO DE COOKIES & RGPD (CONFORMIDADE COM A CNPD)
  // ========================================================================
  const cookieConsentKey = 'biomarmita_cookie_consent';
  let hasConsented = false;
  try {
    hasConsented = localStorage.getItem(cookieConsentKey);
  } catch (e) {
    hasConsented = false;
  }

  if (!hasConsented) {
    document.body.classList.add('has-cookie-banner');
    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookieConsentBanner';
    cookieBanner.className = 'cookie-banner-container';
    cookieBanner.setAttribute('role', 'region');
    cookieBanner.setAttribute('aria-label', 'Gestão de Cookies e Privacidade');
    cookieBanner.innerHTML = `
      <div class="cookie-banner-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.25rem;" aria-hidden="true">🍪</span>
          <h4>Privacidade &amp; Cookies</h4>
        </div>
        <button type="button" id="btnCloseCookieBanner" class="cookie-banner-close" aria-label="Fechar aviso">&times;</button>
      </div>
      <p class="cookie-banner-text">
        Utilizamos cookies essenciais e analíticos para o funcionamento do carrinho e melhor experiência de navegação (RGPD). <a href="privacidade.html#cookies">Saber mais</a>
      </p>
      <div class="cookie-banner-actions">
        <button type="button" id="btnAcceptAllCookies" class="cookie-btn-primary">Aceitar Todos</button>
        <button type="button" id="btnEssentialCookies" class="cookie-btn-outline">Apenas Essenciais</button>
      </div>
    `;
    document.body.appendChild(cookieBanner);

    function dismissCookieBanner(consentType) {
      try {
        localStorage.setItem(cookieConsentKey, consentType);
      } catch (e) {
        // Fallback caso localStorage esteja bloqueado no browser
      }
      document.body.classList.remove('has-cookie-banner');
      cookieBanner.classList.add('hide-banner');
      setTimeout(function () {
        if (cookieBanner.parentNode) {
          cookieBanner.parentNode.removeChild(cookieBanner);
        }
      }, 350);
    }

    const btnAccept = document.getElementById('btnAcceptAllCookies');
    const btnEssential = document.getElementById('btnEssentialCookies');
    const btnClose = document.getElementById('btnCloseCookieBanner');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        dismissCookieBanner('all');
      });
    }

    if (btnEssential) {
      btnEssential.addEventListener('click', function () {
        dismissCookieBanner('essential');
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', function () {
        dismissCookieBanner('essential');
      });
    }
  }

  // ------------------------------------------------------------------------
  // CARROSSEL DE PRATOS REAIS NA PÁGINA INICIAL (HERO DISH CAROUSEL)
  // ------------------------------------------------------------------------
  const heroCarousel = document.getElementById('heroDishCarousel');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('.hero-carousel-slide');
    const dots = heroCarousel.querySelectorAll('.hero-carousel-dot');
    const prevBtn = document.getElementById('heroCarouselPrev');
    const nextBtn = document.getElementById('heroCarouselNext');
    let currentIndex = 0;
    let autoPlayTimer = null;
    const intervalMs = 5000;

    function showSlide(index) {
      if (!slides.length) return;
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      slides.forEach(function (slide, idx) {
        if (idx === currentIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach(function (dot, idx) {
        if (idx === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, intervalMs);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        startAutoPlay();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(targetIndex)) {
          showSlide(targetIndex);
          startAutoPlay();
        }
      });
    });

    // Pausar na passagem do cursor e retomar ao sair
    heroCarousel.addEventListener('mouseenter', stopAutoPlay);
    heroCarousel.addEventListener('mouseleave', startAutoPlay);

    // Navegação acessível por teclado
    heroCarousel.setAttribute('tabindex', '0');
    heroCarousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        startAutoPlay();
      }
    });

    // Suporte a gestos touch (swipe) em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    heroCarousel.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    heroCarousel.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          startAutoPlay();
        }
      }
    }, { passive: true });

    // Iniciar no primeiro slide e ativar o autoplay
    showSlide(0);
    startAutoPlay();
  }

  /* --------------------------------------------------------------------------
     14. Carrossel Minimalista do Menu Semanal (Página Inicial)
     -------------------------------------------------------------------------- */
  const weeklyViewport = document.getElementById('weeklyCarouselViewport');
  const weeklyPrevBtn = document.getElementById('weeklyPrevBtn');
  const weeklyNextBtn = document.getElementById('weeklyNextBtn');
  const weeklyDotsContainer = document.getElementById('weeklyCarouselDots');

  if (weeklyViewport) {
    const weeklyCards = weeklyViewport.querySelectorAll('.weekly-dish-card');
    const totalCards = weeklyCards.length;
    let maxStops = 1;
    let dots = [];

    function getCardWidth() {
      if (weeklyCards.length === 0) return 320;
      const card = weeklyCards[0];
      const track = weeklyViewport.querySelector('.weekly-carousel-track');
      let gap = 24;
      if (track) {
        const style = window.getComputedStyle(track);
        gap = parseFloat(style.gap) || 24;
      }
      return card.getBoundingClientRect().width + gap;
    }

    function calculateMaxStops() {
      if (totalCards === 0) return 1;
      const cardWidth = getCardWidth();
      const clientWidth = weeklyViewport.clientWidth;
      const visibleCards = Math.max(1, Math.round((clientWidth + 24) / cardWidth));
      return Math.max(1, totalCards - visibleCards + 1);
    }

    function buildDots() {
      if (!weeklyDotsContainer) return;
      maxStops = calculateMaxStops();
      weeklyDotsContainer.innerHTML = '';
      dots = [];

      for (let i = 0; i < maxStops; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'weekly-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ver prato ' + (i + 1) + ' de ' + maxStops);
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          scrollToSlide(i);
        });
        weeklyDotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function updateActiveDot(activeIndex) {
      if (activeIndex < 0) activeIndex = 0;
      if (activeIndex >= maxStops) activeIndex = maxStops - 1;
      dots.forEach(function (dot, idx) {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function scrollToSlide(slideIndex) {
      if (slideIndex < 0) slideIndex = 0;
      if (slideIndex >= maxStops) slideIndex = maxStops - 1;
      const maxScroll = weeklyViewport.scrollWidth - weeklyViewport.clientWidth;
      const card = weeklyCards[slideIndex];
      if (card) {
        let targetLeft = card.offsetLeft - weeklyViewport.offsetLeft;
        if (slideIndex === maxStops - 1 || targetLeft > maxScroll) {
          targetLeft = maxScroll;
        }
        weeklyViewport.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });
        updateActiveDot(slideIndex);
      }
    }

    if (weeklyPrevBtn) {
      weeklyPrevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const maxScroll = weeklyViewport.scrollWidth - weeklyViewport.clientWidth;
        // Se estiver no início (<= 15px), dá a volta para o fim
        if (weeklyViewport.scrollLeft <= 15) {
          weeklyViewport.scrollTo({
            left: maxScroll,
            behavior: 'smooth'
          });
          updateActiveDot(maxStops - 1);
        } else {
          const cardWidth = getCardWidth();
          weeklyViewport.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
          });
        }
      });
    }

    if (weeklyNextBtn) {
      weeklyNextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const maxScroll = weeklyViewport.scrollWidth - weeklyViewport.clientWidth;
        // Se estiver no fim (>= maxScroll - 15px), dá a volta para o início
        if (weeklyViewport.scrollLeft >= maxScroll - 15) {
          weeklyViewport.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
          updateActiveDot(0);
        } else {
          const cardWidth = getCardWidth();
          weeklyViewport.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
          });
        }
      });
    }

    // Atualizar os dots durante o scroll com debounce
    let scrollDebounce;
    weeklyViewport.addEventListener('scroll', function () {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(function () {
        const scrollLeft = weeklyViewport.scrollLeft;
        const maxScroll = weeklyViewport.scrollWidth - weeklyViewport.clientWidth;

        if (scrollLeft <= 15) {
          updateActiveDot(0);
          return;
        }
        if (scrollLeft >= maxScroll - 15) {
          updateActiveDot(maxStops - 1);
          return;
        }

        const cardWidth = getCardWidth();
        const closestIndex = Math.min(maxStops - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
        updateActiveDot(closestIndex);
      }, 50);
    }, { passive: true });

    // Recalcular os dots ao redimensionar o ecrã
    let resizeDebounce;
    window.addEventListener('resize', function () {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(function () {
        const oldMaxStops = maxStops;
        const newMaxStops = calculateMaxStops();
        if (oldMaxStops !== newMaxStops) {
          buildDots();
          const scrollLeft = weeklyViewport.scrollLeft;
          const cardWidth = getCardWidth();
          const closestIndex = Math.min(newMaxStops - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
          updateActiveDot(closestIndex);
        }
      }, 100);
    });

    // Inicializar os dots com a contagem exata de slides
    buildDots();
  }

  // ========================================================================
  // 15. AUTO-INICIALIZAÇÃO DE CARROSSEIS MÓVEIS (SWIPE CAROUSELS)
  // Transforma grelhas de cartões em carrosséis fluidos com dots sincronizados
  // ========================================================================
  function initMobileCarousels() {
    const carouselSelectors = [
      '.steps-visual-grid',
      '#porque-escolher .features-grid-4',
      '.plans-grid',
      '.checkout-plans-grid',
      '.nutrition-grid',
      '.producers-grid',
      '.producers-grid-2',
      '.recycling-steps-grid',
      '.cert-detailed-grid',
      '.strategic-grid',
      '.blog-grid',
      '.mobile-carousel-container'
    ];

    carouselSelectors.forEach(function (selector) {
      const containers = document.querySelectorAll(selector);
      containers.forEach(function (container) {
        if (!container) return;

        const items = Array.from(container.children).filter(function (el) {
          return el.nodeType === 1 && !el.classList.contains('mobile-carousel-dots');
        });
        if (items.length <= 1) return;

        // Identificador limpo para o data-attribute
        const idKey = selector.replace(/[^a-zA-Z0-9_-]/g, '_');
        let dotsContainer = container.parentNode.querySelector('.mobile-carousel-dots[data-carousel="' + idKey + '"]');
        if (!dotsContainer) {
          dotsContainer = document.createElement('div');
          dotsContainer.className = 'mobile-carousel-dots';
          dotsContainer.setAttribute('data-carousel', idKey);
          dotsContainer.setAttribute('aria-label', 'Navegação de cartões');

          items.forEach(function (_, idx) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'mobile-dot' + (idx === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Ir para o cartão ' + (idx + 1));
            dot.addEventListener('click', function () {
              const targetItem = items[idx];
              if (targetItem) {
                const targetLeft = targetItem.offsetLeft - container.offsetLeft - 16;
                container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
              }
            });
            dotsContainer.appendChild(dot);
          });

          // Inserir logo após o container
          if (container.nextElementSibling) {
            container.parentNode.insertBefore(dotsContainer, container.nextElementSibling);
          } else {
            container.parentNode.appendChild(dotsContainer);
          }
        }

        // Sincronizar active dot ao deslizar
        let scrollDebounce;
        container.addEventListener('scroll', function () {
          clearTimeout(scrollDebounce);
          scrollDebounce = setTimeout(function () {
            const scrollLeft = container.scrollLeft;
            const containerCenter = scrollLeft + container.clientWidth / 2;
            let closestIndex = 0;
            let minDiff = Infinity;

            items.forEach(function (item, idx) {
              const itemCenter = item.offsetLeft - container.offsetLeft + item.offsetWidth / 2;
              const diff = Math.abs(containerCenter - itemCenter);
              if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
              }
            });

            const dots = dotsContainer.querySelectorAll('.mobile-dot');
            dots.forEach(function (d, i) {
              if (i === closestIndex) {
                d.classList.add('active');
              } else {
                d.classList.remove('active');
              }
            });
          }, 40);
        }, { passive: true });
      });
    });
  }

  // Inicializar carrosséis móveis
  initMobileCarousels();
});
