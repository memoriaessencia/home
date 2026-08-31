document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Alterna a exibição do menu ao clicar no botão hambúrguer
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Fecha o menu ao clicar em qualquer link
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Carregamento dinâmico de produtos via JSON
  carregarProdutos();
});

async function carregarProdutos() {
  const container = document.getElementById('productGrid');

  try {
    const resposta = await fetch('produtos.json');
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }
    const produtos = await resposta.json();

    container.innerHTML = ''; // Limpa o contêiner

    produtos.forEach(produto => {
      const card = document.createElement('article');
      card.className = 'product-card';

      // Digite o número do WhatsApp com código do país e DDD (somente números)
      const numeroWhatsapp = '554198393333';

      const mensagem = encodeURIComponent(`Olá, gostaria de saber mais sobre ${produto.nome}`);
      const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagem}`;

      card.innerHTML = `
  <img src="${produto.imagem}" alt="${produto.nome}" class="product-img-placeholder" style="object-fit: cover;">
  <h3>${produto.nome}</h3>
  <p class="description" style="margin-bottom: 0.8rem; color: var(--text-light); font-size: 0.95rem;">${produto.descricao}</p>
  <a href="${linkWhatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-card" style="display: inline-block; text-decoration: none;">Comprar</a>
`;

      container.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro ao carregar produtos:', erro);
    container.innerHTML = '<p style="text-align: center;">Não foi possível carregar os produtos no momento.</p>';
  }
}