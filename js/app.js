document.addEventListener('DOMContentLoaded', () => {
  // Sistema de temas
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';

  themeToggle.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });

  // Menú mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Cargar artículos
  const loadArticles = async () => {
    try {
      const response = await fetch('../data/articulos.json');
      if (!response.ok) throw new Error('Error al cargar artículos');
      
      const articles = await response.json();
      const container = document.getElementById('articlesContainer');
      
      container.innerHTML = articles.map(article => `
        <article class="article-card">
          <img src="${article.imagen}" alt="${article.titulo}" class="article-image">
          <div class="article-content">
            <h2 class="article-title">${article.titulo}</h2>
            <p class="article-excerpt">${article.descripcion}</p>
            <a href="?id=${article.id}" class="article-link">Leer más →</a>
          </div>
        </article>
      `).join('');
      
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('articlesContainer').innerHTML = `
        <div class="error-message">
          <p>⚠️ Error al cargar los artículos. Intenta recargar la página.</p>
        </div>
      `;
    }
  };

  // Cargar artículo individual
  const loadSingleArticle = async (id) => {
    try {
      const response = await fetch('../data/articulos.json');
      const articles = await response.json();
      const article = articles.find(a => a.id === id);
      
      if (!article) throw new Error('Artículo no encontrado');
      
      document.getElementById('articleContent').innerHTML = `
        <article class="single-article">
          <h1>${article.titulo}</h1>
          <img src="${article.imagen}" alt="${article.titulo}" class="article-hero">
          <div class="article-body">${article.contenido}</div>
        </article>
      `;
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Detectar si es artículo individual
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');

  if (articleId) {
    loadSingleArticle(parseInt(articleId));
  } else {
    loadArticles();
  }
});