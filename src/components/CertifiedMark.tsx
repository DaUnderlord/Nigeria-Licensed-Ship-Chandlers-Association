export function CertifiedMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`certified-mark${light ? " is-light" : ""}`}
      title="Certified member"
    >
      <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.2 8.3 6.4 11.4 12.8 4.6"
        />
      </svg>
      <span className="sr-only">Certified member</span>
    </span>
  );
}
