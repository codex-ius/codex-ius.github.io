export function setupThemeToggle(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  // Resto del código igual, pero cambia body por .landing-page
  const landingPage = document.querySelector('.landing-page');
  
  // En las funciones, reemplaza document.body por landingPage
  function updateButtonIcon() {
    if (landingPage.classList.contains('light-theme')) {
      btnToggle.innerHTML = `<span class="material-icons">light_mode</span>`;
    } else {
      btnToggle.innerHTML = `<span class="material-icons">dark_mode</span>`;
    }
  }
  
  // Toggle funciona sobre .landing-page en lugar de body
  btnToggle.addEventListener('click', () => {
    if (landingPage.classList.contains('light-theme')) {
      landingPage.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      landingPage.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
    updateButtonIcon();
  });
}
