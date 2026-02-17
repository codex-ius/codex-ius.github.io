// js/main.js
import { renderCategory } from './modules/cards.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderizado Prioritario (First Input Delay Optimización)
    // Renderizamos noticias primero (lo más importante arriba)
    // Luego el resto para no saturar el renderizado inicial
    const renderSequence = [
        { cat: 'noticias', id: 'news-container' },
        { cat: 'ensayos', id: 'doctrina-container' },
        { cat: 'software', id: 'apps-container' }
    ];

    renderSequence.forEach(({ cat, id }) => {
        // Usamos requestAnimationFrame para que el navegador decida el mejor momento 
        // para renderizar cada sección sin congelar la UI
        requestAnimationFrame(() => renderCategory(cat, id));
    });

    // 2. Animación de Texto (Más suave y accesible)
    initConsoleAnimation();
});

function initConsoleAnimation() {
    const words = ["aprender;", "enseñar;", "servir;"];
    const el = document.getElementById("typewriter");
    if (!el) return;

    let wordIdx = 0;
    
    // Usamos una clase de CSS para la transición en lugar de manipular estilos inline
    // Esto es mucho más rápido para el motor de renderizado del navegador
    const updateWord = () => {
        el.classList.add('fade-out-blur'); // Clase que definiremos en home.css

        setTimeout(() => {
            el.textContent = words[wordIdx];
            el.classList.remove('fade-out-blur');
            wordIdx = (wordIdx + 1) % words.length;
        }, 600);
    };

    setInterval(updateWord, 3500);
    updateWord(); // Carga inicial
        }
        
