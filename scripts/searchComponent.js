export function setupSearchComponent() {
  const header = document.querySelector('header');
  const body = document.body;

  const nav = document.createElement('nav');
  const form = document.createElement('form');
  form.id = 'search-form';

  const input = document.createElement('input');
  input.id = 'search-input';
  input.type = 'text';
  input.placeholder = 'Nro Art. (ej: 25)';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Buscar Art.';

  form.appendChild(input);
  form.appendChild(button);
  nav.appendChild(form);

  if (header.nextSibling) {
    body.insertBefore(nav, header.nextSibling);
  } else {
    body.appendChild(nav);
  }

  const contentElement = document.getElementById("content");
  let articleParagraphs = []; // Guardar párrafos de artículos encontrados

  const observer = new MutationObserver(() => {
    clearArticleHighlights();
  });
  
  observer.observe(contentElement, { 
    childList: true, 
    subtree: true,
    characterData: true 
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    findArticle();
  });

  input.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      findArticle();
    }
  });

  function clearArticleHighlights() {
    articleParagraphs.forEach(p => {
      p.classList.remove('article-highlight');
    });
    articleParagraphs = [];
  }

  function findArticle() {
    const articleNumber = input.value.trim();
    if (!/^\d+$/.test(articleNumber)) {
      alert("Ingrese solo números (ej: 25)");
      return;
    }

    clearArticleHighlights();
    
    // Buscar TODOS los párrafos que contengan "Art. N°.-"
    const regex = new RegExp(`Art\\.\\s*${articleNumber}\\s*\\.\\-`, 'gi');
    const allParagraphs = contentElement.querySelectorAll('p, div');
    let foundAny = false;

    allParagraphs.forEach(paragraph => {
      if (regex.test(paragraph.textContent)) {
        paragraph.classList.add('article-highlight');
        articleParagraphs.push(paragraph);
        foundAny = true;
      }
    });
    
    if (foundAny && articleParagraphs.length > 0) {
      // Scroll al primer párrafo encontrado
      articleParagraphs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      articleParagraphs[0].focus();
    } else {
      alert(`Artículo ${articleNumber} no encontrado`);
    }
  }
}
