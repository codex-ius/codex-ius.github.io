// js/main.js
import { renderCategory } from './modules/cards.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Iniciar Animación de Título (Consola)
    initTypewriter(['aprender', 'enseñar', 'servir']);

    // 2. Renderizar secciones del Index
    renderCategory('noticias', 'news-container');
    renderCategory('ensayos', 'doctrina-container'); // Mapeado a tu sección repositorio
    renderCategory('software', 'apps-container');
});

function initTypewriter(words) {
    const target = document.getElementById('typewriter');
    let i = 0;
    let wordIdx = 0;
    
    function type() {
        const currentWord = words[wordIdx];
        if (i < currentWord.length) {
            target.textContent += currentWord.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (i > 0) {
            target.textContent = target.textContent.slice(0, -1);
            i--;
            setTimeout(erase, 100);
        } else {
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(type, 500);
        }
    }

    type();
              }
      
