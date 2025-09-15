// Basic interactive behaviors: theme toggle, reveal on scroll, mobile menu, smooth scroll

document.addEventListener('DOMContentLoaded', () => {

  // THEME
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('site-theme');
  if (stored === 'light') document.body.classList.add('light');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('site-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });

  // SMOOTH SCROLL for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth', block: 'start'}); window.history.pushState(null, '', href); }
    });
  });

  // REVEAL ON SCROLL - IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Mobile menu (simple)
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      // create a simple mobile nav overlay
      let overlay = document.getElementById('mobileNav');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mobileNav';
        overlay.innerHTML = `
          <div class="mobile-nav-inner">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <button id="closeMobile" class="btn ghost">Close</button>
          </div>`;
        document.body.appendChild(overlay);
        overlay.querySelector('#closeMobile').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (ev) => { if (ev.target === overlay) overlay.remove(); });
      } else overlay.remove();
    });
  }

});
