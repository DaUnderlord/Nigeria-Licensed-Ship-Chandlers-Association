<?php
require_once __DIR__ . '/includes/bootstrap.php';

$content = nilsca_content();
$hero = $content['hero'] ?? [];
$siteImages = $content['images'] ?? [];
$caution = $content['caution'] ?? [];
$president = $content['president'] ?? [];
$event = $content['event'] ?? [];
$news = $content['news'] ?? [];
$newMembers = $content['new_members'] ?? [];
$heroImage = $hero['image'] ?? '/images/hero-port-dawn.png';

$isHome = true;
$bodyClass = 'bg-ink';
$pageTitle = NILSCA_CONFIG['site_name'];
require __DIR__ . '/includes/header.php';
?>

<main>
  <section class="hero-shell" data-hero data-parallax-hero>
    <div class="hero-media" aria-hidden="true">
      <img
        class="hero-media-img"
        data-parallax-layer
        src="<?= e(nilsca_asset(ltrim($heroImage, '/'))) ?>"
        alt=""
        width="1920"
        height="1080"
        fetchpriority="high"
        decoding="async"
      >
    </div>
    <div class="hero-horizon-line" aria-hidden="true"></div>
    <div class="hero-content mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:pb-16 md:px-6 md:pb-20">
      <p class="hero-kicker font-display text-[0.7rem] font-semibold tracking-[0.35em] text-sky uppercase sm:text-sm" data-hero-rise style="--rise-delay: 0ms">
        <?= e(NILSCA_CONFIG['site_short']) ?>
      </p>
      <h1 class="hero-title mt-3 max-w-[16ch] font-display font-extrabold text-ink sm:mt-4 md:max-w-[18ch]" data-hero-rise style="--rise-delay: 120ms">
        <?= nl2br(e($hero['headline'] ?? "Licensed ship chandlers\nfor Nigerian waters")) ?>
      </h1>
      <p class="hero-sub mt-4 max-w-md text-sm leading-relaxed text-ink/80 sm:mt-5 sm:max-w-lg sm:text-base md:text-lg" data-hero-rise style="--rise-delay: 240ms">
        <?= e($hero['subhead'] ?? '') ?>
      </p>
      <div class="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap" data-hero-rise style="--rise-delay: 360ms">
        <a href="<?= e($hero['cta_href'] ?? '/membership.php') ?>" class="btn-primary inline-flex items-center justify-center bg-sky px-6 py-3.5 text-sm font-semibold tracking-wide text-navy">
          <?= e($hero['cta_label'] ?? 'Check members list') ?>
        </a>
        <a href="/contact.php" class="btn-ghost inline-flex items-center justify-center border border-ink/35 bg-navy/30 px-6 py-3.5 text-sm font-semibold tracking-wide text-ink backdrop-blur-sm">
          Contact Us
        </a>
      </div>
    </div>
    <a href="#caution" class="hero-scroll-cue" data-hero-rise style="--rise-delay: 520ms" aria-label="Scroll to content">
      <span></span>
    </a>
  </section>

  <section id="caution" class="caution-band px-4 py-4 text-center text-ink md:px-6" aria-label="Legal caution">
    <p class="font-display text-xs font-bold tracking-[0.25em] uppercase"><?= e($caution['title'] ?? 'CAUTION') ?> !!!</p>
    <p class="mx-auto mt-2 max-w-4xl text-sm font-medium leading-relaxed md:text-base">
      <?= e($caution['lead'] ?? '') ?>
    </p>
  </section>

  <section class="bg-navy px-4 py-16 text-ink md:px-6 md:py-20" data-reveal>
    <div class="mx-auto max-w-4xl text-center">
      <p class="font-display text-xs font-semibold tracking-[0.2em] text-sky uppercase">Advisory</p>
      <h2 class="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">
        <?= e($caution['audience'] ?? '') ?>
      </h2>
      <p class="mt-6 text-base leading-relaxed text-ink/70 md:text-lg">
        <?= e($caution['body'] ?? '') ?>
      </p>
      <a href="/membership.php" class="mt-8 inline-flex text-sm font-semibold tracking-wide text-sky underline-offset-4 hover:underline">
        View authorised ship-chandlers →
      </a>
    </div>
  </section>

  <section class="bg-ink px-4 py-16 md:px-6 md:py-24" data-reveal>
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,20rem)_1fr]">
      <div class="relative max-w-sm lg:max-w-none">
        <?php if (!empty($president['photo'])): ?>
          <div class="aspect-[4/5] overflow-hidden bg-navy-mid">
            <img src="<?= e($president['photo']) ?>" alt="<?= e($president['name'] ?? '') ?>" class="h-full w-full object-cover object-top" width="480" height="600">
          </div>
        <?php endif; ?>
        <div class="mt-4 border-l-2 border-sky pl-4">
          <p class="font-display text-lg font-bold text-navy"><?= e($president['name'] ?? '') ?></p>
          <p class="text-sm text-navy/60"><?= e($president['credentials'] ?? '') ?></p>
          <p class="mt-1 text-sm font-semibold text-sky"><?= e($president['title'] ?? 'President') ?></p>
        </div>
      </div>
      <div>
        <p class="font-display text-xs font-semibold tracking-[0.2em] text-sky uppercase">From the President</p>
        <h2 class="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">Steadfast loyalty. Greater heights.</h2>
        <p class="mt-6 text-sm font-medium text-navy/80"><?= e($president['greeting'] ?? '') ?></p>
        <div class="prose-nilsca mt-4 space-y-4 text-base leading-relaxed text-navy/70">
          <?php foreach ($president['body'] ?? [] as $para): ?>
            <p><?= e($para) ?></p>
          <?php endforeach; ?>
        </div>
        <p class="mt-6 whitespace-pre-line text-sm text-navy/70"><?= e($president['signoff'] ?? '') ?></p>
        <p class="mt-2 font-display font-bold text-navy"><?= e($president['name'] ?? '') ?></p>
      </div>
    </div>
  </section>

  <section class="relative overflow-hidden" data-reveal>
    <div class="absolute inset-0">
      <img src="<?= e(nilsca_asset(ltrim($siteImages['chandlery'] ?? '/images/section-chandlery-dock.png', '/'))) ?>" alt="" class="h-full w-full object-cover" width="1600" height="900" loading="lazy">
      <div class="absolute inset-0 bg-navy/80"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-4 py-16 text-ink md:px-6 md:py-20">
      <div class="grid gap-10 md:grid-cols-3">
        <article class="border-t-2 border-sky pt-6">
          <p class="text-xs font-semibold tracking-[0.18em] text-seal uppercase"><?= e($event['label'] ?? 'Upcoming Event') ?></p>
          <p class="mt-3 font-display text-sm font-semibold text-sky"><?= e($event['date'] ?? '') ?></p>
          <h3 class="mt-2 font-display text-xl font-bold"><?= e($event['title'] ?? '') ?></h3>
          <p class="mt-2 text-sm text-ink/65"><?= e($event['location'] ?? '') ?></p>
          <a href="<?= e($event['href'] ?? '/about.php') ?>" class="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</a>
        </article>
        <article class="border-t-2 border-sky pt-6">
          <p class="text-xs font-semibold tracking-[0.18em] text-seal uppercase"><?= e($news['label'] ?? 'Latest News') ?></p>
          <h3 class="mt-5 font-display text-xl font-bold"><?= e($news['title'] ?? '') ?></h3>
          <a href="<?= e($news['href'] ?? '/about.php') ?>" class="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</a>
        </article>
        <article class="border-t-2 border-sky pt-6">
          <p class="text-xs font-semibold tracking-[0.18em] text-seal uppercase"><?= e($newMembers['label'] ?? 'New Members') ?></p>
          <h3 class="mt-5 font-display text-xl font-bold"><?= e($newMembers['title'] ?? '') ?></h3>
          <a href="<?= e($newMembers['href'] ?? '/membership.php') ?>" class="mt-4 inline-block text-sm font-semibold text-sky hover:underline">Read more</a>
        </article>
      </div>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
