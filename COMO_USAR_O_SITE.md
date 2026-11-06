# Guia Prático: Como Visualizar, Publicar e Modificar o Site da BioMarmita

Olá! Este guia foi feito especialmente para você que não tem experiência prévia em programação. Aqui você aprenderá como abrir o seu site no computador, como colocá-lo na internet de forma 100% gratuita e terá um **manual de referência completo para realizar qualquer alteração futura** de forma simples e segura.

---

## 1. Como Abrir o Site no Seu Computador (2 Cliques)

Você não precisa instalar nenhum programa especial nem servidor para ver o site a funcionar.

1. Abra a pasta do seu projeto: `SiteBioMarmita`.
2. Procure o arquivo chamado **[index.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/index.html)**.
3. Dê **dois cliques** sobre ele (ou clique com o botão direito e escolha *"Abrir com"* > Google Chrome, Safari ou Microsoft Edge).
4. O site abrirá imediatamente no seu navegador!
5. Pode clicar em todos os menus no topo (*Sobre Nós*, *Menu e Planos*, *Produtores Locais*, *FAQ*, etc.) para navegar entre as 8 páginas.

> 💡 **Dica para testar como fica no telemóvel/celular:**  
> Com o site aberto no Google Chrome, clique com o botão direito em qualquer parte da página e escolha **"Inspecionar"**. Depois, clique no pequeno ícone de telemóvel/tablet no canto superior esquerdo da barra de ferramentas (ou pressione as teclas `Ctrl + Shift + M` no Windows / `Cmd + Shift + M` no Mac). Você verá o menu hambúrguer a funcionar perfeitamente!

---

## 2. Mapa das 13 Páginas Criadas

| Página | Arquivo | O Que Mostra |
| :--- | :--- | :--- |
| **Início** | [index.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/index.html) | Proposta de valor, novo cabeçalho de 2 linhas, **barra de certificações oficiais**, **enquadramento perfeito do prato**, 4 pilares, **Como Funciona em 4 passos com fotos reais**, **Showcase da Mariana Ferreira em teletrabalho**, quadro de rotina e **Tabela Comparativa com concorrência** (incluindo tecnologia a vácuo). |
| **Sobre Nós** | [sobre.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/sobre.html) | História da marca, cartões de Missão, Visão e Valores com ícones, e compromisso ético. |
| **Menu e Planos** | [menu.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/menu.html) | **Guia rápido horizontal compacto (Slim Stepper Ribbon)**, faixa de garantia biológica, ementa interativa com filtro por categorias, 10 opções (6 pratos + 4 lanches), macros completas, quintas de origem e 3 planos com 2 lanches de oferta semanal. |
| **Produtores Locais** | [produtores.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/produtores.html) | Quinta da Serra, Horta do Vale e Sabor do Campo, valorizando a agricultura familiar do Norte de Portugal. |
| **Sustentabilidade** | [sustentabilidade.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/sustentabilidade.html) | Embalagens bioplásticas, ciclo ilustrado de devolução facultativa em 3 passos e **secção detalhada com fichas técnicas de certificações (Euro-Folha UE, HACCP, EN 13432, Cadeia Curta)**. |
| **FAQ** | [faq.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/faq.html) | Perguntas frequentes com sanfona interativa, esclarecimento de 48h de antecedência mínima e opção de saltar semanas sem custos. |
| **Blog Principal** | [blog.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/blog.html) | Vitrine dos 3 artigos educativos com cards interativos direcionando para as páginas de artigos dedicadas. |
| **Contactos** | [contactos.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/contactos.html) | Formulário com mensagem de envio imediata, canais de suporte e botão direto para o WhatsApp. |
| **Área de Cliente** | [area-cliente.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/area-cliente.html) | **Portal da persona Mariana Ferreira**: tela de login simples em 1 clique (sem validação obrigatória), gestão da subscrição semanal, escolha de pratos, saltar semana, pausar plano, métricas de impacto circular, botão interativo para **Cancelar Subscrição** com confirmação e botão para terminar sessão. |
| **Carrinho & Checkout** | [carrinho.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/carrinho.html) | Fluxo guiado em 3 passos com **cálculo dinâmico de entrega em tempo real (+48h)**: (1) Escolha do plano + Construtor de Caixa + Brindes de 2 Lanches; (2) Morada no Grande Porto + Pagamento seguro e selos de garantia; (3) Ecrã de confirmação com código `#BIO-XXXX`. |
| **Artigo 1: Trabalho** | [artigo-alimentacao-trabalho.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/artigo-alimentacao-trabalho.html) | *5 Dicas Para Uma Alimentação Mais Saudável no Dia a Dia de Trabalho* (Dra. Inês Matos — regra do prato, quebra pós-almoço e energia). |
| **Artigo 2: Produtos Locais** | [artigo-produtos-locais.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/artigo-produtos-locais.html) | *Os Benefícios dos Produtos Locais Para a Saúde e o Planeta* (Eng. Tiago Ribeiro — 3x mais vitaminas e redução de CO₂). |
| **Artigo 3: Receita Sopa** | [artigo-receita-sopa-abobora.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/artigo-receita-sopa-abobora.html) | *Receitas Biológicas: O Segredo da Sopa de Abóbora* (Chef Afonso Ribeiro — ficha técnica completa e método de assar no forno). |

