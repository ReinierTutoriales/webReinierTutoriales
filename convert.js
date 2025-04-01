const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Configuración para Windows
const POSTS_DIR = path.join(__dirname, 'posts');
const ASSETS_DIR = path.join(__dirname, 'assets');
const OUTPUT_JSON = path.join(__dirname, 'data', 'articulos.json');

const convertMarkdownToJSON = () => {
  try {
    const files = fs.readdirSync(POSTS_DIR)
      .filter(file => path.extname(file) === '.md')
      .sort((a, b) => {
        const dateA = new Date(a.split('-').slice(0, 3).join('-'));
        const dateB = new Date(b.split('-').slice(0, 3).join('-'));
        return dateB - dateA; // Ordenar del más nuevo al más viejo
      });

    const articulos = files.map((file, index) => {
      const filePath = path.join(POSTS_DIR, file);
      const mdContent = fs.readFileSync(filePath, 'utf8');
      
      // Extraer metadatos
      const [year, month, day, ...titleParts] = file.replace('.md', '').split('-');
      const formattedDate = new Date(`${year}-${month}-${day}`)
        .toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

      // Determinar imagen
      const image = mdContent.match(/!\[.*?\]\((.*?)\)/)?.[1] || 'default.png';

      return {
        id: index + 1,
        titulo: titleParts.join(' ').replace(/\b\w/g, c => c.toUpperCase()),
        categoria: "macos",
        fecha: formattedDate,
        imagen: `../assets/${path.basename(image)}`, // Ruta compatible con GitHub Pages
        descripcion: mdContent.split('\n')[2]?.substring(0, 150) + '...' || '',
        contenido: marked.parse(mdContent),
        url: `?id=${index + 1}`
      };
    });

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(articulos, null, 2), 'utf8');
    console.log('✅ Conversión exitosa! Verifica en: data\\articulos.json');

  } catch (error) {
    console.error('🚨 Error:', error.message);
  }
};

convertMarkdownToJSON();