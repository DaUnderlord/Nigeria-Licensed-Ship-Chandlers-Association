import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/benefits", label: "Member's Benefits" },
];

export function SiteHeader({ isHome = false }: { isHome?: boolean }) {
  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
        isHome ? "border-transparent text-ink" : "border-sky/10 bg-navy text-ink"
      }`}
      data-site-header
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="nav-logo flex items-center gap-3" data-nav-logo>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="h-10 w-10 object-contain md:h-11 md:w-11" width={44} height={44} />
          <span className="hidden sm:block">
            <span className="font-display block text-sm font-bold tracking-wide text-sky md:text-base">NILSCA</span>
            <span className="block max-w-[14rem] text-[0.65rem] leading-tight text-ink/60">Licensed Ship Chandlers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky">
              {l.label}
            </Link>
          ))}
          <div className="relative" data-dropdown>
            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky"
              data-dropdown-btn
              aria-expanded="false"
            >
              Membership
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path fill="currentColor" d="M5 7 1 3h8z" />
              </svg>
            </button>
            <div className="absolute top-full left-0 z-20 mt-1 hidden min-w-[12rem] border border-sky/20 bg-navy-deep/95 py-2 shadow-xl backdrop-blur is-open:block" data-dropdown-menu hidden>
              <Link className="block px-4 py-2 text-xs tracking-wide uppercase hover:bg-sky/10 hover:text-sky" href="/membership">
                Member&apos;s List
              </Link>
              <Link className="block px-4 py-2 text-xs tracking-wide uppercase hover:bg-sky/10 hover:text-sky" href="/apply">
                Application Form
              </Link>
            </div>
          </div>
          <Link href="/contact" className="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky">
            Contact Us
          </Link>
          <Link
            href="/admin/login"
            className="ml-2 border border-sky/40 px-3 py-2 text-xs font-semibold tracking-wider text-sky uppercase transition hover:bg-sky hover:text-navy"
          >
            Login
          </Link>
        </nav>

        <button
          type="button"
          className="border border-ink/20 px-3 py-2 text-xs tracking-wider uppercase lg:hidden"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>
      <div id="mobile-nav" className="border-t border-sky/10 bg-navy-deep px-4 py-4 lg:hidden" data-nav-panel hidden>
        <div className="flex flex-col gap-1 text-ink">
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/">Home</Link>
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/about">About Us</Link>
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/benefits">Member&apos;s Benefits</Link>
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/membership">Member&apos;s List</Link>
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/apply">Application Form</Link>
          <Link className="min-h-11 py-3 text-sm tracking-wider uppercase" href="/contact">Contact Us</Link>
          <Link className="mt-2 min-h-11 border border-sky/40 py-3 text-center text-sm tracking-wider text-sky uppercase" href="/admin/login">
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
    <footer className="mt-auto border-t border-navy/10 bg-navy text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" className="h-12 w-12 object-contain" width={48} height={48} />
            <div>
              <p className="font-display text-lg font-bold tracking-wide text-sky">NILSCA</p>
              <p className="text-xs text-ink/55">Nigeria Licensed Ship Chandlers Association</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/65">
            Licensed ship chandlers serving Nigerian ports under national legislation and international best practice.
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.15em] text-sky uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li><Link className="hover:text-sky" href="/about">About Us</Link></li>
            <li><Link className="hover:text-sky" href="/membership">Member&apos;s List</Link></li>
            <li><Link className="hover:text-sky" href="/apply">Join / Apply</Link></li>
            <li><Link className="hover:text-sky" href="/benefits">Member&apos;s Benefits</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.15em] text-sky uppercase">Main Office</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li>{contact?.address ?? "38 Bombay Crescent, Apapa, Lagos, Nigeria"}</li>
            <li>
              <a className="hover:text-sky" href={`mailto:${contact?.email ?? "shipchandlersassos@gmail.com"}`}>
                {contact?.email ?? "shipchandlersassos@gmail.com"}
              </a>
            </li>
            <li>
              <a className="hover:text-sky" href={`tel:${(contact?.phone ?? "+2348146679532").replace(/\s+/g, "")}`}>
                {contact?.phone ?? "+234 814 667 9532"}
              </a>
            </li>
            <li>{contact?.hours ?? "Mon–Friday 8am – 5pm"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 px-4 py-4 text-center text-xs text-ink/45">
        © {year} | Nigeria Licensed Ship Chandlers Association® All Rights Reserved
      </div>
    </footer>
  );
}
