import { 
    procesarDatosAnt, 
    procesarDatos, 
    calculoMonotributoAportante 
} from './procesarDatos.js';
import { datosSujeto } from './datosSujeto.js';
import { resumen } from './resumen.js';

/**
 * Control de navegación por pestañas
 * @param {string} tabName - ID del contenedor a mostrar
 * @param {HTMLElement} elmnt - Botón que disparó la acción
 */
function openTab(tabName, elmnt) {
    // Ocultar todos los contenidos de pestañas
    const tabs = document.querySelectorAll('.tabcontent');
    tabs.forEach(tab => tab.style.display = 'none');

    // Quitar la clase 'active' de todos los botones
    const buttons = document.querySelectorAll('.tablink');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar la pestaña actual y marcar el botón como activo
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = 'block';
    }
    if (elmnt) {
        elmnt.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Pestañas ---
    const tabButtons = document.querySelectorAll('.tablink');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            openTab(tabId, button);
        });
    });

    // Activar la primera pestaña por defecto (Datos Personales)
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    // --- Vinculación de Botones de Acción ---

    // 1. Datos Personales
    const btnSujeto = document.getElementById('btnDatosSujeto');
    if (btnSujeto) btnSujeto.addEventListener('click', datosSujeto);

    // 2. Procesar Datos Históricos (Pre-94)
    const btnAnt = document.getElementById('btnProcesarAnt');
    if (btnAnt) btnAnt.addEventListener('click', procesarDatosAnt);

    // 3. Procesar Datos SIJP (Post-94)
    const btnDesde = document.getElementById('btnProcesarDesde');
    if (btnDesde) btnDesde.addEventListener('click', procesarDatos);

    // 4. Procesar Monotributo/Autónomos
    const btnMono = document.getElementById('btnProcesarMono');
    if (btnMono) btnMono.addEventListener('click', calculoMonotributoAportante);

    // 5. Generar Resumen Final Unificado
    const btnResumen = document.getElementById('btnResumen');
    if (btnResumen) btnResumen.addEventListener('click', resumen);
});