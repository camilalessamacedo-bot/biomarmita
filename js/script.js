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

  if (checkoutStep1 && checkoutStep2 && checkoutStep3) {
    const stepTab1 = document.getElementById('stepTab1');
    const stepTab2 = document.getElementById('stepTab2');
    const stepTab3 = document.getElementById('stepTab3');

    const selectPlano = document.getElementById('selectPlano');
    const cartPlanTitle = document.getElementById('cartPlanTitle');
    const cartPlanPrice = document.getElementById('cartPlanPrice');
    const cartDiscount = document.getElementById('cartDiscount');
    const cartFinalTotal = document.getElementById('cartFinalTotal');
    const paymentExplainBox = document.getElementById('paymentExplainBox');

    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    const btnGoToStep2 = document.getElementById('btnGoToStep2');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');
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

    const step2DeliveryDate = document.getElementById('step2DeliveryDate');
    if (step2DeliveryDate) {
      step2DeliveryDate.textContent = estimatedDeliveryDateStr;
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
        origin: 'Quinta da Serra (Paredes)',
        img: './assets/imagens/prato-peru-espinafres.jpeg'
      },
      {
        id: 'bacalhau',
        name: 'Lombo de Bacalhau com Grão',
        category: 'refeicao',
        typeLabel: 'Peixe Sustentável',
        kcal: 490,
        origin: 'Horta do Vale (Vila do Conde)',
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
        origin: 'Quinta da Serra (Paredes)',
        img: './assets/imagens/menu-tradicional.jpeg'
      },
      {
        id: 'salmao',
        name: 'Salmão Fresco & Quinoa Real',
        category: 'refeicao',
        typeLabel: 'Peixe Sustentável',
        kcal: 510,
        origin: 'Horta do Vale (Vila do Conde)',
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

    // Os 4 Lanches Biológicos disponíveis para os 2 Brindes de Oferta
    const giftSnacks = catalogItems.filter(item => item.category === 'lanche');

    // Estado da Seleção:
    // boxQuantities: armazena a quantidade de qualquer um dos 10 itens para a caixa
    const boxQuantities = {};
    catalogItems.forEach(item => { boxQuantities[item.id] = 0; });

    // giftQuantities: armazena os 2 lanches de brinde gratuito
    const giftQuantities = {};
    giftSnacks.forEach(item => { giftQuantities[item.id] = 0; });

    // Dados dos Planos (Cada plano inclui a sua quota de refeições/itens + 🎁 2 Lanches Grátis)
    const planosData = {
      individual: {
        nome: 'Plano Individual (5 Refeições/Lanches + 🎁 2 Brindes)',
        precoBase: 39.90,
        desconto: 5.99,
        total: 33.91,
        maxRefeicoes: 5,
        maxBrindes: 2
      },
      casal: {
        nome: 'Plano Casal (10 Refeições/Lanches + 🎁 2 Brindes)',
        precoBase: 74.90,
        desconto: 11.24,
        total: 63.66,
        maxRefeicoes: 10,
        maxBrindes: 2
      },
      familia: {
        nome: 'Plano Família (15 Refeições/Lanches + 🎁 2 Brindes)',
        precoBase: 104.90,
        desconto: 15.74,
        total: 89.16,
        maxRefeicoes: 15,
        maxBrindes: 2
      }
    };

    // Contagem de todos os itens escolhidos para a caixa (pratos + lanches)
    function getTotalMealsCount() {
      return catalogItems.reduce((sum, item) => sum + (boxQuantities[item.id] || 0), 0);
    }

    // Contagem dos lanches de brinde (máximo 2)
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
      updatePaymentExplanation();
      renderBoxBuilder();
    }

    // Sugestão Automática Equilibrada do Chef (preenche a caixa e os 2 brindes)
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
        // 2 Brindes de Oferta
        giftQuantities['chia'] = 1;
        giftQuantities['tostas'] = 1;
      } else if (currentPlan === 'casal') {
        boxQuantities['peru'] = 2;
        boxQuantities['bacalhau'] = 2;
        boxQuantities['caril'] = 2;
        boxQuantities['frango'] = 2;
        boxQuantities['salmao'] = 2;
        // 2 Brindes de Oferta
        giftQuantities['chia'] = 1;
        giftQuantities['panquecas'] = 1;
      } else if (currentPlan === 'familia') {
        boxQuantities['peru'] = 3;
        boxQuantities['bacalhau'] = 3;
        boxQuantities['caril'] = 2;
        boxQuantities['frango'] = 3;
        boxQuantities['salmao'] = 2;
        boxQuantities['panquecas'] = 2; // lanche delicioso para crianças dentro da caixa!
        // 2 Brindes de Oferta
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

    // Renderizar e Atualizar o Construtor de Caixa e Brindes
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

      // 2. Atualizar progresso dos 2 lanches de brinde
      if (giftSnacksCountDisplay) giftSnacksCountDisplay.innerText = `${totalGifts} / 2`;
      const giftPercent = Math.min(100, Math.round((totalGifts / 2) * 100));
      if (giftProgressBar) giftProgressBar.style.width = `${giftPercent}%`;

      if (totalGifts >= 2) {
        if (giftStatusPill) {
          giftStatusPill.className = 'gift-status-pill success';
          giftStatusPill.innerText = '✓ 2 Lanches de Oferta Escolhidos!';
        }
      } else {
        const diffGifts = 2 - totalGifts;
        if (giftStatusPill) {
          giftStatusPill.className = 'gift-status-pill warning';
          giftStatusPill.innerText = `Escolha ${diffGifts} lanche${diffGifts > 1 ? 's' : ''} de brinde`;
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

      // 4. Renderizar Grade de Lanches de Brinde (4 opções para escolher 2 grátis)
      if (giftItemsGrid) {
        giftItemsGrid.innerHTML = '';
        giftSnacks.forEach(item => {
          const giftQty = giftQuantities[item.id] || 0;
          const canAddGift = totalGifts < 2;

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
              <button type="button" class="qty-btn btn-gift-minus" data-id="${item.id}" ${giftQty === 0 ? 'disabled' : ''} aria-label="Remover 1 brinde">-</button>
              <span class="qty-value" style="color: #b45309;">${giftQty}</span>
              <button type="button" class="qty-btn btn-gift-plus" data-id="${item.id}" ${!canAddGift ? 'disabled' : ''} aria-label="Adicionar 1 brinde">+</button>
            </div>
          `;
          giftItemsGrid.appendChild(giftCard);
        });

        // Eventos dos botões de brinde
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
            if (totalGifts < 2) {
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
                <strong>🎁 ${giftQuantities[it.id]}x (Brinde)</strong> ${it.name}
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

    // Leitura de parâmetros de URL (ex: ?plano=individual&item=peru)
    const urlParams = new URLSearchParams(window.location.search);
    const planoParam = urlParams.get('plano');
    const itemParam = urlParams.get('item');

    if (planoParam && planosData[planoParam]) {
      selectPlano.value = planoParam;
    }

    if (itemParam && boxQuantities.hasOwnProperty(itemParam)) {
      boxQuantities[itemParam] = 1;
      const targetItem = catalogItems.find(it => it.id === itemParam);
      if (boxNoticeBanner && boxNoticeText && targetItem) {
        boxNoticeText.innerText = `Adicionámos 1x "${targetItem.name}" à sua caixa! Selecione as restantes refeições para completar o seu plano.`;
        boxNoticeBanner.style.display = 'flex';
      }
    } else {
      // Se entrou no carrinho diretamente sem item específico, pré-preencher com a Sugestão do Chef para máxima comodidade
      fillChefSuggestion();
    }

    updateCartValues(selectPlano.value);

    selectPlano.addEventListener('change', function () {
      updateCartValues(this.value);
    });

    // Seleção visual da forma de pagamento no Passo 1
    paymentMethodCards.forEach(function (card) {
      card.addEventListener('click', function () {
        paymentMethodCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        updatePaymentExplanation();
      });
    });

    function getSelectedPaymentMethod() {
      const checked = document.querySelector('input[name="paymentMethod"]:checked');
      return checked ? checked.value : 'mbway';
    }

    function updatePaymentExplanation() {
      if (!paymentExplainBox) return;
      const method = getSelectedPaymentMethod();
      const plano = planosData[selectPlano.value] || planosData.casal;
      const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';

      if (method === 'mbway') {
        paymentExplainBox.innerHTML = `
          <strong style="color: var(--color-primary-dark); display: block; margin-bottom: 4px;">Método Selecionado: MB WAY</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">
            No próximo passo, solicitaremos o seu número de telemóvel para receber o pedido de autorização de <strong>${totalStr}</strong> diretamente na sua app MB WAY.
          </p>
        `;
      } else if (method === 'card') {
        paymentExplainBox.innerHTML = `
          <strong style="color: var(--color-primary-dark); display: block; margin-bottom: 4px;">Método Selecionado: Cartão de Crédito / Débito</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">
            No próximo passo, após o registo da conta e endereço, abrirão os campos encriptados para inserir os dados do seu cartão (Visa/Mastercard) com débito semanal de <strong>${totalStr}</strong>.
          </p>
        `;
      } else {
        paymentExplainBox.innerHTML = `
          <strong style="color: var(--color-primary-dark); display: block; margin-bottom: 4px;">Método Selecionado: Referência Multibanco</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">
            Após indicar o endereço de entrega no passo seguinte, geraremos a Entidade e Referência Multibanco de <strong>${totalStr}</strong> com prazo de liquidação de 24 horas.
          </p>
        `;
      }
    }

    // Avançar para o Passo 2 (Identificação e Entrega) com Validação Inteligente
    btnGoToStep2.addEventListener('click', function () {
      const plan = planosData[selectPlano.value] || planosData.casal;
      const totalMeals = getTotalMealsCount();
      const totalGifts = getTotalGiftSnacksCount();

      const mealsMissing = plan.maxRefeicoes - totalMeals;
      const giftsMissing = 2 - totalGifts;

      if (mealsMissing > 0 || giftsMissing > 0) {
        let msg = 'A sua caixa ainda tem vagas por preencher:';
        if (mealsMissing > 0) msg += `\n• Faltam ${mealsMissing} refeição(ões) / lanche(s) da subscrição.`;
        if (giftsMissing > 0) msg += `\n• Faltam ${giftsMissing} lanche(s) de brinde gratuito (0,00 €).`;
        msg += '\n\nDeseja preencher automaticamente com a nossa Sugestão do Chef para avançar para a morada e pagamento?';

        const aceitaChef = window.confirm(msg);
        if (aceitaChef) {
          fillChefSuggestion();
        } else {
          return; // Utilizador escolhe continuar a selecionar manualmente
        }
      }

      // Preencher o resumo visual da caixa no Passo 2
      const step2BoxSummary = document.getElementById('step2BoxSummary');
      const step2GiftSummary = document.getElementById('step2GiftSummary');
      const step2TotalSummary = document.getElementById('step2TotalSummary');

      const selectedList = catalogItems.filter(it => (boxQuantities[it.id] || 0) > 0);
      const summaryText = selectedList.map(it => `${boxQuantities[it.id]}x ${it.name}`).join(', ');
      if (step2BoxSummary) step2BoxSummary.innerText = summaryText || plan.nome;

      const selectedGifts = giftSnacks.filter(it => (giftQuantities[it.id] || 0) > 0);
      const giftsText = selectedGifts.map(it => `${giftQuantities[it.id]}x ${it.name}`).join(', ');
      if (step2GiftSummary) step2GiftSummary.innerText = giftsText ? `🎁 Brinde Grátis: ${giftsText}` : '🎁 2x Lanches de Brinde Incluídos';

      if (step2TotalSummary) step2TotalSummary.innerText = plan.total.toFixed(2).replace('.', ',') + ' €';

      checkoutStep1.style.display = 'none';
      checkoutStep2.style.display = 'block';

      stepTab1.classList.remove('active');
      stepTab1.classList.add('completed');
      stepTab2.classList.add('active');

      renderPaymentFields();
      window.scrollTo({ top: checkoutStep2.offsetTop - 100, behavior: 'smooth' });
    });

    // Voltar para o Passo 1
    btnBackToStep1.addEventListener('click', function () {
      checkoutStep2.style.display = 'none';
      checkoutStep1.style.display = 'block';

      stepTab2.classList.remove('active');
      stepTab1.classList.remove('completed');
      stepTab1.classList.add('active');

      window.scrollTo({ top: checkoutStep1.offsetTop - 100, behavior: 'smooth' });
    });

    // Renderizar campos de pagamento específicos no Passo 2
    function renderPaymentFields() {
      const method = getSelectedPaymentMethod();
      const plano = planosData[selectPlano.value] || planosData.casal;
      const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';

      if (method === 'card') {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: #ffffff; border: 2px solid var(--color-primary); border-radius: var(--radius-md); padding: 22px;">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <span>💳</span> Dados do Cartão de Pagamento (${totalStr})
            </h4>
            <div class="form-group">
              <label for="cartaoNumero">Número do Cartão *</label>
              <input type="text" id="cartaoNumero" class="form-control" placeholder="4000 1234 5678 9010" maxlength="19" required>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="cartaoNome">Nome Impresso no Cartão *</label>
                <input type="text" id="cartaoNome" class="form-control" placeholder="Como consta no cartão" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label for="cartaoValidade">Validade *</label>
                  <input type="text" id="cartaoValidade" class="form-control" placeholder="MM/AA" maxlength="5" required>
                </div>
                <div class="form-group">
                  <label for="cartaoCvv">CVV *</label>
                  <input type="text" id="cartaoCvv" class="form-control" placeholder="123" maxlength="4" required>
                </div>
              </div>
            </div>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">
              🔒 Transação cifrada por protocolo SSL de 256 bits. Faturação automática semanal com cancelamento livre.
            </span>
          </div>
        `;
      } else if (method === 'mbway') {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: var(--color-primary-soft); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px;">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span>📱</span> Confirmação MB WAY (${totalStr})
            </h4>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 12px;">
              Utilizaremos o telemóvel cadastrado acima para enviar o pedido de confirmação de ${totalStr} para a sua app MB WAY assim que clicar no botão abaixo.
            </p>
          </div>
        `;
      } else {
        paymentFieldsContainer.innerHTML = `
          <div style="background-color: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px;">
            <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span>🏦</span> Emissão de Referência Multibanco (${totalStr})
            </h4>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">
              A Entidade e a Referência Multibanco serão geradas imediatamente após a submissão e enviadas por e-mail e SMS para liquidação em qualquer terminal Multibanco ou Homebanking em 24h.
            </p>
          </div>
        `;
      }
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

    // Submissão Final do Checkout
    checkoutFinalForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const plano = planosData[selectPlano.value] || planosData.casal;
      const totalStr = plano.total.toFixed(2).replace('.', ',') + ' €';
      const method = getSelectedPaymentMethod();
      const methodLabels = {
        mbway: 'MB WAY',
        card: 'Cartão de Débito/Crédito',
        multibanco: 'Referência Multibanco'
      };

      const rua = document.getElementById('entregaRua').value;
      const concelho = document.getElementById('entregaConcelho').value;
      const concelhoLabel = concelho.charAt(0).toUpperCase() + concelho.slice(1);

      // Preencher ecrã de confirmação
      document.getElementById('confOrderCode').innerText = Math.floor(1000 + Math.random() * 9000);
      document.getElementById('confPlanName').innerText = plano.nome;
      document.getElementById('confPlanPrice').innerText = totalStr;
      document.getElementById('confPayMethod').innerText = methodLabels[method] || 'MB WAY';
      document.getElementById('confAddress').innerText = rua + ', ' + concelhoLabel + ' (Grande Porto)';

      // Horário preferencial agendado e data de entrega calculada em 48h
      const entregaJanelaSelect = document.getElementById('entregaJanela');
      const janelaText = entregaJanelaSelect ? entregaJanelaSelect.options[entregaJanelaSelect.selectedIndex].text : '';
      const confDeliveryDate = document.getElementById('confDeliveryDate');
      if (confDeliveryDate) {
        confDeliveryDate.textContent = `${estimatedDeliveryDateStr} • ${janelaText}`;
      }

      // Preencher a lista de refeições da subscrição
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

      // Preencher a lista de lanches de brinde gratuito
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

      // Alternar ecrãs
      checkoutStep2.style.display = 'none';
      checkoutStep3.style.display = 'block';

      stepTab2.classList.remove('active');
      stepTab2.classList.add('completed');
      stepTab3.classList.add('active');

      window.scrollTo({ top: checkoutStep3.offsetTop - 100, behavior: 'smooth' });
    });
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
});
