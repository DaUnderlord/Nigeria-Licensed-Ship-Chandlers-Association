export function initMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initRevealOnScroll(reduce);
  if (!reduce) {
    initHeroParallax();
  }
}

function initRevealOnScroll(reduce) {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (!nodes.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  nodes.forEach((el) => io.observe(el));
}

function initHeroParallax() {
  const hero = document.querySelector('[data-parallax-hero]');
  const layer = document.querySelector('[data-parallax-layer]');
  if (!hero || !layer) return;

  let ticking = false;
  let mx = 0;
  let my = 0;

  const apply = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    const view = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    const scrollY = view * 36;
    const tiltX = mx * 10;
    const tiltY = my * 8;
    layer.style.transform = `translate3d(${tiltX}px, ${scrollY + tiltY}px, 0) scale(1.06)`;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener(
      'pointermove',
      (e) => {
        const r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
        onScroll();
      },
      { passive: true }
    );
    hero.addEventListener(
      'pointerleave',
      () => {
        mx = 0;
        my = 0;
        onScroll();
      },
      { passive: true }
    );
  }

  apply();
}
