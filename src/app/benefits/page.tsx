import type { Metadata } from "next";
import Link from "next/link";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContent } from "@/lib/data";

export const metadata: Metadata = { title: "Member's Benefits" };

export default async function BenefitsPage() {
  const content = await getContent();
  const benefits = content.benefits ?? [];
  const banner = content.images?.chandlery ?? "/images/section-chandlery-dock.png";

  return (
    <>
      <ClientEffects />
      <SiteHeader />
      <main className="pt-24">
        <section className="relative overflow-hidden px-4 py-24 text-ink md:px-6 md:py-28">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Member&apos;s Benefits</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
              Value that comes with a licensed membership
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
              Practical advantages of belonging to Nigeria&apos;s licensed ship chandlers association — information, networks, opportunity, and identity.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl space-y-6">
            {benefits.map((benefit: { title?: string; items?: string[] }, i: number) => (
              <article key={benefit.title} className="grid gap-6 border border-navy/10 bg-white p-6 md:grid-cols-[7rem_minmax(0,16rem)_1fr] md:gap-10 md:p-10" data-reveal>
                <div className="font-display text-5xl font-bold leading-none text-navy/15 md:text-6xl" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-sky uppercase">Benefit {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-navy md:text-[1.65rem]">{benefit.title}</h2>
                </div>
                <ul className="space-y-3 self-center text-base leading-relaxed text-navy/75">
                  {(benefit.items ?? []).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-14 max-w-7xl border border-navy/10 bg-navy px-6 py-10 text-ink md:flex md:items-center md:justify-between md:px-10" data-reveal>
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to join NILSCA?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">Apply for membership and gain listing, recognition, and access to association networks.</p>
            </div>
            <Link href="/apply" className="btn-primary mt-6 inline-flex bg-sky px-6 py-3.5 text-sm font-semibold tracking-wide text-navy md:mt-0">
              Apply for membership
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
