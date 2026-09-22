export function initNav() {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
      document.body.classList.toggle('nav-open', open);
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        panel.classList.remove('is-open');
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  dropdowns.forEach((wrap) => {
    const btn = wrap.querySelector('[data-dropdown-btn]');
    const menu = wrap.querySelector('[data-dropdown-menu]');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle('is-open');
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach((wrap) => {
      const btn = wrap.querySelector('[data-dropdown-btn]');
      const menu = wrap.querySelector('[data-dropdown-menu]');
      if (menu) {
        menu.classList.remove('is-open');
        menu.hidden = true;
      }
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
}
