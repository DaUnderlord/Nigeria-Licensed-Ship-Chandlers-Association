import '../css/main.css';
import { initSplashHero } from './splash-hero.js';
import { initNav } from './nav.js';
import { initMembersFilter } from './members.js';
import { initMotion } from './motion.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSplashHero();
  initMembersFilter();
  initMotion();
});
