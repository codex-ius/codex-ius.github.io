import { obtenerResumenFinal } from './procesarDatos.js';

export function resumen() {
    // 1. Obtener los contenedores de resultados actuales
    const datosSujetoHTML = document.getElementById('resultadoSujeto').innerHTML.trim();
    const datosAntHTML = document.getElementById('resultadoAnt').innerHTML.trim();
    const datosDesdeHTML = document.getElementById('resultado').innerHTML.trim();
    const monotributoHTML = document.getElementById('resultadoMonotributo').innerHTML.trim();

    // 2. Obtener el cálculo unificado (el corazón de la calculadora)
    const computoFinal = obtenerResumenFinal();

    let resumenHTML = '<div class="resumen-impresion">';

    resumenHTML += '<h1>Informe de Cómputo Previsional</h1>';

    // Sección de Datos Personales
    resumenHTML += '<section>';
    resumenHTML += '<h3>1. Datos del Titular</h3>';
    resumenHTML += datosSujetoHTML || '<p>No se cargaron datos personales.</p>';
    resumenHTML += '</section>';

    // Sección de Cómputo Total (Lo más importante)
    resumenHTML += '<section style="background-color: #f0f6fc; padding: 15px; border-radius: 8px; border: 2px solid #2a6ebb; margin: 20px 0;">';
    resumenHTML += '<h2 style="margin-top:0;">RESUMEN TOTAL DE SERVICIOS</h2>';
    resumenHTML += `<p style="font-size: 1.5rem; color: #1a3f90;">Total Unificado: <strong>${computoFinal.texto}</strong></p>`;
    resumenHTML += `<p style="color: #555; font-size: 0.9rem;">(Cómputo neto eliminando superposiciones entre regímenes)</p>`;
    resumenHTML += '</section>';

    // Desglose por periodos
    resumenHTML += '<section>';
    resumenHTML += '<h3>2. Detalle de Servicios Anteriores (Pre-94)</h3>';
    resumenHTML += datosAntHTML || '<p>Sin datos cargados.</p>';
    resumenHTML += '</section>';

    resumenHTML += '<section>';
    resumenHTML += '<h3>3. Detalle de Servicios SIJP (Post-94)</h3>';
    resumenHTML += datosDesdeHTML || '<p>Sin datos cargados.</p>';
    resumenHTML += '</section>';

    resumenHTML += '<section>';
    resumenHTML += '<h3>4. Historial de Monotributo/Autónomos (PUC)</h3>';
    resumenHTML += monotributoHTML || '<p>Sin datos cargados.</p>';
    resumenHTML += '</section>';

    resumenHTML += '</div>';

    const contenedorResumen = document.getElementById('resultadoResumen');
    contenedorResumen.innerHTML = resumenHTML;

    // 3. Crear botón de impresión
    const btnImprimir = document.createElement('button');
    btnImprimir.textContent = 'Imprimir Informe';
    btnImprimir.className = 'printbutton';
    btnImprimir.style.width = '100%';
    btnImprimir.style.marginTop = '20px';

    btnImprimir.addEventListener('click', () => {
        window.print();
    });

    contenedorResumen.appendChild(btnImprimir);
}