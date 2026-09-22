const SPLASH_KEY = 'nilsca_splash_seen';
const SPLASH_MS = 3200;

export function initSplashHero() {
  const splash = document.querySelector('[data-splash]');
  const hero = document.querySelector('[data-hero]');
  const navLogo = document.querySelector('[data-nav-logo]');

  if (!hero) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem(SPLASH_KEY) === '1';

  const finish = () => {
    if (splash) {
      splash.classList.add('is-done');
      setTimeout(() => splash.setAttribute('aria-hidden', 'true'), 950);
    }
    hero.classList.add('is-revealed');
    if (navLogo) navLogo.classList.add('is-arriving');
    sessionStorage.setItem(SPLASH_KEY, '1');
  };

  if (!splash || reduce || seen) {
    if (splash) {
      splash.classList.add('is-done');
      splash.setAttribute('aria-hidden', 'true');
    }
    hero.classList.add('is-revealed');
    return;
  }

  const skip = splash.querySelector('[data-splash-skip]');
  if (skip) skip.addEventListener('click', finish);

  setTimeout(finish, SPLASH_MS);
}
