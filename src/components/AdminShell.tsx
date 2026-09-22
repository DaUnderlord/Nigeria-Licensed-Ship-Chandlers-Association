import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions";
import { isAdminAuthenticated } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/applications", label: "Applications" },
];

export async function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-navy">
      <header className="border-b border-navy/10 bg-navy text-ink">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" className="h-9 w-9 object-contain" />
            <div>
              <p className="font-display text-sm font-bold tracking-wide text-sky">NILSCA Admin</p>
              <p className="text-[0.65rem] text-ink/50">Content & membership control</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1 text-xs font-semibold tracking-wider uppercase">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="px-3 py-2 hover:text-sky">
                {l.label}
              </Link>
            ))}
            <Link href="/" className="px-3 py-2 hover:text-sky" target="_blank">
              View site
            </Link>
            <form action={logoutAction}>
              <button className="px-3 py-2 text-seal hover:opacity-80">Logout</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-navy">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
