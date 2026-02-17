// cards.js (Modificación estratégica)
export function createCard(data, category, index) {
    const card = document.createElement('article');
    const sequentialId = String(index + 1).padStart(3, '0');
    
    // Clase maestra para Glass-Organic + Neumorphism
    card.className = `glass-card category-${category} ${data.isFeatured ? 'featured' : ''}`;
    card.setAttribute('data-branch', data.branch || 'general');

    // LÓGICA DE CONTENIDO (Mantenemos tu estructura pero limpiamos clases CSS redundantes)
    if (category === 'noticias') {
        card.innerHTML = `
            <div class="card-glass-overlay"></div>
            <div class="card-content">
                <div class="card-header">
                    <span class="tag">${data.branch?.toUpperCase() || 'URGENTE'}</span>
                    <span class="date">${data.date || 'RECIENTE'}</span>
                </div>
                <h4>${data.title}</h4>
                <p>${data.description}</p>
                <div class="card-footer">
                    <span class="id">LOG_ID: ${sequentialId}</span>
                    <a href="${data.link}" class="btn-neu">REPORTE <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>`;
    } 
    else if (category === 'educacion') {
        card.innerHTML = `
            <div class="card-glass-overlay"></div>
            <div class="card-content">
                <div class="card-header">
                    <span class="tag">ACADEMIA</span>
                    <span class="branch">${data.branch?.toUpperCase()}</span>
                </div>
                <h4>${data.title}</h4>
                <div class="meta">
                    <span><i class="material-icons">bar_chart</i> ${data.level}</span>
                    <span><i class="material-icons">schedule</i> ${data.time}</span>
                </div>
                <p>${data.description}</p>
                <a href="${data.link}" class="btn-neu"><i class="material-icons">menu_book</i> ACCEDER</a>
            </div>`;
    }
    // ... repetir lógica similar para ensayos y software ...
    // La clave es que TODOS usen .glass-card y .btn-neu
    return card;
}
