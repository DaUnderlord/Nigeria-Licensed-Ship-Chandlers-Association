<?php
require_once __DIR__ . '/includes/bootstrap.php';

$content = nilsca_content();
$benefits = $content['benefits'] ?? [];
$siteImages = $content['images'] ?? [];
$banner = $siteImages['chandlery'] ?? '/images/section-chandlery-dock.png';

$pageTitle = "Member's Benefits";
$bodyClass = 'bg-ink';
require __DIR__ . '/includes/header.php';
?>

<main class="pt-24">
  <section class="relative overflow-hidden px-4 py-24 text-ink md:px-6 md:py-28">
    <div class="page-hero-media" aria-hidden="true">
      <img src="<?= e(nilsca_asset(ltrim($banner, '/'))) ?>" alt="" width="1600" height="900" fetchpriority="high">
    </div>
    <div class="relative z-[1] mx-auto max-w-7xl" data-reveal>
      <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Member's Benefits</p>
      <h1 class="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
        Value that comes with a licensed membership
      </h1>
      <p class="mt-5 max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
        Practical advantages of belonging to Nigeria's licensed ship chandlers association — information, networks, opportunity, and identity.
      </p>
    </div>
  </section>

  <section class="px-4 py-16 md:px-6 md:py-24">
    <div class="mx-auto max-w-7xl space-y-6">
      <?php foreach ($benefits as $i => $benefit): ?>
        <article class="grid gap-6 border border-navy/10 bg-white p-6 md:grid-cols-[7rem_minmax(0,16rem)_1fr] md:gap-10 md:p-10" data-reveal>
          <div class="font-display text-5xl font-bold leading-none text-navy/15 md:text-6xl" aria-hidden="true">
            <?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?>
          </div>
          <div>
            <p class="text-xs font-semibold tracking-[0.16em] text-sky uppercase">Benefit <?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></p>
            <h2 class="mt-2 font-display text-2xl font-bold leading-snug text-navy md:text-[1.65rem]">
              <?= e($benefit['title'] ?? '') ?>
            </h2>
          </div>
          <ul class="space-y-3 self-center text-base leading-relaxed text-navy/75">
            <?php foreach ($benefit['items'] ?? [] as $item): ?>
              <li class="flex gap-3">
                <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true"></span>
                <span><?= e($item) ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </article>
      <?php endforeach; ?>
    </div>

    <div class="mx-auto mt-14 max-w-7xl border border-navy/10 bg-navy px-6 py-10 text-ink md:flex md:items-center md:justify-between md:px-10" data-reveal>
      <div class="max-w-xl">
        <h2 class="font-display text-2xl font-bold md:text-3xl">Ready to join NILSCA?</h2>
        <p class="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">Apply for membership and gain listing, recognition, and access to association networks.</p>
      </div>
      <a href="/apply.php" class="btn-primary mt-6 inline-flex bg-sky px-6 py-3.5 text-sm font-semibold tracking-wide text-navy md:mt-0">
        Apply for membership
      </a>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
