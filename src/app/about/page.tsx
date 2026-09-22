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
        <section className="relative overflow-hidden px-4 py-28 text-ink md:px-6 md:py-36">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="eyebrow text-sky/90">Home / About</p>
            <h1 className="display-xl mt-6 max-w-[14ch] text-balance">
              Guardians of licensed ship chandling
            </h1>
            <p className="measure mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
              From Act of Parliament in 1958 to CAC registration in 1986 — integrity, competence, and lawful supply across Nigerian ports.
            </p>
          </div>
        </section>

        <section className="border-b border-navy/10 bg-navy text-ink" data-reveal>
          <div className="mx-auto grid max-w-7xl divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-12 text-center md:px-10">
              <p className="font-display text-4xl font-semibold text-sky md:text-5xl">1958</p>
              <p className="mt-3 text-xs tracking-[0.16em] text-ink/50 uppercase">Profession established by law</p>
            </div>
            <div className="px-6 py-12 text-center md:px-10">
              <p className="font-display text-4xl font-semibold text-sky md:text-5xl">1986</p>
              <p className="mt-3 text-xs tracking-[0.16em] text-ink/50 uppercase">Association registered · RC 3279</p>
            </div>
            <div className="px-6 py-12 text-center md:px-10">
              <p className="font-display text-4xl font-semibold text-sky md:text-5xl">{executives.length}+</p>
              <p className="mt-3 text-xs tracking-[0.16em] text-ink/50 uppercase">National executive leaders</p>
            </div>
          </div>
        </section>

        <section className="section-pad" data-reveal>
          <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <p className="eyebrow">Origins</p>
              <h2 className="display-md mt-4 text-navy">History of the craft</h2>
              <div className="hairline mt-6 w-16" aria-hidden />
              <div className="prose-nilsca measure mt-8 text-navy/65">
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
              <div className="mt-6 flex items-center gap-6 border-t border-navy/10 pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/coat-of-arms.png" alt="Coat of Arms of Nigeria" className="h-14 w-auto object-contain" width={56} height={70} />
                <div className="h-10 w-px bg-navy/10" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="NILSCA Logo" className="h-12 w-12 object-contain" width={48} height={48} />
                <p className="text-xs leading-relaxed text-navy/45">National recognition · Licensed association mark</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink section-pad" data-reveal>
          <div className="mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center bg-navy px-6 py-14 text-ink md:px-12 md:py-20 lg:order-1">
              <p className="eyebrow">In Nigeria</p>
              <h2 className="display-md mt-4 leading-tight">History of ship chandling in Nigeria</h2>
              <div className="prose-nilsca measure mt-8 text-ink/80">
                {(about.nigeria_history ?? []).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-12 border-t border-ink/15 pt-10">
                <p className="eyebrow">Registration</p>
                <p className="measure mt-4 text-base leading-relaxed text-ink/80">{about.registration}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-xs tracking-wide text-ink/45 uppercase">RC Number</dt>
                    <dd className="mt-2 font-display text-3xl font-semibold text-sky">3279</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-wide text-ink/45 uppercase">Since</dt>
                    <dd className="mt-2 font-display text-3xl font-semibold text-sky">1986</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="relative order-1 min-h-[20rem] lg:order-2 lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portImg} alt="Nigerian commercial port with vessels and cranes" className="absolute inset-0 h-full w-full object-cover" width={1000} height={1200} />
            </div>
          </div>
        </section>

        <section className="section-pad" data-reveal>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="eyebrow">Standards</p>
              <h2 className="display-md mt-4 text-navy">Professionalism, law &amp; membership</h2>
            </div>
            <div className="mt-14 grid gap-0 border-t border-navy/10 lg:grid-cols-3">
              <article className="border-b border-navy/10 px-0 py-10 lg:border-r lg:border-b-0 lg:pr-10 lg:pl-0">
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-navy/40">01</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">Professionalism</h3>
                <p className="mt-4 text-base leading-relaxed text-navy/65">{about.professionalism}</p>
              </article>
              <article className="border-b border-navy/10 px-0 py-10 lg:border-r lg:border-b-0 lg:px-10">
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-navy/40">02</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">Legislation</h3>
                <p className="mt-1 text-xs tracking-[0.12em] text-sky uppercase">Local legislations</p>
                <p className="mt-4 text-base leading-relaxed text-navy/65">{about.legislation}</p>
              </article>
              <article className="bg-navy px-6 py-10 text-ink md:px-10 lg:py-10">
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-sky/60">03</p>
                <h3 className="mt-3 font-display text-xl font-semibold">Why register</h3>
                <p className="mt-4 text-base leading-relaxed text-ink/70">{about.why_register}</p>
                <Link href="/apply" className="btn-primary mt-8 inline-flex bg-sky px-5 py-3 text-sm font-semibold text-navy">
                  Apply for membership
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-navy section-pad text-ink" data-reveal>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Leadership</p>
                <h2 className="display-md mt-4">Our Executives</h2>
                <p className="measure mt-4 text-ink/55">Executive Council of the Nigerian Licensed Ship Chandlers Association</p>
              </div>
              <Link href="/membership" className="link-arrow">
                View members list
              </Link>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {executives.map((exec) => (
                <article key={exec.name + exec.role} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-navy-mid">
                    {exec.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={exec.photo} alt={exec.name} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" width={320} height={400} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-4xl font-semibold text-sky/40">
                        {initials(exec.name)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{exec.name}</h3>
                  <p className="mt-1 text-sm text-sky">{exec.role}</p>
                  {exec.company ? <p className="mt-1 text-xs text-ink/40">{exec.company}</p> : null}
                </article>
              ))}
            </div>
            <div className="mt-20 border-t border-ink/15 pt-14 text-center">
              <h3 className="font-display text-2xl font-semibold md:text-3xl">Looking for a licensed chandler?</h3>
              <p className="mx-auto measure mt-4 text-sm text-ink/55">Check the official NILSCA members directory before you engage supplies or services onboard.</p>
              <Link href="/membership" className="btn-primary mt-8 inline-flex bg-sky px-7 py-3.5 text-sm font-semibold text-navy">
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
