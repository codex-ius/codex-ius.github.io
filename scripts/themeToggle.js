export function setupThemeToggle(mainSelector) {
  const main = document.querySelector(mainSelector);
  const divContainer = document.createElement('div');
  divContainer.id = 'theme-toggle-container';
  // Insertamos al final del body para que flote sobre todo con glassmorphism
  document.body.appendChild(divContainer);

  const btnToggle = document.createElement('button');
  btnToggle.id = 'btn-theme-toggle';
  btnToggle.className = 'btn-neu'; // Aplicamos clase neumórfica

  const btnTop = document.createElement('button');
  btnTop.id = 'btn-back-to-top';
  btnTop.className = 'btn-neu';
  btnTop.innerHTML = `<span class="material-icons">north</span>`;

  divContainer.appendChild(btnToggle);
  divContainer.appendChild(btnTop);

  const body = document.body;

  function updateButtonIcon() {
    const isLight = body.classList.contains('light-theme');
    btnToggle.innerHTML = isLight 
      ? `<span class="material-icons">light_mode</span>` 
      : `<span class="material-icons">dark_mode</span>`;
  }

  // Persistencia de tema
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') body.classList.add('light-theme');
  updateButtonIcon();

  btnToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    updateButtonIcon();
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mostrar/Ocultar botón "top" según scroll
  window.addEventListener('scroll', () => {
    btnTop.style.opacity = window.scrollY > 300 ? '1' : '0';
    btnTop.style.pointerEvents = window.scrollY > 300 ? 'all' : 'none';
  });
}
