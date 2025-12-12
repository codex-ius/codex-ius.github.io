// main.js - Versión adaptada para landing page de Jekyll
import { createSections } from './config.js';
import { constituciones, tratados, codigos, leyes, cardsData } from './data.js';
import { setupSearch } from './searchFilter.js';
import { renderCards } from './cards.js';
import { setupThemeToggle } from './themeToggle.js';
import { setupDetailsToggle } from './utils.js';

// Solo ejecutar si estamos en la landing page
if (document.querySelector('.landing-page')) {
  
  // 1. Crear secciones de legislación DINÁMICAMENTE (reemplaza las estáticas)
  createSections(constituciones, 'Constituciones Argentinas', 'leyes');
  createSections(codigos, 'Códigos de Fondo y Forma', 'leyes');
  createSections(tratados, 'Tratados Constitucionales', 'leyes');
  createSections(leyes, 'Leyes Nacionales y de Mendoza', 'leyes');

  // 2. Configurar búsqueda
  setupSearch('#search-input', '.divContainer_links');

  // 3. Renderizar cards de teoría jurídica
  renderCards('#cards-container', ['educacion', 'noticias', 'ensayos']);

  // 4. Configurar toggles y animaciones
  document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle('.landing-page');  // Cambia selector a landing-page
    setupDetailsToggle();
  });

  // 5. Animación texto (funciona igual)
  const words = ["aprender;", "enseñar;", "servir;"];
  const el = document.getElementById("animated-text");
  let index = 0;

  if (el) {
    function changeText() {
      el.style.opacity = 0;
      setTimeout(() => {
        el.textContent = words[index];
        el.style.opacity = 1;
        index = (index + 1) % words.length;
      }, 500);
    }
    setInterval(changeText, 3000);
  }
}
