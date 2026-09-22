"use client";

import { useEffect } from "react";

const SPLASH_KEY = "nilsca_splash_seen";
const SPLASH_MS = 3200;

export function ClientEffects({ splash = false }: { splash?: boolean }) {
  useEffect(() => {
    initNav();
    initMembersFilter();
    initMotion();
    if (splash) initSplashHero();
  }, [splash]);

  return null;
}

function initNav() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]") as HTMLElement | null;
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
      document.body.classList.toggle("nav-open", open);
    });
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  dropdowns.forEach((wrap) => {
    const btn = wrap.querySelector("[data-dropdown-btn]");
    const menu = wrap.querySelector("[data-dropdown-menu]") as HTMLElement | null;
    if (!btn || !menu) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle("is-open");
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((wrap) => {
      const btn = wrap.querySelector("[data-dropdown-btn]");
      const menu = wrap.querySelector("[data-dropdown-menu]") as HTMLElement | null;
      if (menu) {
        menu.classList.remove("is-open");
        menu.hidden = true;
      }
      btn?.setAttribute("aria-expanded", "false");
    });
  });
}

function initMembersFilter() {
  const input = document.querySelector("[data-member-search]") as HTMLInputElement | null;
  const rows = document.querySelectorAll("[data-member-row]");
  const empty = document.querySelector("[data-member-empty]") as HTMLElement | null;
  const countEl = document.querySelector("[data-member-count]");
  if (!input || !rows.length) return;

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const hay = (row.getAttribute("data-search") || "").toLowerCase();
      const show = !q || hay.includes(q);
      (row as HTMLElement).hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
    if (countEl) countEl.textContent = String(visible);
  };
  input.addEventListener("input", apply);
}

function initSplashHero() {
  const splash = document.querySelector("[data-splash]");
  const hero = document.querySelector("[data-hero]");
  const navLogo = document.querySelector("[data-nav-logo]");
  if (!hero) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = sessionStorage.getItem(SPLASH_KEY) === "1";

  const finish = () => {
    if (!splash || splash.classList.contains("is-done") || splash.classList.contains("is-exiting")) {
      hero.classList.add("is-revealed");
      return;
    }
    // Lift the navy veil first so the port hero shows through, then dismiss splash.
    splash.classList.add("is-exiting");
    hero.classList.add("is-revealed");
    navLogo?.classList.add("is-arriving");
    sessionStorage.setItem(SPLASH_KEY, "1");
    setTimeout(() => {
      splash.classList.add("is-done");
      splash.setAttribute("aria-hidden", "true");
    }, 850);
  };

  if (!splash || reduce || seen) {
    splash?.classList.add("is-done");
    splash?.setAttribute("aria-hidden", "true");
    hero.classList.add("is-revealed");
    return;
  }

  splash.querySelector("[data-splash-skip]")?.addEventListener("click", finish);
  setTimeout(finish, SPLASH_MS);
}

function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nodes = document.querySelectorAll("[data-reveal]");
  if (nodes.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      nodes.forEach((el) => io.observe(el));
    }
  }

  if (reduce) return;
  const hero = document.querySelector("[data-parallax-hero]");
  const layer = document.querySelector("[data-parallax-layer]") as HTMLElement | null;
  if (!hero || !layer) return;

  let ticking = false;
  let mx = 0;
  let my = 0;
  const apply = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    const view = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    layer.style.transform = `translate3d(${mx * 10}px, ${view * 36 + my * 8}px, 0) scale(1.06)`;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  if (window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (e) => {
        const r = hero.getBoundingClientRect();
        const pe = e as PointerEvent;
        mx = (pe.clientX - r.left) / r.width - 0.5;
        my = (pe.clientY - r.top) / r.height - 0.5;
        onScroll();
      },
      { passive: true }
    );
    hero.addEventListener(
      "pointerleave",
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
