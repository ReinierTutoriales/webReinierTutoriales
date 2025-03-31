document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const contenido = document.getElementById('contenido-articulos');
    
    // Cargar artículos
    fetch('./data/articulos.json')
        .then(response => response.json())
        .then(articulos => {
            renderArticulos(articulos);
            setupFiltros(articulos);
        });

    // Menú hamburguesa
    document.getElementById('hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Filtrado de artículos
    function setupFiltros(articulos) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const categoria = link.getAttribute('href').substring(1);
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const filtrados = categoria === 'inicio' 
                    ? articulos 
                    : articulos.filter(a => a.categoria === categoria);
                
                renderArticulos(filtrados);
            });
        });
    }

    function renderArticulos(articulos) {
        contenido.innerHTML = articulos.map(articulo => `
            <article class="articulo-card">
                <img src="${articulo.imagen}" class="articulo-imagen" alt="${articulo.titulo}">
                <div class="articulo-content">
                    <span class="articulo-categoria ${articulo.categoria}">
                        ${articulo.categoria.toUpperCase()}
                    </span>
                    <h3 class="articulo-titulo">${articulo.titulo}</h3>
                    <p class="articulo-descripcion">${articulo.descripcion}</p>
                    <div class="articulo-meta">
                        <span class="fecha">📅 ${articulo.fecha}</span>
                        <a href="${articulo.url}" class="btn-leer">Leer más →</a>
                    </div>
                </div>
            </article>
        `).join('');
    }
});