import type { Metadata } from "next";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { submitContactAction } from "@/app/actions";
import { getContent } from "@/lib/data";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const content = await getContent();
  const contact = content.contact ?? {};
  const banner = content.images?.horizon ?? "/images/section-horizon.png";

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
            <p className="eyebrow">Home / Contact</p>
            <h1 className="display-xl mt-6 max-w-[16ch]">
              {contact.headline ?? "We are ready to help you 24/7"}
            </h1>
            <p className="measure mt-6 text-base leading-relaxed text-ink/80 md:text-lg">{contact.subhead}</p>
          </div>
        </section>

        <section className="section-pad !pt-12 md:!pt-16">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            <div>
              {sp.ok ? (
                <div className="mb-8 border border-sky/30 bg-sky/10 px-5 py-4 text-sm">Thank you. Your message has been received.</div>
              ) : null}
              {sp.error ? (
                <div className="mb-8 border border-seal/30 bg-seal/10 px-5 py-4 text-sm text-seal">Please fill all required fields.</div>
              ) : null}
              <form action={submitContactAction} className="space-y-6 border border-navy/8 bg-white px-6 py-10 md:px-10 md:py-12">
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Your name *
                  <input required name="name" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Your email *
                  <input required type="email" name="email" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Subject *
                  <input required name="subject" className="form-field" />
                </label>
                <label className="block text-[0.68rem] font-semibold tracking-[0.12em] text-navy/50 uppercase">
                  Message *
                  <textarea required name="message" rows={5} className="form-field" />
                </label>
                <button type="submit" className="btn-primary bg-navy px-7 py-3.5 text-sm font-semibold text-ink hover:bg-navy-mid">
                  Send message
                </button>
              </form>
            </div>
            <aside>
              <p className="eyebrow">Main Office</p>
              <h2 className="display-md mt-4 text-navy">Visit or reach us</h2>
              <dl className="mt-10 space-y-7">
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.14em] text-sky uppercase">Office Hours</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/65">{contact.hours}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.14em] text-sky uppercase">Address</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/65">{contact.address}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.14em] text-sky uppercase">Email</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/65">{contact.email}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.14em] text-sky uppercase">Telephone</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/65">{contact.phone}</dd>
                </div>
              </dl>
              <div className="mt-12 aspect-video overflow-hidden border border-navy/8 bg-navy/5">
                <iframe
                  title="Google Map Location"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=38%20Bombay%20Crescent%20Apapa%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
