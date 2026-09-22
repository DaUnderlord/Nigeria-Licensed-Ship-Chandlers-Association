import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/benefits", label: "Member's Benefits" },
];

export function SiteHeader({ isHome = false }: { isHome?: boolean }) {
  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b border-transparent ${
        isHome ? "text-ink" : "bg-navy/95 text-ink backdrop-blur-md"
      }`}
      data-site-header
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6 md:py-5">
        <Link href="/" className="nav-logo flex items-center gap-3.5" data-nav-logo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="h-11 w-11 object-contain md:h-12 md:w-12" width={48} height={48} />
          <span className="hidden sm:block">
            <span className="font-display block text-lg font-semibold tracking-wide text-sky md:text-xl">NILSCA</span>
            <span className="mt-0.5 block max-w-[11rem] text-[0.62rem] leading-snug tracking-wide text-ink/55 uppercase">
              Licensed Ship Chandlers
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <div className="relative" data-dropdown>
            <button
              type="button"
              className="nav-link inline-flex items-center gap-1.5"
              data-dropdown-btn
              aria-expanded="false"
            >
              Membership
              <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
                <path fill="currentColor" d="M5 7 1 3h8z" />
              </svg>
            </button>
            <div
              className="absolute top-full left-0 z-20 mt-2 min-w-[13rem] border border-sky/15 bg-navy-deep/95 py-2 shadow-2xl backdrop-blur-md"
              data-dropdown-menu
              hidden
            >
              <Link className="block px-4 py-2.5 text-[0.7rem] tracking-[0.12em] text-ink/80 uppercase transition hover:bg-sky/10 hover:text-sky" href="/membership">
                Member&apos;s List
              </Link>
              <Link className="block px-4 py-2.5 text-[0.7rem] tracking-[0.12em] text-ink/80 uppercase transition hover:bg-sky/10 hover:text-sky" href="/apply">
                Application Form
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-link">
            Contact Us
          </Link>
          <Link
            href="/admin/login"
            className="ml-3 border border-sky/35 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.14em] text-sky uppercase transition hover:border-sky hover:bg-sky hover:text-navy"
          >
            Login
          </Link>
        </nav>

        <button
          type="button"
          className="border border-ink/20 px-3.5 py-2 text-[0.68rem] tracking-[0.14em] uppercase lg:hidden"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>
      <div id="mobile-nav" className="border-t border-sky/10 bg-navy-deep px-4 py-5 lg:hidden" data-nav-panel hidden>
        <div className="flex flex-col text-ink">
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/">Home</Link>
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/about">About Us</Link>
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/benefits">Member&apos;s Benefits</Link>
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/membership">Member&apos;s List</Link>
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/apply">Application Form</Link>
          <Link className="min-h-12 border-b border-ink/10 py-3.5 text-sm tracking-[0.12em] uppercase" href="/contact">Contact Us</Link>
          <Link className="mt-4 min-h-12 border border-sky/40 py-3 text-center text-sm tracking-[0.12em] text-sky uppercase" href="/admin/login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({
  contact,
}: {
  contact?: { address?: string; email?: string; phone?: string; hours?: string };
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-navy-deep text-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:gap-8 md:px-6 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" className="h-14 w-14 object-contain" width={56} height={56} />
            <div>
              <p className="font-display text-2xl font-semibold tracking-wide text-sky">NILSCA</p>
              <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-ink/50">
                Nigeria Licensed Ship Chandlers Association
              </p>
            </div>
          </div>
          <p className="measure mt-6 text-sm leading-relaxed text-ink/60">
            The official body of licensed ship chandlers serving Nigerian ports — integrity, competence, and lawful supply.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-ink/65">
            <li><Link className="transition hover:text-sky" href="/about">About Us</Link></li>
            <li><Link className="transition hover:text-sky" href="/membership">Member&apos;s List</Link></li>
            <li><Link className="transition hover:text-sky" href="/apply">Join / Apply</Link></li>
            <li><Link className="transition hover:text-sky" href="/benefits">Member&apos;s Benefits</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Main Office</p>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/65">
            <li>{contact?.address ?? "38 Bombay Crescent, Apapa, Lagos, Nigeria"}</li>
            <li>
              <a className="transition hover:text-sky" href={`mailto:${contact?.email ?? "shipchandlersassos@gmail.com"}`}>
                {contact?.email ?? "shipchandlersassos@gmail.com"}
              </a>
            </li>
            <li>
              <a className="transition hover:text-sky" href={`tel:${(contact?.phone ?? "+2348146679532").replace(/\s+/g, "")}`}>
                {contact?.phone ?? "+234 814 667 9532"}
              </a>
            </li>
            <li className="text-ink/45">{contact?.hours ?? "Mon–Friday 8am – 5pm"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 px-4 py-5 text-center text-[0.7rem] tracking-wide text-ink/35">
        © {year} Nigeria Licensed Ship Chandlers Association® · All Rights Reserved
      </div>
    </footer>
  );
}
