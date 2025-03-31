// Cargar contenido desde datos.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/datos.json')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('contenido');
            contenedor.innerHTML = data.map(item => `
                <article class="tutorial">
                    <h2>${item.titulo}</h2>
                    <p>${item.descripcion}</p>
                    <video controls>
                        <source src="${item.url}" type="video/mp4">
                    </video>
                </article>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});