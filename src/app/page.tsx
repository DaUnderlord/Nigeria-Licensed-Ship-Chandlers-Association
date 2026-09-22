import Link from "next/link";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContent } from "@/lib/data";

export default async function HomePage() {
  const content = await getContent();
  const hero = content.hero ?? {};
  const caution = content.caution ?? {};
  const president = content.president ?? {};
  const event = content.event ?? {};
  const news = content.news ?? {};
  const newMembers = content.new_members ?? {};
  const siteImages = content.images ?? {};
  const heroImage = hero.image ?? "/images/hero-port-dawn.png";
  const headline = String(hero.headline ?? "Licensed ship chandlers for Nigerian waters");
  const pullQuote =
    (president.body?.[0] as string | undefined)?.slice(0, 140) ??
    "Steadfast loyalty to our Association and to the lawful practice of ship chandling.";

  return (
    <>
      <ClientEffects splash />
      <div className="splash-root" data-splash role="dialog" aria-label="Welcome">
        <div className="splash-veil" aria-hidden />
        <div className="splash-stage">
          <div className="splash-globe" aria-hidden />
          <div className="splash-meridian" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="splash-logo" src="/images/logo.png" alt="NILSCA logo" width={240} height={240} />
          <div className="splash-horizon" aria-hidden />
          <div className="splash-wordmark">
            <div className="brand">NILSCA</div>
            <div className="full">Nigeria Licensed Ship Chandlers Association</div>
          </div>
        </div>
        <button type="button" className="splash-skip" data-splash-skip>
          Skip
        </button>
      </div>

      <SiteHeader isHome />
      <main>
        <section className="hero-shell" data-hero data-parallax-hero>
          <div className="hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-media-img" data-parallax-layer src={heroImage} alt="" width={1920} height={1080} fetchPriority="high" />
          </div>
          <div className="hero-horizon-line" aria-hidden />
          <div className="hero-content mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pt-28 pb-16 md:px-6 md:pb-20">
            <p className="hero-brand" data-hero-rise style={{ ["--rise-delay" as string]: "0ms" }}>
              NILSCA
            </p>
            <h1 className="hero-title measure mt-4 max-w-[22ch] font-display" data-hero-rise style={{ ["--rise-delay" as string]: "160ms" }}>
              {headline.replace(/\n/g, " ")}
            </h1>
            <p className="hero-sub measure mt-4 text-base leading-relaxed md:text-lg" data-hero-rise style={{ ["--rise-delay" as string]: "320ms" }}>
              {hero.subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" data-hero-rise style={{ ["--rise-delay" as string]: "480ms" }}>
              <Link href={hero.cta_href ?? "/membership"} className="btn-primary inline-flex items-center justify-center bg-sky px-7 py-3.5 text-sm font-semibold text-navy">
                {hero.cta_label ?? "Check members list"}
              </Link>
              <Link href="/contact" className="btn-ghost inline-flex items-center justify-center border border-ink/30 px-7 py-3.5 text-sm font-semibold text-ink/90">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hero-scroll-cue" aria-hidden data-hero-rise style={{ ["--rise-delay" as string]: "700ms" }} />
        </section>

        <section id="caution" className="caution-decree section-pad !py-10 md:!py-12" aria-label="Legal caution">
          <div className="mx-auto max-w-4xl text-center text-ink">
            <div className="caution-decree-rule mx-auto" aria-hidden />
            <p className="mt-5 font-display text-sm font-semibold tracking-[0.28em] text-seal uppercase">
              {caution.title ?? "Caution"}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink/85 md:text-lg">
              {caution.lead}
            </p>
          </div>
        </section>

        <section className="bg-navy section-pad text-ink" data-reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Advisory</p>
            <blockquote className="mt-8 font-display text-2xl font-medium leading-snug text-balance md:text-4xl md:leading-[1.2]">
              {caution.audience}
            </blockquote>
            <p className="mx-auto measure mt-8 text-base leading-relaxed text-ink/65 md:text-lg">
              {caution.body}
            </p>
            <Link href="/membership" className="link-arrow mt-10">
              View authorised ship-chandlers
            </Link>
          </div>
        </section>

        <section className="bg-paper section-pad" data-reveal>
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <figure className="relative">
              {president.photo && (
                <div className="aspect-[4/5] overflow-hidden bg-navy-mid">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={president.photo} alt={president.name ?? ""} className="h-full w-full object-cover object-top" width={480} height={600} />
                </div>
              )}
              <figcaption className="-mt-8 ml-4 mr-0 bg-navy px-5 py-4 text-ink md:ml-8">
                <p className="font-display text-lg font-semibold">{president.name}</p>
                <p className="mt-1 text-xs tracking-wide text-ink/55">{president.credentials}</p>
                <p className="mt-2 text-sm font-semibold text-sky">{president.title ?? "President"}</p>
              </figcaption>
            </figure>
            <div>
              <p className="eyebrow">From the President</p>
              <h2 className="display-md mt-4 text-navy">Steadfast loyalty. Greater heights.</h2>
              <p className="pull-quote measure mt-8 border-l-2 border-sky pl-5 text-navy/90">
                {pullQuote}
                {pullQuote.length >= 140 ? "…" : ""}
              </p>
              <p className="mt-8 text-sm font-medium text-navy/75">{president.greeting}</p>
              <div className="prose-nilsca measure mt-5 text-navy/65">
                {(president.body ?? []).map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p className="mt-8 whitespace-pre-line text-sm text-navy/60">{president.signoff}</p>
              <p className="mt-2 font-display font-semibold text-navy">{president.name}</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden" data-reveal>
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteImages.chandlery ?? "/images/section-chandlery-dock.png"} alt="" className="h-full w-full object-cover" width={1600} height={900} />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy/70" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-ink md:px-6 md:py-28">
            <p className="eyebrow">Association pulse</p>
            <div className="mt-12 grid gap-12 border-t border-ink/15 pt-12 lg:grid-cols-12 lg:gap-10">
              <article className="lg:col-span-5">
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-seal uppercase">{event.label}</p>
                <p className="mt-4 font-display text-sm text-sky">{event.date}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-snug md:text-3xl">{event.title}</h3>
                <p className="mt-3 text-sm text-ink/55">{event.location}</p>
                <Link href={event.href ?? "/about"} className="link-arrow mt-6">
                  Read more
                </Link>
              </article>
              <article className="border-t border-ink/10 pt-10 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pt-0 lg:pl-10">
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-seal uppercase">{news.label}</p>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{news.title}</h3>
                <Link href={news.href ?? "/about"} className="link-arrow mt-6">
                  Read more
                </Link>
              </article>
              <article className="border-t border-ink/10 pt-10 lg:col-span-3 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pt-0 lg:pl-10">
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-seal uppercase">{newMembers.label}</p>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{newMembers.title}</h3>
                <Link href={newMembers.href ?? "/membership"} className="link-arrow mt-6">
                  View directory
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
