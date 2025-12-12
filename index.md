---
layout: home
title: Codex_Ius - Portal de Educación Jurídica
---
---
layout: home
title: Codex_Ius - Portal de Educación Jurídica
permalink: /
nav_exclude: true
---

<div class="landing-page light-theme">  <!-- ← Clase principal + tema por defecto -->

{::nomarkdown}
<header class="site-header">
  <div class="header-content">
    <h1 class="site-title">Codex_Ius: <span id="animated-text">aprender;</span></h1>
    <p class="site-subtitle">Portal de Educación Jurídica</p>
  </div>
</header>

<nav class="landing-nav">
  <a href="#recomendaciones">Recomendaciones</a>
  <a href="#legislacion">Legislación</a>
  <a href="#teoriaJuridica">Teoría Jurídica</a>
  <a href="#appsJuridicas">Apps Jurídicas</a>
</nav>
{:/nomarkdown}

<main>
  <section id="recomendaciones" class="landing-section">
    <h2>Recomendaciones</h2>
    <div class="cards-grid">
      <a href="{{ site.baseurl }}/sources/res_lex/cn.html" class="card-link">Constitución Nacional</a>
      <a href="{{ site.baseurl }}/sources/res_lex/cpmdz.html" class="card-link">Constitución de Mendoza</a>
      <a href="{{ site.baseurl }}/sources/res_lex/ccyc.html" class="card-link">Código Civil y Comercial</a>
      <a href="{{ site.baseurl }}/sources/res_lex/cpn.html" class="card-link">Código Penal Nacional</a>
      <a href="{{ site.baseurl }}/sources/res_lex/cpcct.html" class="card-link">CPCCT Mendoza</a>
      <a href="{{ site.baseurl }}/sources/res_lex/cppmdz.html" class="card-link">CPPM Mendoza</a>
      <a href="https://drive.google.com/file/d/1q0Ah2P3CvcX9f7xQKb02gqOwChNsM5kO/view?usp=drive_link" class="card-link" target="_blank">Ensayo Respuesta al Delito</a>
      <a href="https://drive.google.com/file/d/1i8xF9AFIhN2lA9e7CQmIlpyzm9srZhqN/view?usp=drive_link" class="card-link" target="_blank">Crítica Sistema Penal</a>
      <a href="{{ site.baseurl }}/sources/res_archive/procesal.html" class="card-link">Repaso Procesal</a>
    </div>
  </section>

  <section id="legislacion" class="landing-section">
  <h2>Legislación</h2>
  <input id="search-input" type="search" placeholder="Buscar leyes...">
  <div id="leyes" class="leyes-grid"></div>  <!-- ← JS lo llena automáticamente -->
</section>


  <section id="teoriaJuridica" class="landing-section">
    <h2>Teoría Jurídica</h2>
    <div id="cards-container" class="cards-grid"></div>
  </section>

  <section id="appsJuridicas" class="landing-section">
    <h2>Apps Jurídicas</h2>
    <div class="cards-grid">
      <div class="card_docs">
        <h4>Calculadora: Liquidación Final</h4>
        <p>Calculadora básica de rubros indemnizatorios laborales según legislación argentina. Útil para practicar programación.</p>
        <a href="{{ site.baseurl }}/sources/res_app/calculadora.html">Probar Calculadora</a>
      </div>
      <div class="card_docs">
        <h4>Calculadora Previsional</h4>
        <p>Calculadora básica de años de servicio previsional.</p>
        <a href="{{ site.baseurl }}/sources/res_app/previsional.html">Probar Calculadora</a>
      </div>
    </div>
  </section>
</main>

{::nomarkdown}
<footer class="site-footer">
  <div class="footer-content">
    <h3>Contacto</h3>
    <p><strong>Autor:</strong> Quiroga Rodrigo Alberto</p>
    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rodrigo-quiroga/" target="_blank" rel="noopener noreferrer">Mi Perfil</a></p>
    <p><strong>GitHub:</strong> <a href="https://github.com/RodrigoAQuiroga" target="_blank" rel="noopener noreferrer">Mi Repositorio</a></p>
    <p>Iconos de <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">icons8.com</a></p>
  </div>
</footer>

<!-- Botón toggle tema -->
<div id="theme-toggle-container">
  <button id="theme-toggle" title="Cambiar tema">🌙</button>
</div>

<script type="module" src="{{ site.baseurl }}/assets/js/main.js"></script>
{:/nomarkdown}
</div>  <!-- Cierra .landing-page -->

<div style="text-align: center; padding: 2rem;">
  <h1 style="font-size: 3rem; margin-bottom: 0;">
    Codex_Ius: <span id="animated-text" style="color: #0066cc; font-family: monospace;">aprender, enseñar, servir;</span>
  </h1>
  <h2 style="color: #666; margin-top: 0;">Portal de Educación Jurídica Argentina</h2>
</div>

## 📋 Secciones Principales

| Sección | Descripción | 
|---------|-------------|
| [📚 **Legislación**](legislacion/) | Constituciones, Códigos, Leyes actualizadas |
| [📖 **Teoría Jurídica**](teoria-juridica/) | Ensayos, doctrina y análisis |
| [⚖️ **Apps Jurídicas**](/apps/) | Calculadoras interactivas legales |
| [📋 **Ediciones**](/ediciones/) | Revista CODEX IUS completa |

## ✨ Próximamente
- Buscador global de leyes
- Calculadoras laborales
- Última jurisprudencia CSJN
