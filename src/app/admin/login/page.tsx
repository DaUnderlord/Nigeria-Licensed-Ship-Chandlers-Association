import Link from "next/link";
import { loginAction } from "@/app/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const sp = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-md border border-navy/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-display text-lg font-bold text-navy">Admin Login</p>
            <p className="text-xs text-navy/50">NILSCA control panel</p>
          </div>
        </div>
        {sp.error ? (
          <p className="mt-4 border border-seal/30 bg-seal/10 px-3 py-2 text-sm text-seal">Incorrect password.</p>
        ) : null}
        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">
            Password
            <input type="password" name="password" required autoFocus className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky" />
          </label>
          <button type="submit" className="w-full bg-navy px-4 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-navy/40">
          <Link href="/" className="hover:text-sky">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
