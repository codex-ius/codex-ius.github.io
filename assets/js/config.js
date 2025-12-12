export function createSections(objeto, description, contenedor) {
  const mainContainer = document.getElementById(contenedor);
  if (!mainContainer) return; // Seguridad
  
  const sectionContainer = document.createElement('div');
  const leyesContainer = document.createElement('div');
  const titleContenedor = document.createElement('h3');
  
  titleContenedor.textContent = description;
  sectionContainer.className = 'divContainer_links';
  sectionContainer.appendChild(titleContenedor);
  
  objeto.forEach((x) => {
    // Rutas Jekyll: ./sources → {{ site.baseurl }}/sources
    const jekyllUrl = x.url.replace('./', '{{ site.baseurl }}/');
    const link = createLink(x.title, jekyllUrl);
    leyesContainer.appendChild(link);
  });
  
  sectionContainer.appendChild(leyesContainer);
  mainContainer.appendChild(sectionContainer);
}

function createLink(title, url) {
  const a = document.createElement('a');
  a.href = url;
  a.className = "card-link linksLeyes";  // Clases CSS compatibles
  a.textContent = title;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}
