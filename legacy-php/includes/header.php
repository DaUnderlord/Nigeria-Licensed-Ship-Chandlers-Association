<?php
$content = nilsca_content();
$siteName = NILSCA_CONFIG['site_name'] ?? 'NILSCA';
$short = NILSCA_CONFIG['site_short'] ?? 'NILSCA';
$pageTitle = isset($pageTitle) ? $pageTitle . ' | ' . $short : $siteName;
$bodyClass = $bodyClass ?? '';
$isHome = !empty($isHome);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="<?= e($content['meta_description'] ?? 'Nigeria Licensed Ship Chandlers Association — licensed ship chandlers for Nigerian ports.') ?>">
  <link rel="icon" href="<?= e(nilsca_asset('images/logo.png')) ?>" type="image/png">
  <link rel="stylesheet" href="<?= e(nilsca_asset('assets/build/css/main.css')) ?>">
</head>
<body class="<?= e($bodyClass) ?>">
<?php if ($isHome): ?>
<div class="splash-root" data-splash role="dialog" aria-label="Welcome">
  <div class="splash-stage">
    <div class="splash-globe" aria-hidden="true"></div>
    <div class="splash-meridian" aria-hidden="true"></div>
    <img class="splash-logo" src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="<?= e($short) ?> logo" width="240" height="240">
    <div class="splash-horizon" aria-hidden="true"></div>
    <div class="splash-wordmark">
      <div class="brand"><?= e($short) ?></div>
      <div class="full"><?= e($siteName) ?></div>
    </div>
  </div>
  <button type="button" class="splash-skip" data-splash-skip>Skip</button>
</div>
<?php endif; ?>

<header class="site-header fixed top-0 inset-x-0 z-50 border-b border-transparent <?= $isHome ? 'text-ink' : 'bg-navy text-ink border-sky/10' ?>" data-site-header>
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
    <a href="/" class="nav-logo flex items-center gap-3" data-nav-logo>
      <img src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="" class="h-10 w-10 object-contain md:h-11 md:w-11" width="44" height="44">
      <span class="hidden sm:block">
        <span class="font-display block text-sm font-bold tracking-wide text-sky md:text-base"><?= e($short) ?></span>
        <span class="block max-w-[14rem] text-[0.65rem] leading-tight text-ink/60">Licensed Ship Chandlers</span>
      </span>
    </a>

    <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
      <a class="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky <?= nilsca_active('/') ?>" href="/">Home</a>
      <a class="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky <?= nilsca_active('/about.php') ?>" href="/about.php">About Us</a>
      <a class="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky <?= nilsca_active('/benefits.php') ?>" href="/benefits.php">Member's Benefits</a>
      <div class="relative" data-dropdown>
        <button type="button" class="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky inline-flex items-center gap-1" data-dropdown-btn aria-expanded="false" aria-haspopup="true">
          Membership
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path fill="currentColor" d="M5 7 1 3h8z"/></svg>
        </button>
        <div class="absolute left-0 top-full z-20 mt-1 min-w-[12rem] border border-sky/20 bg-navy-deep/95 py-2 shadow-xl backdrop-blur" data-dropdown-menu hidden>
          <a class="block px-4 py-2 text-xs tracking-wide uppercase hover:bg-sky/10 hover:text-sky" href="/membership.php">Member's List</a>
          <a class="block px-4 py-2 text-xs tracking-wide uppercase hover:bg-sky/10 hover:text-sky" href="/apply.php">Application Form</a>
        </div>
      </div>
      <a class="px-3 py-2 text-xs font-semibold tracking-wider uppercase transition hover:text-sky <?= nilsca_active('/contact.php') ?>" href="/contact.php">Contact Us</a>
      <a class="ml-2 border border-sky/40 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-sky transition hover:bg-sky hover:text-navy" href="/admin/login.php">Login</a>
    </nav>

    <button type="button" class="lg:hidden border border-ink/20 px-3 py-2 text-xs uppercase tracking-wider" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav">Menu</button>
  </div>
  <div id="mobile-nav" class="border-t border-sky/10 bg-navy-deep px-4 py-4 lg:hidden" data-nav-panel hidden>
    <div class="flex flex-col gap-1 text-ink">
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/">Home</a>
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/about.php">About Us</a>
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/benefits.php">Member's Benefits</a>
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/membership.php">Member's List</a>
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/apply.php">Application Form</a>
      <a class="min-h-11 py-3 text-sm uppercase tracking-wider" href="/contact.php">Contact Us</a>
      <a class="mt-2 min-h-11 border border-sky/40 py-3 text-center text-sm uppercase tracking-wider text-sky" href="/admin/login.php">Login</a>
    </div>
  </div>
</header>
