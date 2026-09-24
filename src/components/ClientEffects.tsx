"use client";

import { useEffect } from "react";

const SPLASH_KEY = "nilsca_splash_seen";
const SPLASH_MS = 3600;

export function ClientEffects({ splash = false }: { splash?: boolean }) {
  useEffect(() => {
    initNav();
    initMembersFilter();
    initMotion();
    initHeroSlider();
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
  if (input.value.trim()) apply();
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
    }, 900);
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

function initHeroSlider() {
  const slides = [...document.querySelectorAll("[data-hero-slide]")] as HTMLVideoElement[];
  const dots = [...document.querySelectorAll("[data-hero-dot]")];
  if (!slides.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector("[data-hero]");
  const fadeMs = 1100;
  let index = 0;
  let started = false;
  const resetTimers = new Map<HTMLVideoElement, number>();

  const syncDots = () => {
    dots.forEach((el, i) => {
      const on = i === index;
      el.classList.toggle("is-active", on);
      (el as HTMLElement).style.setProperty("--progress", "0");
      if (on) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
  };

  const updateProgress = () => {
    const active = slides[index];
    const activeDot = dots[index] as HTMLElement | undefined;
    if (!active || !activeDot || !active.duration || !Number.isFinite(active.duration)) return;
    const progress = Math.min(Math.max(active.currentTime / active.duration, 0), 1);
    activeDot.style.setProperty("--progress", String(progress));
  };

  let raf = 0;
  const tick = () => {
    updateProgress();
    raf = window.requestAnimationFrame(tick);
  };

  const clearReset = (video: HTMLVideoElement) => {
    const timer = resetTimers.get(video);
    if (timer) window.clearTimeout(timer);
    resetTimers.delete(video);
  };

  const queueReset = (video: HTMLVideoElement) => {
    clearReset(video);
    const timer = window.setTimeout(() => {
      if (video.classList.contains("is-active")) return;
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek before metadata */
      }
      resetTimers.delete(video);
    }, fadeMs + 50);
    resetTimers.set(video, timer);
  };

  const playActive = () => {
    slides.forEach((video, i) => {
      const on = i === index;
      video.classList.toggle("is-active", on);
      if (on) {
        clearReset(video);
        if (!reduce) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => undefined);
          }
        } else {
          video.pause();
        }
      } else {
        video.pause();
        queueReset(video);
      }
    });
    syncDots();
  };

  const show = (next: number) => {
    index = (next + slides.length) % slides.length;
    playActive();
  };

  slides.forEach((video, i) => {
    video.muted = true;
    video.playsInline = true;
    video.loop = slides.length === 1;
    video.addEventListener("ended", () => {
      if (i !== index) return;
      if (slides.length < 2) {
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
        video.play().catch(() => undefined);
        return;
      }
      show(index + 1);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => show(i));
  });

  document.addEventListener("visibilitychange", () => {
    const active = slides[index];
    if (!active) return;
    if (document.hidden) active.pause();
    else if (started && !reduce) active.play().catch(() => undefined);
  });

  const begin = () => {
    if (started) return;
    started = true;
    playActive();
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(tick);
  };

  if (hero?.classList.contains("is-revealed")) {
    begin();
  } else if (hero) {
    const mo = new MutationObserver(() => {
      if (hero.classList.contains("is-revealed")) {
        mo.disconnect();
        begin();
      }
    });
    mo.observe(hero, { attributes: true, attributeFilter: ["class"] });
  } else {
    begin();
  }
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
        { rootMargin: "0px 0px -4% 0px", threshold: 0.05 }
      );
      nodes.forEach((el) => io.observe(el));
    }
  }
}
