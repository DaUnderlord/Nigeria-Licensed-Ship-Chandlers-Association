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
        <section className="relative overflow-hidden px-4 py-28 text-ink md:px-6 md:py-32">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="eyebrow">Membership / Apply</p>
            <h1 className="display-xl mt-6 max-w-[14ch]">Membership Application</h1>
            <p className="measure mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
              Please ensure all fields are completed. Applications are reviewed by the Association.
            </p>
          </div>
        </section>

        <section className="section-pad !pt-12 md:!pt-16">
          <div className="mx-auto max-w-3xl">
            {sp.ok ? (
              <div className="mb-8 border border-sky/30 bg-sky/10 px-5 py-4 text-sm text-navy">Application submitted successfully.</div>
            ) : null}
            {sp.error ? (
              <div className="mb-8 border border-seal/30 bg-seal/10 px-5 py-4 text-sm text-seal">Please fill all required fields.</div>
            ) : null}
            <form action={submitApplicationAction} className="space-y-7 border border-navy/8 bg-white px-6 py-10 md:px-12 md:py-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Surname *
                  <input required name="surname" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Other names *
                  <input required name="other_names" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Email *
                  <input required type="email" name="email" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Phone *
                  <input required name="phone" className="form-field" />
                </label>
              </div>
              <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                Business address *
                <textarea required name="business_address" rows={2} className="form-field" />
              </label>
              <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                Home address *
                <textarea required name="home_address" rows={2} className="form-field" />
              </label>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  License number *
                  <input required name="license_number" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Nationality *
                  <input required name="nationality" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  State of origin *
                  <input required name="state_of_origin" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  L.G.A *
                  <input required name="lga" className="form-field" />
                </label>
              </div>
              <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                Company name
                <input name="company" className="form-field" />
              </label>
              <button type="submit" className="btn-primary bg-navy px-7 py-3.5 text-sm font-semibold text-ink hover:bg-navy-mid">
                Submit application
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
