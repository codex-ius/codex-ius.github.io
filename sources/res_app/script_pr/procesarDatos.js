// Usaremos un Map global para unificar periodos y evitar duplicados
// La llave será "YYYY-MM" y el valor será un objeto con el detalle
let lineaDeTiempoGlobal = new Map();
let datosDependenciaGlobal = []; 

// --- FUNCIONES DE UTILIDAD ---

function periodoAMeses(periodo) { // "MM/YYYY" -> total meses
    const [mm, yyyy] = periodo.split('/').map(Number);
    return yyyy * 12 + (mm - 1);
}

function mesesAPeriodo(totalMeses) { // total meses -> "MM/YYYY"
    const yyyy = Math.floor(totalMeses / 12);
    const mm = (totalMeses % 12) + 1;
    return `${mm.toString().padStart(2, '0')}/${yyyy}`;
}

function formatearTiempo(totalMeses) {
    const anios = Math.floor(totalMeses / 12);
    const meses = totalMeses % 12;
    return `${anios} años, ${meses} meses`;
}

// --- PROCESAMIENTO ---

export function procesarDatosAnt() {
    const input = document.getElementById('inputTextAnt').value.trim();
    if (!input) return alert('Pega los datos primero.');

    const lines = input.split('\n').filter(l => l.trim());
    // Regex mejorada para capturar servicios pre-94
    const regex = /^(.+?)\s+(\d+)\s+(\d{4})\s+(\d+)\s+(\d{2}\/\d{2})\s*-\s*(\d{2}\/\d{2})\s+(\d+)/i;
    
    let html = '<table><thead><tr><th>RAZÓN SOCIAL</th><th>AÑO</th><th>MESES</th></tr></thead><tbody>';

    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            const [_, social, cuenta, anio, caracter, desde, hasta, meses] = match;
            const cantMeses = parseInt(meses);
            
            // Simulación de periodos para la línea de tiempo (simplificado para pre-94)
            // Se asume que los meses trabajados en el año no se solapan internamente
            for(let i = 0; i < cantMeses; i++) {
                lineaDeTiempoGlobal.set(`${anio}-${i}`, { tipo: 'Antiguo', social });
            }

            html += `<tr><td>${social}</td><td>${anio}</td><td>${cantMeses}</td></tr>`;
        }
    });

    html += '</tbody></table>';
    document.getElementById('resultadoAnt').innerHTML = html;
}

export function procesarDatos() {
    const input = document.getElementById('inputText').value.trim();
    if (!input) return alert('Pega los datos primero.');

    const lines = input.split('\n').filter(l => l.trim());
    // Regex más flexible con espacios (\s+)
    const regex = /^(.+?)\s+(\d{2}-\d{8}-\d)\s+([EC])\s*([A-Z]?)\s+(\d{2}\/\d{4})\s+(\d+)\s+(\d+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/i;

    let resultados = [];

    lines.forEach(line => {
        const m = line.match(regex);
        if (m) {
            const periodo = m[5];
            const [mm, yyyy] = periodo.split('/');
            const remTotal = parseFloat(m[8].replace(/\./g, '').replace(',', '.'));
            
            const dato = {
                social: m[1].trim(),
                cuit: m[2],
                tipo: m[3], // E o C
                periodo,
                mesAnioKey: `${yyyy}-${mm}`,
                remTotal,
                sac: parseFloat(m[11].replace(/\./g, '').replace(',', '.'))
            };

            resultados.push(dato);
            // Unificamos en la línea de tiempo: Si ya existe (ej. por monotributo), prevalece Dependencia
            lineaDeTiempoGlobal.set(dato.mesAnioKey, { tipo: 'Dependencia', social: dato.social });
        }
    });

    datosDependenciaGlobal = resultados; 
    renderizarTablaDependencia(resultados);
}

function renderizarTablaDependencia(datos) {
    let html = '<table><thead><tr><th>EMPRESA</th><th>PERIODO</th><th>REM. TOTAL</th></tr></thead><tbody>';
    datos.forEach(d => {
        html += `<tr><td>${d.social}</td><td>${d.periodo}</td><td>$${d.remTotal.toLocaleString()}</td></tr>`;
    });
    html += '</tbody></table>';
    
    // Calculamos últimos 120 (sin contar SAC para el promedio mensual puro)
    const ultimos120 = datos.filter(d => d.sac === 0).slice(-120);
    const suma = ultimos120.reduce((acc, curr) => acc + curr.remTotal, 0);
    
    html += `<h3>Promedio últimos 120 aportes (Base PBU/PC/PAP)</h3>`;
    html += `<p>Total: $${suma.toLocaleString()} | Promedio: $${(suma/120).toLocaleString()}</p>`;
    
    document.getElementById('resultado').innerHTML = html;
}

export function calculoMonotributoAportante() {
    const input = document.getElementById('inputMonotributo').value.trim();
    if (!input) return alert('Pega los datos primero.');

    const lines = input.split('\n').filter(l => l.trim());
    const regex = /^(\d+)\s+(\d{2}\/\d{4})\s+([\d\/]{7}|-)\s+MONOTRIBUTO/i;

    lines.forEach(line => {
        const m = line.match(regex);
        if (m) {
            const desde = periodoAMeses(m[2]);
            const hastaRaw = m[3];
            const hoy = new Date();
            const hasta = hastaRaw === '-' ? 
                periodoAMeses(`${hoy.getMonth()+1}/${hoy.getFullYear()}`) : 
                periodoAMeses(hastaRaw);

            for (let i = desde; i <= hasta; i++) {
                const key = mesesAPeriodo(i).split('/').reverse().join('-'); // YYYY-MM
                // Solo agrega si no existe un aporte de dependencia en ese mes (prioridad Dependencia)
                if (!lineaDeTiempoGlobal.has(key)) {
                    lineaDeTiempoGlobal.set(key, { tipo: 'Monotributo' });
                }
            }
        }
    });

    const totalMeses = Array.from(lineaDeTiempoGlobal.values()).filter(v => v.tipo === 'Monotributo').length;
    document.getElementById('resultadoMonotributo').innerHTML = `
        <p>Aportes exclusivos Monotributo detectados: ${totalMeses} meses (${formatearTiempo(totalMeses)})</p>
    `;
}

// Esta función es nueva: Es la que realmente dice cuánto tiempo tiene en total sin duplicados
export function obtenerResumenFinal() {
    const totalMesesSinDuplicados = lineaDeTiempoGlobal.size;
    return {
        totalMeses: totalMesesSinDuplicados,
        texto: formatearTiempo(totalMesesSinDuplicados)
    };
}