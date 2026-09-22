<?php
require_once __DIR__ . '/includes/bootstrap.php';

$content = nilsca_content();
$contact = $content['contact'] ?? [];
$siteImages = $content['images'] ?? [];
$banner = $siteImages['horizon'] ?? '/images/section-horizon.png';
$flash = nilsca_get_flash();

$pageTitle = 'Contact Us';
$bodyClass = 'bg-ink';
require __DIR__ . '/includes/header.php';
?>

<main class="pt-24">
  <section class="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
    <div class="page-hero-media" aria-hidden="true">
      <img src="<?= e(nilsca_asset(ltrim($banner, '/'))) ?>" alt="" width="1600" height="900" fetchpriority="high">
    </div>
    <div class="relative z-[1] mx-auto max-w-7xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Contact</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold md:text-5xl"><?= e($contact['headline'] ?? 'We are ready to help you 24/7') ?></h1>
      <p class="mt-4 max-w-2xl text-ink/70"><?= e($contact['subhead'] ?? '') ?></p>
    </div>
  </section>

  <section class="px-4 py-12 md:px-6 md:py-16">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
      <div>
        <?php if ($flash): ?>
          <div class="mb-6 border px-4 py-3 text-sm <?= $flash['type'] === 'success' ? 'border-sky/40 bg-sky/10 text-navy' : 'border-seal/40 bg-seal/10 text-seal' ?>">
            <?= e($flash['message']) ?>
          </div>
        <?php endif; ?>

        <form action="/api/contact.php" method="post" class="space-y-5 border border-navy/10 bg-white p-6 md:p-8">
          <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Your name *</span>
            <input required name="name" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Your email *</span>
            <input required type="email" name="email" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Subject *</span>
            <input required name="subject" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Message *</span>
            <textarea required name="message" rows="5" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky" placeholder="Tell us something…"></textarea>
          </label>
          <button type="submit" class="bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid">Send message</button>
        </form>
      </div>

      <aside>
        <h2 class="font-display text-2xl font-bold text-navy">Main Office Info</h2>
        <dl class="mt-6 space-y-5 text-sm">
          <div>
            <dt class="font-semibold tracking-wide text-sky uppercase text-xs">Office Hours</dt>
            <dd class="mt-1 text-navy/70"><?= e($contact['hours'] ?? '') ?></dd>
          </div>
          <div>
            <dt class="font-semibold tracking-wide text-sky uppercase text-xs">Address</dt>
            <dd class="mt-1 text-navy/70"><?= e($contact['address'] ?? '') ?></dd>
          </div>
          <div>
            <dt class="font-semibold tracking-wide text-sky uppercase text-xs">Email</dt>
            <dd class="mt-1"><a class="text-navy/70 hover:text-sky" href="mailto:<?= e($contact['email'] ?? '') ?>"><?= e($contact['email'] ?? '') ?></a></dd>
          </div>
          <div>
            <dt class="font-semibold tracking-wide text-sky uppercase text-xs">Telephone</dt>
            <dd class="mt-1"><a class="text-navy/70 hover:text-sky" href="tel:<?= e(preg_replace('/\s+/', '', $contact['phone'] ?? '')) ?>"><?= e($contact['phone'] ?? '') ?></a></dd>
          </div>
          <?php if (!empty($contact['fax'])): ?>
          <div>
            <dt class="font-semibold tracking-wide text-sky uppercase text-xs">Fax</dt>
            <dd class="mt-1 text-navy/70"><?= e($contact['fax']) ?></dd>
          </div>
          <?php endif; ?>
        </dl>

        <div class="mt-10 aspect-video overflow-hidden bg-navy/5">
          <?php if (!empty($contact['map_embed'])): ?>
            <?= $contact['map_embed'] ?>
          <?php else: ?>
            <iframe
              title="Google Map Location"
              class="h-full w-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=38%20Bombay%20Crescent%20Apapa%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          <?php endif; ?>
        </div>
      </aside>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
