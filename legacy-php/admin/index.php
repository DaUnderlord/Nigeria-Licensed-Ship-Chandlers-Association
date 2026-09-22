<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_require_admin();

$members = nilsca_members();
$apps = nilsca_applications();
$inquiries = nilsca_inquiries();
$pendingApps = count(array_filter($apps, fn($a) => ($a['status'] ?? '') === 'pending'));
$newInquiries = count(array_filter($inquiries, fn($a) => ($a['status'] ?? '') === 'new'));

$pageTitle = 'Dashboard';
$adminPage = 'dashboard';
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="mx-auto max-w-7xl px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-navy">Dashboard</h1>
  <p class="mt-2 text-sm text-navy/60">Manage membership, site copy, and media for shared hosting.</p>

  <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <a href="/admin/members.php" class="border border-navy/10 bg-white p-6 hover:border-sky">
      <p class="text-xs font-semibold tracking-wide text-sky uppercase">Members</p>
      <p class="mt-3 font-display text-4xl font-bold text-navy"><?= count($members) ?></p>
    </a>
    <a href="/admin/applications.php" class="border border-navy/10 bg-white p-6 hover:border-sky">
      <p class="text-xs font-semibold tracking-wide text-sky uppercase">Pending applications</p>
      <p class="mt-3 font-display text-4xl font-bold text-navy"><?= (int) $pendingApps ?></p>
    </a>
    <a href="/admin/applications.php" class="border border-navy/10 bg-white p-6 hover:border-sky">
      <p class="text-xs font-semibold tracking-wide text-sky uppercase">New inquiries</p>
      <p class="mt-3 font-display text-4xl font-bold text-navy"><?= (int) $newInquiries ?></p>
    </a>
    <a href="/admin/content.php" class="border border-navy/10 bg-white p-6 hover:border-sky">
      <p class="text-xs font-semibold tracking-wide text-sky uppercase">Content</p>
      <p class="mt-3 font-display text-lg font-bold text-navy">Edit site copy</p>
    </a>
  </div>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
