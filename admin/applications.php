<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_require_admin();

$apps = nilsca_applications();
$inquiries = nilsca_inquiries();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
        nilsca_flash('error', 'Invalid session.');
        nilsca_redirect('/admin/applications.php');
    }
    $type = $_POST['type'] ?? '';
    $id = (string) ($_POST['id'] ?? '');
    $status = (string) ($_POST['status'] ?? '');

    if ($type === 'application') {
        foreach ($apps as &$a) {
            if (($a['id'] ?? '') === $id) {
                $a['status'] = $status;
                break;
            }
        }
        unset($a);
        nilsca_write_json('applications.json', ['applications' => $apps]);
        nilsca_flash('success', 'Application updated.');
    }

    if ($type === 'inquiry') {
        foreach ($inquiries as &$inq) {
            if (($inq['id'] ?? '') === $id) {
                $inq['status'] = $status;
                break;
            }
        }
        unset($inq);
        nilsca_write_json('inquiries.json', ['inquiries' => $inquiries]);
        nilsca_flash('success', 'Inquiry updated.');
    }

    nilsca_redirect('/admin/applications.php');
}

$apps = array_reverse($apps);
$inquiries = array_reverse($inquiries);

$pageTitle = 'Applications';
$adminPage = 'applications';
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="mx-auto max-w-7xl px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-navy">Applications & inquiries</h1>

  <h2 class="mt-10 font-display text-xl font-bold">Membership applications</h2>
  <div class="mt-4 space-y-4">
    <?php if (!$apps): ?>
      <p class="text-sm text-navy/50">No applications yet.</p>
    <?php endif; ?>
    <?php foreach ($apps as $a): ?>
      <article class="border border-navy/10 bg-white p-5">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="font-display text-lg font-bold"><?= e(($a['surname'] ?? '') . ' ' . ($a['other_names'] ?? '')) ?></p>
            <p class="text-sm text-navy/60"><?= e($a['company'] ?? '') ?> · <?= e($a['email'] ?? '') ?> · <?= e($a['phone'] ?? '') ?></p>
            <p class="mt-2 text-xs text-navy/45"><?= e($a['created_at'] ?? '') ?> · Status: <strong><?= e($a['status'] ?? '') ?></strong></p>
          </div>
          <?php if (!empty($a['photo'])): ?>
            <img src="<?= e($a['photo']) ?>" alt="" class="h-16 w-16 object-cover">
          <?php endif; ?>
        </div>
        <dl class="mt-4 grid gap-2 text-sm text-navy/70 sm:grid-cols-2">
          <div><dt class="text-xs uppercase text-navy/40">License</dt><dd><?= e($a['license_number'] ?? '') ?></dd></div>
          <div><dt class="text-xs uppercase text-navy/40">Nationality</dt><dd><?= e($a['nationality'] ?? '') ?></dd></div>
          <div><dt class="text-xs uppercase text-navy/40">State / LGA</dt><dd><?= e(($a['state_of_origin'] ?? '') . ' / ' . ($a['lga'] ?? '')) ?></dd></div>
          <div><dt class="text-xs uppercase text-navy/40">Business address</dt><dd><?= e($a['business_address'] ?? '') ?></dd></div>
        </dl>
        <form method="post" class="mt-4 flex flex-wrap gap-2">
          <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
          <input type="hidden" name="type" value="application">
          <input type="hidden" name="id" value="<?= e($a['id'] ?? '') ?>">
          <button name="status" value="pending" class="border px-3 py-1.5 text-xs">Pending</button>
          <button name="status" value="approved" class="border border-sky bg-sky/10 px-3 py-1.5 text-xs">Approved</button>
          <button name="status" value="rejected" class="border border-seal/40 px-3 py-1.5 text-xs text-seal">Rejected</button>
        </form>
      </article>
    <?php endforeach; ?>
  </div>

  <h2 class="mt-14 font-display text-xl font-bold">Contact inquiries</h2>
  <div class="mt-4 space-y-4">
    <?php if (!$inquiries): ?>
      <p class="text-sm text-navy/50">No inquiries yet.</p>
    <?php endif; ?>
    <?php foreach ($inquiries as $inq): ?>
      <article class="border border-navy/10 bg-white p-5">
        <p class="font-display text-lg font-bold"><?= e($inq['subject'] ?? '') ?></p>
        <p class="text-sm text-navy/60"><?= e($inq['name'] ?? '') ?> · <?= e($inq['email'] ?? '') ?></p>
        <p class="mt-3 text-sm text-navy/75 whitespace-pre-wrap"><?= e($inq['message'] ?? '') ?></p>
        <p class="mt-2 text-xs text-navy/45"><?= e($inq['created_at'] ?? '') ?> · <?= e($inq['status'] ?? '') ?></p>
        <form method="post" class="mt-3 flex gap-2">
          <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
          <input type="hidden" name="type" value="inquiry">
          <input type="hidden" name="id" value="<?= e($inq['id'] ?? '') ?>">
          <button name="status" value="new" class="border px-3 py-1.5 text-xs">New</button>
          <button name="status" value="read" class="border border-sky bg-sky/10 px-3 py-1.5 text-xs">Mark read</button>
        </form>
      </article>
    <?php endforeach; ?>
  </div>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
