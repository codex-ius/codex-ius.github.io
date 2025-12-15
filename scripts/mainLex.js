import { setupThemeToggle } from './themeToggle.js';
import { setupDetailsToggle } from './utils.js';
import { setupSearchComponent } from './searchComponent.js';

// UN SOLO event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle('main');
  setupDetailsToggle();
  setupSearchComponent(); // UNA SOLA VEZ
  
  // Event listeners para links
  document.querySelectorAll('#leyes a[data-ley]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      cargarLey(link.dataset.ley);
    });
  });
  
  // Carga inicial
  cargarLey('cn');
});

async function cargarLey(nombre) {
  try {
    const response = await fetch('../../posts/' + nombre + '.md');
    const md = await response.text();
    document.getElementById('content').innerHTML = marked.parse(md);
  } catch(e) {
    document.getElementById('content').innerHTML = '<p>Ley no encontrada</p>';
  }
}
