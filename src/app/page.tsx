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
  const headline = String(hero.headline ?? "Licensed ship chandlers\nfor Nigerian waters");

  return (
    <>
      <ClientEffects splash />
      <div className="splash-root" data-splash role="dialog" aria-label="Welcome">
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
          <div className="hero-content mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pt-28 pb-20 sm:pb-16 md:px-6 md:pb-20">
            <p className="hero-kicker font-display text-[0.7rem] font-semibold tracking-[0.35em] text-sky uppercase sm:text-sm" data-hero-rise style={{ ["--rise-delay" as string]: "0ms" }}>
              NILSCA
            </p>
            <h1 className="hero-title mt-3 max-w-[16ch] font-display font-bold text-ink sm:mt-4 md:max-w-[18ch]" data-hero-rise style={{ ["--rise-delay" as string]: "120ms" }}>
              {headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-sub mt-4 max-w-md text-sm leading-relaxed text-ink/80 sm:mt-5 sm:max-w-lg sm:text-base md:text-lg" data-hero-rise style={{ ["--rise-delay" as string]: "240ms" }}>
              {hero.subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap" data-hero-rise style={{ ["--rise-delay" as string]: "360ms" }}>
              <Link href={hero.cta_href ?? "/membership"} className="btn-primary inline-flex items-center justify-center bg-sky px-6 py-3.5 text-sm font-semibold tracking-wide text-navy">
                {hero.cta_label ?? "Check members list"}
              </Link>
              <Link href="/contact" className="btn-ghost inline-flex items-center justify-center border border-ink/35 bg-navy/30 px-6 py-3.5 text-sm font-semibold tracking-wide text-ink backdrop-blur-sm">
                Contact Us
              </Link>
            </div>
          </div>
          <a href="#caution" className="hero-scroll-cue" data-hero-rise style={{ ["--rise-delay" as string]: "520ms" }} aria-label="Scroll to content">
            <span />
          </a>
        </section>

        <section id="caution" className="caution-band px-4 py-4 text-center text-ink md:px-6" aria-label="Legal caution">
          <p className="font-display text-xs font-bold tracking-[0.25em] uppercase">{caution.title ?? "CAUTION"} !!!</p>
          <p className="mx-auto mt-2 max-w-4xl text-sm font-medium leading-relaxed md:text-base">{caution.lead}</p>
        </section>

        <section className="bg-navy px-4 py-16 text-ink md:px-6 md:py-20" data-reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-sky uppercase">Advisory</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">{caution.audience}</h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70 md:text-lg">{caution.body}</p>
            <Link href="/membership" className="mt-8 inline-flex text-sm font-semibold tracking-wide text-sky underline-offset-4 hover:underline">
              View authorised ship-chandlers →
            </Link>
          </div>
        </section>

        <section className="bg-ink px-4 py-16 md:px-6 md:py-24" data-reveal>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,20rem)_1fr]">
            <div className="relative max-w-sm lg:max-w-none">
              {president.photo && (
                <div className="aspect-[4/5] overflow-hidden bg-navy-mid">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={president.photo} alt={president.name ?? ""} className="h-full w-full object-cover object-top" width={480} height={600} />
                </div>
              )}
              <div className="mt-4 border-l-2 border-sky pl-4">
                <p className="font-display text-lg font-bold text-navy">{president.name}</p>
                <p className="text-sm text-navy/60">{president.credentials}</p>
                <p className="mt-1 text-sm font-semibold text-sky">{president.title ?? "President"}</p>
              </div>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-sky uppercase">From the President</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">Steadfast loyalty. Greater heights.</h2>
              <p className="mt-6 text-sm font-medium text-navy/80">{president.greeting}</p>
              <div className="prose-nilsca mt-4 space-y-4 text-base leading-relaxed text-navy/70">
                {(president.body ?? []).map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p className="mt-6 whitespace-pre-line text-sm text-navy/70">{president.signoff}</p>
              <p className="mt-2 font-display font-bold text-navy">{president.name}</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden" data-reveal>
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteImages.chandlery ?? "/images/section-chandlery-dock.png"} alt="" className="h-full w-full object-cover" width={1600} height={900} />
            <div className="absolute inset-0 bg-navy/80" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-16 text-ink md:px-6 md:py-20">
            <div className="grid gap-10 md:grid-cols-3">
              <article className="border-t-2 border-sky pt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-seal uppercase">{event.label}</p>
                <p className="mt-3 font-display text-sm font-semibold text-sky">{event.date}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-sm text-ink/65">{event.location}</p>
                <Link href={event.href ?? "/about"} className="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</Link>
              </article>
              <article className="border-t-2 border-sky pt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-seal uppercase">{news.label}</p>
                <h3 className="mt-5 font-display text-xl font-bold">{news.title}</h3>
                <Link href={news.href ?? "/about"} className="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</Link>
              </article>
              <article className="border-t-2 border-sky pt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-seal uppercase">{newMembers.label}</p>
                <h3 className="mt-5 font-display text-xl font-bold">{newMembers.title}</h3>
                <Link href={newMembers.href ?? "/membership"} className="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
