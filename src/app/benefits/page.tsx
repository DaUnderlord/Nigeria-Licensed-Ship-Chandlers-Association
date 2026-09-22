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
        <section className="relative overflow-hidden px-4 py-28 text-ink md:px-6 md:py-36">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="eyebrow">Home / Member&apos;s Benefits</p>
            <h1 className="display-xl mt-6 max-w-[12ch]">
              Value of licensed membership
            </h1>
            <p className="measure mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
              Practical advantages of belonging to Nigeria&apos;s licensed ship chandlers association — information, networks, opportunity, and identity.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto max-w-7xl">
            {benefits.map((benefit: { title?: string; items?: string[] }, i: number) => (
              <article
                key={benefit.title}
                className="grid gap-8 border-t border-navy/10 py-14 md:grid-cols-[6rem_minmax(0,18rem)_1fr] md:gap-12 md:py-16"
                data-reveal
              >
                <div className="font-display text-5xl font-semibold leading-none text-navy/12 md:text-6xl" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="eyebrow">Benefit {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-navy md:text-[1.75rem]">
                    {benefit.title}
                  </h2>
                </div>
                <ul className="space-y-4 self-center text-base leading-relaxed text-navy/70">
                  {(benefit.items ?? []).map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-sky" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-7xl bg-navy px-6 py-14 text-ink md:flex md:items-center md:justify-between md:px-12 md:py-16" data-reveal>
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Ready to join NILSCA?</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">
                Apply for membership and gain listing, recognition, and access to association networks.
              </p>
            </div>
            <Link href="/apply" className="btn-primary mt-8 inline-flex bg-sky px-7 py-3.5 text-sm font-semibold text-navy md:mt-0">
              Apply for membership
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
