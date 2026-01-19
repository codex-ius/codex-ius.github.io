import { cardsData } from './data.js';

// Agregamos 'index' como parámetro
export function createCard(data, category, index) {
    const card = document.createElement('article');

    // Formatear el ID secuencial (Ej: 1 -> 001)
    const sequentialId = String(index + 1).padStart(3, '0');

    // 1. LÓGICA PARA NOTICIAS
    if (category === 'noticias') {
        card.className = `card-news ${data.branch || 'general'} ${data.isFeatured ? 'featured' : ''}`;
        card.innerHTML = `
        <div class="news-header">
            <span class="news-tag">${data.branch ? data.branch.toUpperCase() : 'URGENTE'}</span>
            <span class="news-date">${data.date || 'RECIENTE'}</span>
        </div>
        <div class="news-body">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
        </div>
        <div class="news-footer">
            <span class="news-id">LOG_ID: ${sequentialId}</span>
            <a href="${data.link}" class="news-link">
                LEER REPORTE <span class="material-icons">arrow_forward</span>
            </a>
        </div>
    `;
        return card;
    }

    // 2. LÓGICA PARA EDUCACIÓN (ACADEMIA)
    if (category === 'educacion') {
        card.className = `card-study ${data.branch || 'general'}`;
        card.innerHTML = `
        <div class="study-marker"></div>
        <div class="study-content">
            <div class="study-header">
                <span class="study-label">MÓDULO ACADÉMICO</span>
                <span class="study-branch">${data.branch ? data.branch.toUpperCase() : 'LEGAL'}</span>
            </div>
            <h4>${data.title}</h4>
            
            <div class="study-meta">
                <div class="meta-item">
                    <span class="material-icons">bar_chart</span>
                    <span>${data.level || 'Básico'}</span>
                </div>
                <div class="meta-item">
                    <span class="material-icons">schedule</span>
                    <span>${data.time || '10 min'}</span>
                </div>
            </div>

            <p>${data.description}</p>
            
            <div class="study-footer">
                <a href="${data.link}" class="btn-study">
                    <span class="material-icons">menu_book</span>
                    Acceder al Material
                </a>
            </div>
        </div>
    `;
        return card;
    }
    // 3. LÓGICA PARA ENSAYOS (INVESTIGACIÓN)
    // Dentro de createCard, en la sección de ensayos:
    if (category === 'ensayos') {
        card.className = `card-library ${data.branch || ''}`;
        card.innerHTML = `
        <div class="library-tab">${data.branch || 'Doctrina'}</div>
        <div class="library-content">
            <div class="library-meta">
                <span class="file-number">REF-AR-${data.date || '2024'}</span>
                
            </div>
            <h4>${data.title}</h4>
            <p class="library-abstract">${data.description}</p>
            <div class="library-footer">
                <span class="library-author">${data.author || 'QUIROGA, R.'}</span>
                <a href="${data.link}" class="library-btn">${data.linkText}</a>
            </div>
        </div>
    `;
        return card;
    }
    // Dentro de createCard, añade este bloque antes del fallback:
    if (category === 'software') {
        card.className = 'card-software';
        card.innerHTML = `
        <div class="software-ui-header">
            <span class="material-icons software-icon">${data.icon || 'terminal'}</span>
            <span class="software-version">${data.version || 'v1.0.0'}</span>
        </div>
        <div class="software-body">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
        </div>
        <div class="software-footer">
            <a href="${data.link}" class="btn-execute">
                <span class="material-icons">play_arrow</span>
                ${data.linkText}
            </a>
        </div>
    `;
        return card;
    }
    // Fallback por si hay otra categoría (estilo original)
    card.className = 'card_docs';
    card.innerHTML = `<h4>${data.title}</h4><p>${data.description}</p><a href="${data.link}">${data.linkText}</a>`;
    return card;
}

export function renderCards(containerSelector, categories) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';

    categories.forEach(category => {
        const section = document.createElement('section');
        section.className = `category-section section-${category}`;
        section.id = `section-${category}`;

        const gridClass = category === 'noticias' ? 'bento-grid' :
            category === 'ensayos' ? 'research-grid' : 'cards-grid';

        section.innerHTML = `<h3>${category.toUpperCase()}</h3><div class="${gridClass}"></div>`;
        const grid = section.querySelector(`.${gridClass}`);

        const data = cardsData[category] || [];

        // Pasamos el index (i) aquí
        data.forEach((item, i) => {
            grid.appendChild(createCard(item, category, i));
        });

        container.appendChild(section);
    });
}