// js/modules/cards.js
import { cardsData } from '../utils/data.js';

/**
 * Genera el HTML de una card según su categoría
 */
export function createCard(data, category, index) {
    const article = document.createElement('article');
    article.className = `glass-card card-${category}`;
    
    // El ID secuencial ayuda a la accesibilidad y tracking
    const id = `${category}-${index}`;

    // Estructura común para todas las cards (Look Orgánico)
    article.innerHTML = `
        <div class="glass-reflection"></div>
        <div class="card-content">
            <header class="card-meta">
                <span class="badge">${data.branch || category}</span>
                ${data.date ? `<time class="date">${data.date}</time>` : ''}
            </header>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <footer class="card-actions">
                ${data.version ? `<span class="ver">${data.version}</span>` : ''}
                <a href="${data.link}" class="btn-action" aria-label="${data.linkText}: ${data.title}">
                    ${data.linkText}
                </a>
            </footer>
        </div>
    `;
    return article;
}

/**
 * Renderiza cards en un contenedor específico
 */
export function renderCategory(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !cardsData[category]) return;

    container.innerHTML = ''; // Limpiar cargando...
    
    cardsData[category].forEach((item, index) => {
        container.appendChild(createCard(item, category, index));
    });
}
