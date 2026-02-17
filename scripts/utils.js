export function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Para evitar múltiples ejecuciones en scroll o resize
export function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Gestiona el comportamiento de acordeón para elementos <details>
 * Optimizado para la estética Glass-Organic
 */
export function setupDetailsToggle(selector = 'details') {
  const allDetails = document.querySelectorAll(selector);

  allDetails.forEach(detail => {
    detail.addEventListener('toggle', function () {
      if (this.open) {
        // Cerramos los demás con una transición lógica
        allDetails.forEach(otherDetail => {
          if (otherDetail !== this && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });
}
