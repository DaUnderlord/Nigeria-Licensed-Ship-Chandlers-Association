<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';

$adminPage = $adminPage ?? 'dashboard';
$siteShort = NILSCA_CONFIG['site_short'] ?? 'NILSCA';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e(($pageTitle ?? 'Admin') . ' | ' . $siteShort) ?></title>
  <link rel="stylesheet" href="<?= e(nilsca_asset('assets/build/css/main.css')) ?>">
</head>
<body class="min-h-screen bg-ink text-navy">
<?php if (nilsca_is_admin() && empty($hideAdminChrome)): ?>
<header class="border-b border-navy/10 bg-navy text-ink">
  <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
    <div class="flex items-center gap-3">
      <img src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="" class="h-9 w-9 object-contain">
      <div>
        <p class="font-display text-sm font-bold tracking-wide text-sky"><?= e($siteShort) ?> Admin</p>
        <p class="text-[0.65rem] text-ink/50">Content & membership control</p>
      </div>
    </div>
    <nav class="flex flex-wrap gap-1 text-xs font-semibold uppercase tracking-wider">
      <?php
      $links = [
        'dashboard' => ['/admin/index.php', 'Dashboard'],
        'members' => ['/admin/members.php', 'Members'],
        'content' => ['/admin/content.php', 'Content'],
        'media' => ['/admin/media.php', 'Media'],
        'applications' => ['/admin/applications.php', 'Applications'],
      ];
      foreach ($links as $key => [$href, $label]):
      ?>
        <a href="<?= e($href) ?>" class="px-3 py-2 <?= $adminPage === $key ? 'bg-sky text-navy' : 'hover:text-sky' ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
      <a href="/" class="px-3 py-2 hover:text-sky" target="_blank" rel="noopener">View site</a>
      <a href="/admin/logout.php" class="px-3 py-2 text-seal hover:opacity-80">Logout</a>
    </nav>
  </div>
</header>
<?php endif; ?>
<?php
$flash = nilsca_get_flash();
if ($flash):
?>
<div class="mx-auto max-w-7xl px-4 pt-4">
  <div class="border px-4 py-3 text-sm <?= $flash['type'] === 'success' ? 'border-sky/40 bg-sky/10' : 'border-seal/40 bg-seal/10 text-seal' ?>">
    <?= e($flash['message']) ?>
  </div>
</div>
<?php endif; ?>
