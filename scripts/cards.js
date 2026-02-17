import { cardsData } from './data.js';

/**
 * Crea una tarjeta con arquitectura de capas:
 * 1. Base Neumórfica (Sombra y relieve)
 * 2. Capa Glass (Filtro de desenfoque y tinte)
 * 3. Contenido (Texto y botones hápticos)
 */
export function createCard(data, category, index) {
    const card = document.createElement('article');
    const sequentialId = String(index + 1).padStart(3, '0');

    // Clase maestra y atributos para CSS dinámico
    card.className = `glass-card cat-${category} ${data.isFeatured ? 'featured' : ''}`;
    card.setAttribute('data-index', sequentialId);

    let cardContent = '';

    // 1. LÓGICA PARA NOTICIAS (Bento Style)
    if (category === 'noticias') {
        cardContent = `
            <div class="glass-overlay"></div>
            <div class="card-inner">
                <div class="card-header">
                    <span class="badge-glass">${data.branch?.toUpperCase() || 'SISTEMA'}</span>
                    <span class="date-mono">${data.date || 'RECIENTE'}</span>
                </div>
                <h4>${data.title}</h4>
                <p>${data.description}</p>
                <div class="card-footer">
                    <span class="log-id">LOG_${sequentialId}</span>
                    <a href="${data.link}" class="btn-neu">
                        REPORTE <span class="material-icons">arrow_forward</span>
                    </a>
                </div>
            </div>`;
    }

    // 2. LÓGICA PARA EDUCACIÓN (Academia)
    else if (category === 'educacion') {
        cardContent = `
            <div class="glass-overlay"></div>
            <div class="card-inner">
                <div class="card-header">
                    <span class="badge-glass">ACADEMIA</span>
                    <span class="branch-label">${data.branch?.toUpperCase()}</span>
                </div>
                <h4>${data.title}</h4>
                <div class="meta-row">
                    <div class="meta-unit">
                        <span class="material-icons">analytics</span>
                        <span>${data.level || 'General'}</span>
                    </div>
                    <div class="meta-unit">
                        <span class="material-icons">history</span>
                        <span>${data.time || 'Lectura'}</span>
                    </div>
                </div>
                <p>${data.description}</p>
                <a href="${data.link}" class="btn-neu">
                    <span class="material-icons">menu_book</span> MATERIAL
                </a>
            </div>`;
    }

    // 3. LÓGICA PARA ENSAYOS (Investigación)
    else if (category === 'ensayos') {
        cardContent = `
            <div class="glass-overlay"></div>
            <div class="card-inner">
                <div class="tab-organic">${data.branch || 'Doctrina'}</div>
                <div class="card-header">
                    <span class="ref-id">REF-AR-${data.date || '2026'}</span>
                </div>
                <h4>${data.title}</h4>
                <p class="abstract">${data.description}</p>
                <div class="card-footer">
                    <span class="author-tag"><i class="material-icons">edit_note</i> ${data.author}</span>
                    <a href="${data.link}" class="btn-neu highlight">${data.linkText}</a>
                </div>
            </div>`;
    }

    // 4. LÓGICA PARA SOFTWARE (Herramientas Ius)
    else if (category === 'software') {
        cardContent = `
            <div class="glass-overlay"></div>
            <div class="card-inner">
                <div class="software-head">
                    <div class="icon-box-neu">
                        <span class="material-icons">${data.icon || 'terminal'}</span>
                    </div>
                    <span class="version-tag">${data.version || 'v1.0'}</span>
                </div>
                <h4>${data.title}</h4>
                <p>${data.description}</p>
                <div class="card-footer">
                    <a href="${data.link}" class="btn-neu execute">
                        <span class="material-icons">play_circle_filled</span>
                        ${data.linkText.toUpperCase()}
                    </a>
                </div>
            </div>`;
    }

    card.innerHTML = cardContent;
    return card;
}

/**
 * Orquestador de renderizado
 */
export function renderCards(containerSelector, categories) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';

    categories.forEach(category => {
        const section = document.createElement('section');
        section.className = `main-section section-${category}`;
        section.id = `section-${category}`;

        // Título de sección con estilo Glass
        section.innerHTML = `
            <div class="section-title-wrapper">
                <h3 class="section-title">${category.toUpperCase()}</h3>
                <div class="title-line"></div>
            </div>
            <div class="cards-grid grid-${category}"></div>
        `;

        const grid = section.querySelector(`.cards-grid`);
        const data = cardsData[category] || [];

        data.forEach((item, i) => {
            grid.appendChild(createCard(item, category, i));
        });

        container.appendChild(section);
    });
}
