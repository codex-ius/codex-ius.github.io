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

async function cargarLey(nombre, linkElement) {
  const content = document.getElementById('content');

  // Feedback visual de carga
  content.style.opacity = '0.5';

  // Quitar clase activa de todos y poner al actual
  document.querySelectorAll('#leyes a').forEach(a => a.classList.remove('active'));
  if (linkElement) linkElement.classList.add('active');

  try {
    const response = await fetch('../../posts/legislacion/' + nombre + '.md');
    if (!response.ok) throw new Error();
    const md = await response.text();

    // Renderizar Markdown
    content.innerHTML = marked.parse(md);
    content.style.opacity = '1';

    // --- EL ARREGLO DEL SCROLL ---
    // Usamos scrollIntoView para apuntar directamente al div #content
    content.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // Alinea el inicio del div con la parte superior de la pantalla
    });
  } catch (e) {
    content.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <span class="material-icons" style="font-size: 48px; color: var(--legal-penal)">error</span>
                <p>Archivo de ley no encontrado o en mantenimiento.</p>
            </div>`;
    content.style.opacity = '1';
  }
}

// Modifica el listener original en DOMContentLoaded:
document.querySelectorAll('#leyes a[data-ley]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    cargarLey(link.dataset.ley, link); // Pasamos el link para la clase active
  });
});