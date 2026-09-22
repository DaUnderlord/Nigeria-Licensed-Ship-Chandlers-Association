import type { Metadata } from "next";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { submitApplicationAction } from "@/app/actions";
import { getContent } from "@/lib/data";

export const metadata: Metadata = { title: "Membership Application" };

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const content = await getContent();
  const banner = content.images?.chandlery ?? "/images/section-chandlery-dock.png";

  return (
    <>
      <ClientEffects />
      <SiteHeader />
      <main className="pt-24">
        <section className="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Membership / Apply</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Membership Application Form</h1>
            <p className="mt-4 max-w-2xl text-ink/85">Please ensure all fields are completed. Applications are reviewed by the Association.</p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl">
            {sp.ok ? (
              <div className="mb-6 border border-sky/40 bg-sky/10 px-4 py-3 text-sm text-navy">Application submitted successfully.</div>
            ) : null}
            {sp.error ? (
              <div className="mb-6 border border-seal/40 bg-seal/10 px-4 py-3 text-sm text-seal">Please fill all required fields.</div>
            ) : null}
            <form action={submitApplicationAction} className="space-y-6 border border-navy/10 bg-white p-6 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Surname *<input required name="surname" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Other names *<input required name="other_names" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Email *<input required type="email" name="email" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Phone *<input required name="phone" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
              </div>
              <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Business address *<textarea required name="business_address" rows={2} className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
              <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Home address *<textarea required name="home_address" rows={2} className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">License number *<input required name="license_number" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Nationality *<input required name="nationality" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">State of origin *<input required name="state_of_origin" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">L.G.A *<input required name="lga" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
              </div>
              <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Company name<input name="company" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
              <button type="submit" className="bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid">Submit application</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
