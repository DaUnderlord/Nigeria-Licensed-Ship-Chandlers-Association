import type { Metadata } from "next";
import Link from "next/link";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContent, getExecutives, initials } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const content = await getContent();
  const about = content.about ?? {};
  const siteImages = content.images ?? {};
  const executives = await getExecutives();
  const banner = siteImages.horizon ?? "/images/section-horizon.png";
  const heritageImg = siteImages.about_heritage ?? "/images/about-heritage.png";
  const portImg = siteImages.about_port ?? "/images/about-port.png";

  return (
    <>
      <ClientEffects />
      <SiteHeader />
      <main className="pt-24">
        <section className="relative overflow-hidden px-4 py-24 text-ink md:px-6 md:py-32">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / About</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] md:text-6xl">
              Guardians of licensed<br className="hidden sm:block" /> ship chandling in Nigeria
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
              From Act of Parliament in 1958 to CAC registration in 1986 — integrity, competence, and lawful supply across Nigerian ports.
            </p>
          </div>
        </section>

        <section className="border-b border-navy/10 bg-navy text-ink" data-reveal>
          <div className="mx-auto grid max-w-7xl divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-10 text-center md:px-8">
              <p className="font-display text-3xl font-bold text-sky md:text-4xl">1958</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">Profession established by law</p>
            </div>
            <div className="px-6 py-10 text-center md:px-8">
              <p className="font-display text-3xl font-bold text-sky md:text-4xl">1986</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">Association registered · RC 3279</p>
            </div>
            <div className="px-6 py-10 text-center md:px-8">
              <p className="font-display text-3xl font-bold text-sky md:text-4xl">{executives.length}+</p>
              <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">National executive leaders</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6 md:py-24" data-reveal>
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Origins</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">History of the craft</h2>
              <div className="prose-nilsca mt-6 max-w-prose space-y-4 text-navy/70">
                {(about.history ?? []).map((p: string, i: number) => (
                  <p key={i} className={i === 0 ? "text-lg font-medium text-navy/85" : undefined}>{p}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden bg-navy-mid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heritageImg} alt="Historic ship stores and dock warehouse" className="aspect-[4/3] w-full object-cover" width={900} height={675} />
              </div>
              <div className="mt-6 flex items-center gap-6 border border-navy/10 bg-white px-5 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/coat-of-arms.png" alt="Coat of Arms of Nigeria" className="h-16 w-auto object-contain" width={64} height={80} />
                <div className="h-12 w-px bg-navy/10" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="NILSCA Logo" className="h-14 w-14 object-contain" width={56} height={56} />
                <p className="text-xs leading-relaxed text-navy/55">National recognition · Licensed association mark</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink px-4 py-16 md:px-6 md:py-24" data-reveal>
          <div className="mx-auto grid max-w-7xl overflow-hidden border border-navy/10 bg-white lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center bg-navy px-6 py-12 text-ink md:px-10 md:py-16 lg:order-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">In Nigeria</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">History of ship chandling in Nigeria</h2>
              <div className="prose-nilsca mt-6 max-w-prose space-y-4 text-ink/85">
                {(about.nigeria_history ?? []).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-10 border-t border-ink/15 pt-8">
                <p className="text-xs font-semibold tracking-[0.18em] text-sky uppercase">Registration</p>
                <p className="mt-3 text-base leading-relaxed text-ink/85">{about.registration}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-ink/50">RC Number</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-sky">3279</dd>
                  </div>
                  <div>
                    <dt className="text-ink/50">Since</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-sky">1986</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="relative order-1 min-h-[18rem] lg:order-2 lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portImg} alt="Nigerian commercial port with vessels and cranes" className="absolute inset-0 h-full w-full object-cover" width={1000} height={1200} />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6 md:py-24" data-reveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Standards</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">Professionalism, law &amp; membership</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <article className="border-t-2 border-sky bg-white px-6 py-8">
                <p className="font-display text-sm font-bold tracking-[0.14em] text-navy uppercase">01 · Professionalism</p>
                <p className="mt-4 text-base leading-relaxed text-navy/70">{about.professionalism}</p>
              </article>
              <article className="border-t-2 border-sky bg-white px-6 py-8">
                <p className="font-display text-sm font-bold tracking-[0.14em] text-navy uppercase">02 · Legislation</p>
                <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-sky uppercase">Local legislations</p>
                <p className="mt-4 text-base leading-relaxed text-navy/70">{about.legislation}</p>
              </article>
              <article className="border-t-2 border-seal bg-navy px-6 py-8 text-ink">
                <p className="font-display text-sm font-bold tracking-[0.14em] text-sky uppercase">03 · Why register</p>
                <p className="mt-4 text-base leading-relaxed text-ink/75">{about.why_register}</p>
                <Link href="/apply" className="btn-primary mt-8 inline-flex bg-sky px-5 py-3 text-sm font-semibold tracking-wide text-navy">
                  Apply for membership
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-navy px-4 py-16 text-ink md:px-6 md:py-24" data-reveal>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Leadership</p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Our Executives</h2>
                <p className="mt-3 max-w-xl text-ink/60">Executive Council of the Nigerian Licensed Ship Chandlers Association</p>
              </div>
              <Link href="/membership" className="btn-ghost inline-flex border border-sky/40 px-5 py-3 text-sm font-semibold tracking-wide text-sky">
                View members list
              </Link>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {executives.map((exec) => (
                <article key={exec.name + exec.role} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-navy-mid">
                    {exec.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={exec.photo} alt={exec.name} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" width={320} height={400} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-sky/40">
                        {initials(exec.name)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{exec.name}</h3>
                  <p className="mt-1 text-sm text-sky">{exec.role}</p>
                  {exec.company ? <p className="mt-1 text-xs text-ink/50">{exec.company}</p> : null}
                </article>
              ))}
            </div>
            <div className="mt-16 border border-sky/20 px-6 py-10 text-center md:px-10">
              <h3 className="font-display text-2xl font-bold">Looking for a licensed chandler?</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm text-ink/65">Check the official NILSCA members directory before you engage supplies or services onboard.</p>
              <Link href="/membership" className="btn-primary mt-6 inline-flex bg-sky px-6 py-3 text-sm font-semibold tracking-wide text-navy">
                Open members directory
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
