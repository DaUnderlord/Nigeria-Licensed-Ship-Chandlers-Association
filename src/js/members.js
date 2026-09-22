export function initMembersFilter() {
  const input = document.querySelector('[data-member-search]');
  const rows = document.querySelectorAll('[data-member-row]');
  const empty = document.querySelector('[data-member-empty]');
  const countEl = document.querySelector('[data-member-count]');
  if (!input || !rows.length) return;

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const hay = (row.getAttribute('data-search') || '').toLowerCase();
      const show = !q || hay.includes(q);
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
    if (countEl) countEl.textContent = String(visible);
  };

  input.addEventListener('input', apply);
}
