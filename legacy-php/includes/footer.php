<?php
$year = date('Y');
$short = NILSCA_CONFIG['site_short'] ?? 'NILSCA';
$siteName = NILSCA_CONFIG['site_name'] ?? 'Nigeria Licensed Ship Chandlers Association';
$contact = nilsca_content()['contact'] ?? [];
?>
<footer class="mt-auto border-t border-navy/10 bg-navy text-ink">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
    <div>
      <div class="flex items-center gap-3">
        <img src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="" class="h-12 w-12 object-contain" width="48" height="48">
        <div>
          <p class="font-display text-lg font-bold tracking-wide text-sky"><?= e($short) ?></p>
          <p class="text-xs text-ink/55"><?= e($siteName) ?></p>
        </div>
      </div>
      <p class="mt-4 max-w-sm text-sm leading-relaxed text-ink/65">
        Licensed ship chandlers serving Nigerian ports under national legislation and international best practice.
      </p>
    </div>
    <div>
      <p class="font-display text-sm font-semibold tracking-[0.15em] uppercase text-sky">Explore</p>
      <ul class="mt-4 space-y-2 text-sm text-ink/70">
        <li><a class="hover:text-sky" href="/about.php">About Us</a></li>
        <li><a class="hover:text-sky" href="/membership.php">Member's List</a></li>
        <li><a class="hover:text-sky" href="/apply.php">Join / Apply</a></li>
        <li><a class="hover:text-sky" href="/benefits.php">Member's Benefits</a></li>
      </ul>
    </div>
    <div>
      <p class="font-display text-sm font-semibold tracking-[0.15em] uppercase text-sky">Main Office</p>
      <ul class="mt-4 space-y-2 text-sm text-ink/70">
        <li><?= e($contact['address'] ?? '38 Bombay Crescent, Apapa, Lagos, Nigeria') ?></li>
        <li><a class="hover:text-sky" href="mailto:<?= e($contact['email'] ?? 'shipchandlersassos@gmail.com') ?>"><?= e($contact['email'] ?? 'shipchandlersassos@gmail.com') ?></a></li>
        <li><a class="hover:text-sky" href="tel:<?= e(preg_replace('/\s+/', '', $contact['phone'] ?? '+2348146679532')) ?>"><?= e($contact['phone'] ?? '+234 814 667 9532') ?></a></li>
        <li><?= e($contact['hours'] ?? 'Mon–Friday 8am – 5pm') ?></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-ink/10 px-4 py-4 text-center text-xs text-ink/45">
    © <?= e($year) ?> | <?= e($siteName) ?>® All Rights Reserved
  </div>
</footer>
<script src="<?= e(nilsca_asset('assets/build/js/main.js')) ?>" type="module"></script>
</body>
</html>
