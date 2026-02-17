import { renderCards } from './cards.js';
import { setupThemeToggle } from './themeToggle.js';
import { setupDetailsToggle } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Tema y UI Global
  setupThemeToggle('main');
  setupDetailsToggle();

  // 2. Renderizar contenido dinámico
  // El renderizado ahora inyectará las clases .glass-card automáticamente
  renderCards('#cards-container', ['noticias', 'educacion', 'ensayos', 'software']);

  // 3. Animación de Texto (Refactorizada para suavidad Glass-Organic)
  const words = ["aprender;", "enseñar;", "servir;"];
  const el = document.getElementById("animated-text");
  let index = 0;

  function changeText() {
    if (!el) return;
    el.style.opacity = 0;
    el.style.filter = "blur(10px)"; // Efecto de desenfoque al salir
    el.style.transform = "translateY(10px)"; 

    setTimeout(() => {
      el.textContent = words[index];
      el.style.opacity = 1;
      el.style.filter = "blur(0px)";
      el.style.transform = "translateY(0)";
      index = (index + 1) % words.length;
    }, 500);
  }

  setInterval(changeText, 3000);
});
