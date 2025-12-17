import { renderCards } from './cards.js';
import { setupThemeToggle } from './themeToggle.js';
import { setupDetailsToggle } from './utils.js';

// Renderizar cards
renderCards('#cards-container', ['noticias', 'educacion','ensayos', 'software']);

// Configurar toggle de tema y botón volver arriba
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle('main');
});

// Animación texto (puedes modularizar también si quieres)
const words = ["aprender;", "enseñar;", "servir;"];
const el = document.getElementById("animated-text");
let index = 0;

function changeText() {
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = words[index];
    el.style.opacity = 1;
    index = (index + 1) % words.length;
  }, 500);
}

setInterval(changeText, 3000);


document.addEventListener('DOMContentLoaded', () => {
  setupDetailsToggle(); // Usa el selector por defecto 'details'
});