---

## 3. Como Publicar o Site Grátis na Internet (Vercel)

Se quiser apresentar o trabalho através de um link real na internet (ex: `https://biomarmita.vercel.app`):

1. Crie uma conta gratuita em [vercel.com](https://vercel.com) (pode entrar com a sua conta Google).
2. Na página inicial da Vercel, clique no botão **"Add New..."** e escolha **"Project"**.
3. Se tiver o projeto no GitHub, pode importar diretamente.  
   *(Em alternativa, pode instalar a ferramenta da Vercel ou arrastar a pasta do site).*
4. Como o site é estático (HTML/CSS/JS puros), o deploy é instantâneo e não precisa de configurar nada: basta clicar em **Deploy**.
5. Em menos de 30 segundos, a Vercel gera um link público que pode partilhar com o seu professor e colegas!

---

## 4. Onde Encontrar Cada Coisa na Estrutura de Pastas

- **Estilos visuais e cores:** [css/style.css](file:///Users/camilalessa/Downloads/SiteBioMarmita/css/style.css)
- **Menu mobile e interatividades:** [js/script.js](file:///Users/camilalessa/Downloads/SiteBioMarmita/js/script.js)
- **Fotografias organizadas:** [assets/imagens](file:///Users/camilalessa/Downloads/SiteBioMarmita/assets/imagens)
- **Ícones ilustrados:** [assets/icones](file:///Users/camilalessa/Downloads/SiteBioMarmita/assets/icones)
- **Plano de Execução completo:** [PLANO_EXECUCAO.md](file:///Users/camilalessa/Downloads/SiteBioMarmita/PLANO_EXECUCAO.md)

---

## 5. Guia de Referência para Possíveis Modificações

Se precisar de alterar preços, trocar textos, adicionar novas perguntas ou trocar imagens, consulte as instruções abaixo. Você pode abrir qualquer um dos arquivos `.html` ou `.css` com um editor simples (como VS Code, Bloco de Notas ou TextEdit).

### 5.1 Como Alterar Textos, Títulos e Informações Gerais

| O Que Pretende Modificar | Qual Arquivo Abrir | O Que Procurar no Arquivo |
| :--- | :--- | :--- |
| **Slogan da Marca** | Em todos os arquivos `.html` | Procure por `Da natureza ao prato, com sabor e confiança.` |
| **Depoimento da Mariana S.** | [index.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/index.html) | Procure pela classe `testimonial-quote` e altere a frase do depoimento. |
| **Missão, Visão ou Valores** | [sobre.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/sobre.html) | Procure pelas palavras `Missão`, `Visão` ou `Valores` dentro dos cartões. |
| **História da BioMarmita** | [sobre.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/sobre.html) | Procure pela secção `A Nossa História` e edite os parágrafos. |
| **Nomes das Quintas Parceiras** | [produtores.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/produtores.html) | Procure por `Quinta da Serra`, `Horta do Vale` ou `Sabor do Campo`. |
| **Passos da Compostagem** | [sustentabilidade.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/sustentabilidade.html) | Procure pela secção `Como Funciona a Devolução e Compostagem`. |

---

### 5.2 Como Alterar Pratos da Semana, Lanches, Macros e Preços

Todos os pratos, lanches saudáveis e valores monetários estão centralizados no arquivo **[menu.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/menu.html)**:

* **Categorias de Filtros (Carne, Peixe, Vegan, Lanches):**
  - Cada cartão de refeição possui o atributo `data-category="carne"`, `data-category="peixe"`, `data-category="vegetariano"` ou `data-category="lanches"`. Ao clicar nos botões do filtro no topo, o site filtra instantaneamente os pratos dessa categoria.
* **Para alterar ou adicionar pratos e lanches:**
  - Procure pelos títulos (ex: `Peito de Peru Recheado`, `Lombo de Bacalhau com Grão`, `Caril de Grão & Espinafres`, `Pudim de Chia`, etc.).
  - Para alterar calorias e macronutrientes, procure pela classe `macros-bar` onde estão indicadas as `Kcal`, `Proteína`, `Hidratos` e `Gordura`.
  - Para alterar a quinta de origem, procure por `meal-origin-badge` (ex: `Quinta da Serra (Paredes)`).
* **Para mudar os preços dos planos semanais:**
  - Procure pela classe `amount`:
    - Plano Individual: mude `39,90`
    - Plano Casal: mude `74,90`
    - Plano Família: mude `104,90`
  - Se quiser alterar a quantidade de refeições (ex: de 5 para 6), procure por `5 refeições semanais`.

---

### 5.3 Como Alterar Telefones, WhatsApp, E-mail e Redes Sociais

As informações de contacto estão presentes na página **[contactos.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/contactos.html)** e no **rodapé (`<footer>`)** de todas as 8 páginas:

* **Mudar o número de WhatsApp:**
  - Procure por `https://wa.me/351912345678` e substitua pelo seu número com o código do país (exemplo: `351912345678` para Portugal ou `5511999999999` para o Brasil).
  - Altere também o texto visível `+351 912 345 678`.
* **Mudar o endereço de E-mail:**
  - Procure por `mailto:biomarmita.portugal@gmail.com` e troque pelo e-mail desejado.
* **Mudar o Link do Instagram ou Redes Sociais:**
  - Procure por `https://instagram.com/biomarmita.portugal` e substitua pelo seu link.
* **Botão Flutuante de WhatsApp:**
  - Está presente no canto inferior direito de todas as páginas com a classe `whatsapp-float`. Se quiser alterar o número ou mensagem padrão, procure por `whatsapp-float` nos arquivos HTML.

---

### 5.4 Como Adicionar Novas Perguntas no FAQ (Perguntas Frequentes)

Abra o arquivo **[faq.html](file:///Users/camilalessa/Downloads/SiteBioMarmita/faq.html)** e procure pela seção `<div class="faq-list">`.

Para adicionar uma nova pergunta, basta copiar e colar este bloco de código no final da lista:

```html
<!-- Nova Pergunta Adicionada -->
<div class="faq-item">
  <button class="faq-question">
    <span>Escreva aqui o título da sua nova pergunta?</span>
    <span class="faq-toggle-icon">+</span>
  </button>
  <div class="faq-answer">
    <p>
      Escreva aqui a resposta detalhada e explicativa para a sua dúvida.
    </p>
  </div>
</div>
```
*(O JavaScript já foi programado para fazer a nova pergunta abrir e fechar automaticamente, sem precisar programar nada!)*

---

### 5.5 Como Trocar Fotografias e Imagens

Todas as imagens do site ficam guardadas na pasta **[assets/imagens/](file:///Users/camilalessa/Downloads/SiteBioMarmita/assets/imagens)**.

Existem duas formas fáceis de trocar qualquer foto:

* **Método 1 (Mais fácil — sem mexer em código):**
  1. Pegue na sua nova fotografia no computador.
  2. Mude o nome do seu arquivo para coincidir com a imagem que quer substituir (veja a tabela abaixo).
  3. Cole a sua nova foto dentro da pasta `assets/imagens/` substituindo a antiga. Pronto! O site atualizará automaticamente.
* **Método 2 (No código HTML):**
  1. Coloque a sua nova imagem na pasta `assets/imagens/` com o nome que preferir (ex: `minha-foto-nova.jpeg`).
  2. Abra a página HTML onde a foto aparece e troque o texto do link:
     - De: `<img src="./assets/imagens/foto-antiga.jpeg">`
     - Para: `<img src="./assets/imagens/minha-foto-nova.jpeg">`

#### Tabela de Referência de Imagens:

| Imagem no Site | Nome do Arquivo na Pasta `assets/imagens/` | Onde Ela Aparece |
| :--- | :--- | :--- |
| **Logótipo Oficial** | `logo-biomarmita.jpeg` | No cabeçalho e rodapé de todas as páginas |
| **Prato Principal da Home** | `banner-home.jpeg` | No topo da página inicial (`index.html`) |
| **Foto da Mariana (Persona)**| `persona-mariana.jpeg` | No depoimento da página inicial (`index.html`) |
| **Mãos com Broto de Planta**| `banner-sobre.jpeg` | No topo da página Sobre Nós (`sobre.html`) |
| **Paisagem com Colinas** | `banner-citacao.jpeg` | Na citação inspiradora de Sobre Nós (`sobre.html`) |
| **Prato Vegetariano** | `menu-vegetariano.jpeg` | No cardápio de refeições (`menu.html`) |
| **Prato Tradicional** | `menu-tradicional.jpeg` | No cardápio de refeições (`menu.html`) |
| **Prato Fitness** | `menu-fitness.jpeg` | No cardápio de refeições (`menu.html`) |
| **Quinta da Serra** | `quinta-da-serra.jpeg` | No cartão do produtor (`produtores.html`) |
| **Horta do Vale** | `horta-do-vale.jpeg` | No cartão do produtor (`produtores.html`) |
| **Sabor do Campo** | `sabor-do-campo.jpeg` | No cartão do produtor (`produtores.html`) |
| **Caixa com Marmitas** | `caixa-entrega.jpeg` | Na secção de entrega e embalagens |
| **Embalagens Sustentáveis** | `embalagem-eco.jpeg` | Na página de Sustentabilidade (`sustentabilidade.html`) |

---

### 5.6 Como Alterar Cores e Estilos Visuais do Site

Todas as cores e fontes do site são controladas em um único lugar: o arquivo **[css/style.css](file:///Users/camilalessa/Downloads/SiteBioMarmita/css/style.css)**.

Abra o arquivo [css/style.css](file:///Users/camilalessa/Downloads/SiteBioMarmita/css/style.css) e logo nas primeiras linhas (entre as linhas 13 e 28) encontrará o bloco `:root`:

```css
:root {
  --color-primary-dark: #20451d;    /* Verde floresta escuro (cabeçalho/rodapé) */
  --color-primary: #2d5a27;         /* Verde institucional principal */
  --color-primary-light: #4c9a2a;   /* Verde folha de destaque */
  --color-primary-soft: #edf5ea;    /* Fundo verde bem clarinho dos cartões */
  
  --color-accent: #e07a5f;          /* Cor dos botões "Encomendar" (laranja terracota) */
  --color-accent-hover: #cf684d;    /* Cor do botão ao passar o rato por cima */
  
  --color-bg-body: #f8faf7;         /* Fundo geral da página */
  --color-bg-white: #ffffff;        /* Branco puro dos cartões */
  --color-text-main: #1f2a1e;       /* Cor dos textos principais */
}
```

* Se quiser trocar o **verde principal** por outro tom, basta alterar o código hexadecimal em `--color-primary`.
* Se quiser mudar a **cor dos botões de ação** (de laranja para dourado ou verde), basta alterar o código em `--color-accent`. Ao salvar o arquivo `css/style.css`, todas as 8 páginas mudarão simultaneamente!

---

## 6. Purificação de Linguagem Vaga & Condições Reais do Serviço

Para garantir nota máxima no critério acadêmico da **UFCD 11007** (Bloco 2 — Critério de Clareza e Posicionamento), o site foi totalmente purificado de chavões e promessas vagas:

| Expressão Vaga Eliminada | Substituição Concreta Adotada no Site |
| :--- | :--- |
| *"Refeições com qualidade superior e máxima frescura"* | **Ingredientes 100% de origem biológica certificada**, fornecidos por produtores locais parceiros identificados (Quinta da Serra, Horta do Vale e Sabor do Campo). |
| *"Entregas fáceis e rápidas para qualquer pessoa"* | **Marmitas prontas a aquecer e consumir em 3 minutos**, entregues no Grande Porto com dia, horário e morada (domicílio ou trabalho) ajustados à preferência do cliente. |
| *"Embalagens amigas do ambiente"* | **Embalagens herméticas a vácuo de bioplástico vegetal (norma EN 13432)**, recolhidas na entrega seguinte para compostagem industrial. |

### Condições Reais e Limites Fixados:
1. **Território:** Concelhos de Porto, Vila Nova de Gaia, Matosinhos, Maia e Gondomar.
2. **Conservação Testada:** 7 dias a frio (2°C a 4°C) em selagem a vácuo; pronto em 3 minutos a 750W no micro-ondas.
3. **Prazos:** Pausar, alterar ementa ou cancelar sem custos com pré-aviso mínimo de 48 horas.
4. **Atendimento:** Resposta pelo WhatsApp em menos de 1 hora útil (08h30–19h30).
