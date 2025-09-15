// Interactive behaviors: theme toggle, reveal-on-scroll, mobile menu, smooth scroll, email copy

document.addEventListener('DOMContentLoaded', () => {

  // THEME: persist in localStorage
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('site-theme');
  if (stored === 'light') document.body.classList.add('light');

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
    // small blink for feedback
    themeToggle.animate([{transform:'scale(0.95)'},{transform:'scale(1)'}],{duration:180});
  });

  // SMOOTH SCROLL for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth', block: 'start'}); }
    });
  });

  // REVEAL ON SCROLL
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, {threshold: 0.14});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // MOBILE MENU: builds overlay nav
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    let overlay = document.getElementById('mobileNav');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobileNav';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '80';
      overlay.style.background = 'linear-gradient(180deg, rgba(2,6,23,0.96), rgba(2,6,23,0.98))';
      overlay.innerHTML = `
        <div style="padding:28px;display:flex;flex-direction:column;gap:18px;">
          <a href="#about" style="font-size:20px;color:#fff;text-decoration:none">About</a>
          <a href="#projects" style="font-size:20px;color:#fff;text-decoration:none">Projects</a>
          <a href="#experience" style="font-size:20px;color:#fff;text-decoration:none">Experience</a>
          <a href="#education" style="font-size:20px;color:#fff;text-decoration:none">Education</a>
          <a href="#contact" style="font-size:20px;color:#fff;text-decoration:none">Contact</a>
          <button id="closeMobile" style="margin-top:12px;padding:10px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.06);color:#fff">Close</button>
        </div>
      `;
      document.body.appendChild(overlay);
      document.getElementById('closeMobile').addEventListener('click', () => overlay.remove());
      overlay.addEventListener('click', (ev) => { if (ev.target === overlay) overlay.remove(); });
    } else {
      overlay.remove();
    }
  });

  // EMAIL COPY: click email to copy to clipboard
  const emailLink = document.getElementById('emailLink');
  if (navigator.clipboard && emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailLink.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const old = emailLink.textContent;
        emailLink.textContent = 'Copied ✓';
        setTimeout(()=> emailLink.textContent = old, 1600);
      });
    });
  }

});
