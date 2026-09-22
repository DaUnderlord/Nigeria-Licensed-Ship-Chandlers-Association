<?php
require_once __DIR__ . '/includes/bootstrap.php';

$content = nilsca_content();
$about = $content['about'] ?? [];
$siteImages = $content['images'] ?? [];
$executives = nilsca_executives();
$banner = $siteImages['horizon'] ?? '/images/section-horizon.png';
$heritageImg = $siteImages['about_heritage'] ?? '/images/about-heritage.png';
$portImg = $siteImages['about_port'] ?? '/images/about-port.png';

$pageTitle = 'About Us';
$bodyClass = 'bg-ink';
require __DIR__ . '/includes/header.php';
?>

<main class="pt-24">
  <section class="relative overflow-hidden px-4 py-24 text-ink md:px-6 md:py-32">
    <div class="page-hero-media" aria-hidden="true">
      <img src="<?= e(nilsca_asset(ltrim($banner, '/'))) ?>" alt="" width="1600" height="900" fetchpriority="high">
    </div>
    <div class="relative z-[1] mx-auto max-w-7xl" data-reveal>
      <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / About</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] md:text-6xl">
        Guardians of licensed<br class="hidden sm:block"> ship chandling in Nigeria
      </h1>
      <p class="mt-5 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
        From Act of Parliament in 1958 to CAC registration in 1986 — integrity, competence, and lawful supply across Nigerian ports.
      </p>
    </div>
  </section>

  <section class="border-b border-navy/10 bg-navy text-ink" data-reveal>
    <div class="mx-auto grid max-w-7xl divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div class="px-6 py-10 text-center md:px-8">
        <p class="font-display text-3xl font-extrabold text-sky md:text-4xl">1958</p>
        <p class="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">Profession established by law</p>
      </div>
      <div class="px-6 py-10 text-center md:px-8">
        <p class="font-display text-3xl font-extrabold text-sky md:text-4xl">1986</p>
        <p class="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">Association registered · RC 3279</p>
      </div>
      <div class="px-6 py-10 text-center md:px-8">
        <p class="font-display text-3xl font-extrabold text-sky md:text-4xl"><?= count($executives) ?>+</p>
        <p class="mt-2 text-xs font-semibold tracking-[0.16em] text-ink/55 uppercase">National executive leaders</p>
      </div>
    </div>
  </section>

  <section class="px-4 py-16 md:px-6 md:py-24" data-reveal>
    <div class="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="order-2 lg:order-1">
        <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Origins</p>
        <h2 class="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">History of the craft</h2>
        <div class="prose-nilsca mt-6 max-w-prose space-y-4 text-base leading-relaxed text-navy/70">
          <?php foreach ($about['history'] ?? [] as $i => $p): ?>
            <?php if ($i === 0): ?>
              <p class="text-lg font-medium text-navy/85"><?= e($p) ?></p>
            <?php else: ?>
              <p><?= e($p) ?></p>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <div class="relative overflow-hidden bg-navy-mid">
          <img src="<?= e(nilsca_asset(ltrim($heritageImg, '/'))) ?>" alt="Historic ship stores and dock warehouse" class="aspect-[4/3] w-full object-cover" width="900" height="675" loading="lazy">
        </div>
        <div class="mt-6 flex items-center gap-6 border border-navy/10 bg-white px-5 py-4">
          <img src="<?= e(nilsca_asset('images/coat-of-arms.png')) ?>" alt="Coat of Arms of Nigeria" class="h-16 w-auto object-contain" width="64" height="80">
          <div class="h-12 w-px bg-navy/10" aria-hidden="true"></div>
          <img src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="NILSCA Logo" class="h-14 w-14 object-contain" width="56" height="56">
          <p class="text-xs leading-relaxed text-navy/55">National recognition · Licensed association mark</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-ink px-4 py-16 md:px-6 md:py-24" data-reveal>
    <div class="mx-auto grid max-w-7xl overflow-hidden border border-navy/10 bg-white lg:grid-cols-2">
      <div class="order-2 flex flex-col justify-center bg-navy px-6 py-12 text-ink md:px-10 md:py-16 lg:order-1">
        <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">In Nigeria</p>
        <h2 class="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">History of ship chandling in Nigeria</h2>
        <div class="prose-nilsca mt-6 max-w-prose space-y-4 text-ink/85">
          <?php foreach ($about['nigeria_history'] ?? [] as $p): ?>
            <p><?= e($p) ?></p>
          <?php endforeach; ?>
        </div>
        <div class="mt-10 border-t border-ink/15 pt-8">
          <p class="text-xs font-semibold tracking-[0.18em] text-sky uppercase">Registration</p>
          <p class="mt-3 text-base leading-relaxed text-ink/85"><?= e($about['registration'] ?? '') ?></p>
          <dl class="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-ink/50">RC Number</dt>
              <dd class="mt-1 font-display text-2xl font-bold text-sky">3279</dd>
            </div>
            <div>
              <dt class="text-ink/50">Since</dt>
              <dd class="mt-1 font-display text-2xl font-bold text-sky">1986</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="order-1 relative min-h-[18rem] lg:order-2 lg:min-h-full">
        <img src="<?= e(nilsca_asset(ltrim($portImg, '/'))) ?>" alt="Nigerian commercial port with vessels and cranes" class="absolute inset-0 h-full w-full object-cover" width="1000" height="1200" loading="lazy">
      </div>
    </div>
  </section>

  <section class="px-4 py-16 md:px-6 md:py-24" data-reveal>
    <div class="mx-auto max-w-7xl">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Standards</p>
        <h2 class="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">Professionalism, law &amp; membership</h2>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article class="border-t-2 border-sky bg-white px-6 py-8 shadow-[0_1px_0_rgba(6,22,40,0.04)]">
          <p class="font-display text-sm font-bold tracking-[0.14em] text-navy uppercase">01 · Professionalism</p>
          <p class="mt-4 text-base leading-relaxed text-navy/70"><?= e($about['professionalism'] ?? '') ?></p>
        </article>
        <article class="border-t-2 border-sky bg-white px-6 py-8">
          <p class="font-display text-sm font-bold tracking-[0.14em] text-navy uppercase">02 · Legislation</p>
          <p class="mt-1 text-xs font-semibold tracking-[0.12em] text-sky uppercase">Local legislations</p>
          <p class="mt-4 text-base leading-relaxed text-navy/70"><?= e($about['legislation'] ?? '') ?></p>
        </article>
        <article class="border-t-2 border-seal bg-navy px-6 py-8 text-ink">
          <p class="font-display text-sm font-bold tracking-[0.14em] text-sky uppercase">03 · Why register</p>
          <p class="mt-4 text-base leading-relaxed text-ink/75"><?= e($about['why_register'] ?? '') ?></p>
          <a href="/apply.php" class="btn-primary mt-8 inline-flex bg-sky px-5 py-3 text-sm font-semibold tracking-wide text-navy">
            Apply for membership
          </a>
        </article>
      </div>
    </div>
  </section>

  <section class="bg-navy px-4 py-16 text-ink md:px-6 md:py-24" data-reveal>
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Leadership</p>
          <h2 class="mt-3 font-display text-3xl font-bold md:text-4xl">Our Executives</h2>
          <p class="mt-3 max-w-xl text-ink/60">Executive Council of the Nigerian Licensed Ship Chandlers Association</p>
        </div>
        <a href="/membership.php" class="btn-ghost inline-flex border border-sky/40 px-5 py-3 text-sm font-semibold tracking-wide text-sky">
          View members list
        </a>
      </div>

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <?php foreach ($executives as $exec): ?>
          <article class="group">
            <div class="aspect-[4/5] overflow-hidden bg-navy-mid">
              <?php if (!empty($exec['photo'])): ?>
                <img src="<?= e($exec['photo']) ?>" alt="<?= e($exec['name']) ?>" class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" width="320" height="400" loading="lazy">
              <?php else: ?>
                <div class="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-sky/40">
                  <?= e(nilsca_initials($exec['name'] ?? '')) ?>
                </div>
              <?php endif; ?>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold"><?= e($exec['name'] ?? '') ?></h3>
            <p class="mt-1 text-sm text-sky"><?= e($exec['role'] ?? '') ?></p>
            <?php if (!empty($exec['company'])): ?>
              <p class="mt-1 text-xs text-ink/50"><?= e($exec['company']) ?></p>
            <?php endif; ?>
          </article>
        <?php endforeach; ?>
      </div>

      <div class="mt-16 border border-sky/20 px-6 py-10 text-center md:px-10">
        <h3 class="font-display text-2xl font-bold">Looking for a licensed chandler?</h3>
        <p class="mx-auto mt-3 max-w-lg text-sm text-ink/65">Check the official NILSCA members directory before you engage supplies or services onboard.</p>
        <a href="/membership.php" class="btn-primary mt-6 inline-flex bg-sky px-6 py-3 text-sm font-semibold tracking-wide text-navy">
          Open members directory
        </a>
      </div>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
