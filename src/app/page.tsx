import Link from "next/link";
import { ClientEffects } from "@/components/ClientEffects";
import { MemberLookup } from "@/components/MemberLookup";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContent, getMembers } from "@/lib/data";

export default async function HomePage() {
  const content = await getContent();
  const members = await getMembers();
  const hero = content.hero ?? {};
  const caution = content.caution ?? {};
  const president = content.president ?? {};
  const event = content.event ?? {};
  const news = content.news ?? {};
  const newMembers = content.new_members ?? {};
  const siteImages = content.images ?? {};
  const heroVideos: string[] =
    Array.isArray(hero.videos) && hero.videos.length
      ? hero.videos
      : ["/images/hero-first.mp4", "/images/hero-second.mp4"];
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
        <section className="hero-shell" data-hero>
          <div className="hero-media" data-hero-slider aria-hidden>
            {heroVideos.map((src, i) => (
              <video
                key={src}
                className={`hero-slide${i === 0 ? " is-active" : ""}`}
                data-hero-slide
                src={src}
                muted
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
              />
            ))}
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
            <MemberLookup
              members={members.map((member) => ({
                id: member.id,
                company: member.company,
                address: member.address,
                contact: member.contact,
                phone: member.phone,
                email: member.email,
                certified: Boolean(member.certified),
              }))}
            />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center" data-hero-rise style={{ ["--rise-delay" as string]: "520ms" }}>
              <Link href={hero.cta_href ?? "/membership"} className="btn-primary inline-flex items-center justify-center bg-sky px-7 py-3.5 text-sm font-semibold text-navy">
                {hero.cta_label ?? "Check members list"}
              </Link>
              <Link href="/contact" className="btn-ghost inline-flex items-center justify-center border border-ink/30 px-7 py-3.5 text-sm font-semibold text-ink/90">
                Contact Us
              </Link>
            </div>
          </div>
          {heroVideos.length > 1 ? (
            <div className="hero-dots" data-hero-dots role="group" aria-label="Hero videos">
              {heroVideos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === 0 ? "is-active" : undefined}
                  data-hero-dot
                  aria-label={`Show video ${i + 1} of ${heroVideos.length}`}
                  aria-current={i === 0 ? "true" : undefined}
                />
              ))}
            </div>
          ) : null}
          <div className="hero-scroll-cue" aria-hidden data-hero-rise style={{ ["--rise-delay" as string]: "700ms" }} />
        </section>

        <section id="caution" className="caution-decree section-pad !py-12 md:!py-16" aria-label="Legal caution">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-seal/40 bg-gradient-to-b from-[#180907]/95 via-[#091524]/95 to-[#051221]/95 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 shadow-[0_16px_48px_-12px_rgba(201,74,46,0.3)] ring-1 ring-seal/25 backdrop-blur-sm">
              {/* Subtle radial glow accent */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full bg-seal/20 blur-3xl" aria-hidden />

              <div className="relative text-center">
                {/* Official statutory badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-seal/50 bg-seal/15 px-4 py-1.5 shadow-[0_0_20px_rgba(201,74,46,0.2)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seal opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-seal" />
                  </span>
                  <svg className="h-4 w-4 text-[#ff7a5c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="font-sans text-xs font-bold tracking-[0.24em] text-[#ffb5a6] uppercase">
                    {caution.title ?? "Caution"}
                  </span>
                </div>

                {/* Main warning text */}
                <p className="mx-auto mt-6 max-w-3xl font-display text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl text-balance">
                  {caution.lead}
                </p>

                {/* Statutory cues & direct verification action */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t border-seal/20 pt-5 text-xs font-medium text-ink/75">
                  <span className="inline-flex items-center gap-1.5 text-ink/80">
                    <svg className="h-3.5 w-3.5 text-seal" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                    </svg>
                    Statutory Maritime Regulation
                  </span>
                  <span className="hidden sm:inline text-ink/30">•</span>
                  <span className="inline-flex items-center gap-1.5 text-ink/80">
                    Strict Criminal Liability
                  </span>
                  <span className="hidden sm:inline text-ink/30">•</span>
                  <Link href="/membership" className="inline-flex items-center gap-1 font-semibold text-sky hover:text-sky-soft transition-colors underline-offset-4 hover:underline">
                    Verify Authorised Members &rarr;
                  </Link>
                </div>
              </div>
            </div>
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
