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
        <section className="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Contact</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{contact.headline ?? "We are ready to help you 24/7"}</h1>
            <p className="mt-4 max-w-2xl text-ink/85">{contact.subhead}</p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              {sp.ok ? <div className="mb-6 border border-sky/40 bg-sky/10 px-4 py-3 text-sm">Thank you. Your message has been received.</div> : null}
              {sp.error ? <div className="mb-6 border border-seal/40 bg-seal/10 px-4 py-3 text-sm text-seal">Please fill all required fields.</div> : null}
              <form action={submitContactAction} className="space-y-5 border border-navy/10 bg-white p-6 md:p-8">
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Your name *<input required name="name" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Your email *<input required type="email" name="email" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Subject *<input required name="subject" className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Message *<textarea required name="message" rows={5} className="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm" /></label>
                <button type="submit" className="bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid">Send message</button>
              </form>
            </div>
            <aside>
              <h2 className="font-display text-2xl font-bold text-navy">Main Office Info</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div><dt className="text-xs font-semibold tracking-wide text-sky uppercase">Office Hours</dt><dd className="mt-1 text-navy/70">{contact.hours}</dd></div>
                <div><dt className="text-xs font-semibold tracking-wide text-sky uppercase">Address</dt><dd className="mt-1 text-navy/70">{contact.address}</dd></div>
                <div><dt className="text-xs font-semibold tracking-wide text-sky uppercase">Email</dt><dd className="mt-1 text-navy/70">{contact.email}</dd></div>
                <div><dt className="text-xs font-semibold tracking-wide text-sky uppercase">Telephone</dt><dd className="mt-1 text-navy/70">{contact.phone}</dd></div>
              </dl>
              <div className="mt-10 aspect-video overflow-hidden bg-navy/5">
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
