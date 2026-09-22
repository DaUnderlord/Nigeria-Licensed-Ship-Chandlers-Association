<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_require_admin();

$media = nilsca_media();
$files = $media['files'] ?? [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
        nilsca_flash('error', 'Invalid session.');
        nilsca_redirect('/admin/media.php');
    }

    $action = $_POST['action'] ?? '';

    if ($action === 'upload') {
        if (empty($_FILES['file']['tmp_name']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
            nilsca_flash('error', 'No file uploaded.');
            nilsca_redirect('/admin/media.php');
        }
        $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $_FILES['file']['tmp_name']);
        finfo_close($finfo);
        if (!isset($allowed[$mime])) {
            nilsca_flash('error', 'Only JPG, PNG, WEBP, GIF allowed.');
            nilsca_redirect('/admin/media.php');
        }
        if (($_FILES['file']['size'] ?? 0) > 5 * 1024 * 1024) {
            nilsca_flash('error', 'File too large (max 5MB).');
            nilsca_redirect('/admin/media.php');
        }
        if (!is_dir(NILSCA_UPLOADS)) {
            mkdir(NILSCA_UPLOADS, 0755, true);
        }
        $label = trim((string) ($_POST['label'] ?? 'upload'));
        $slug = preg_replace('/[^a-z0-9]+/i', '-', strtolower($label ?: 'upload')) ?: 'upload';
        $name = $slug . '-' . time() . '.' . $allowed[$mime];
        $dest = NILSCA_UPLOADS . '/' . $name;
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $dest)) {
            nilsca_flash('error', 'Upload failed.');
            nilsca_redirect('/admin/media.php');
        }
        $files[] = [
            'id' => uniqid('media_', true),
            'label' => $label,
            'path' => '/uploads/' . $name,
            'uploaded_at' => date('c'),
        ];
        nilsca_write_json('media.json', ['files' => $files]);
        nilsca_flash('success', 'Image uploaded.');
        nilsca_redirect('/admin/media.php');
    }

    if ($action === 'delete') {
        $id = (string) ($_POST['id'] ?? '');
        $keep = [];
        foreach ($files as $f) {
            if (($f['id'] ?? '') === $id) {
                $rel = ltrim((string) ($f['path'] ?? ''), '/');
                $full = NILSCA_ROOT . '/' . $rel;
                if (is_file($full) && str_starts_with(realpath($full) ?: '', realpath(NILSCA_UPLOADS) ?: '___')) {
                    @unlink($full);
                }
                continue;
            }
            $keep[] = $f;
        }
        nilsca_write_json('media.json', ['files' => $keep]);
        nilsca_flash('success', 'Media removed.');
        nilsca_redirect('/admin/media.php');
    }
}

$pageTitle = 'Media';
$adminPage = 'media';
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="mx-auto max-w-7xl px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-navy">Media</h1>
  <p class="mt-1 text-sm text-navy/60">Upload images for use across the site. Seeded logos and executive photos live in <code class="text-xs">/images</code>.</p>

  <form method="post" enctype="multipart/form-data" class="mt-8 flex flex-col gap-3 border border-navy/10 bg-white p-6 sm:flex-row sm:items-end">
    <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
    <input type="hidden" name="action" value="upload">
    <label class="block flex-1 text-xs font-semibold uppercase text-navy/60">Label
      <input name="label" placeholder="e.g. Hero background" class="mt-1 w-full border px-3 py-2 text-sm">
    </label>
    <label class="block flex-1 text-xs font-semibold uppercase text-navy/60">File
      <input required type="file" name="file" accept="image/*" class="mt-1 w-full text-sm">
    </label>
    <button class="bg-navy px-4 py-2.5 text-sm font-semibold text-ink">Upload</button>
  </form>

  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <?php foreach ($files as $f): ?>
      <figure class="border border-navy/10 bg-white p-3">
        <img src="<?= e($f['path'] ?? '') ?>" alt="<?= e($f['label'] ?? '') ?>" class="aspect-video w-full object-cover bg-navy/5">
        <figcaption class="mt-3 text-sm font-medium"><?= e($f['label'] ?? '') ?></figcaption>
        <p class="mt-1 break-all text-xs text-navy/50"><?= e($f['path'] ?? '') ?></p>
        <form method="post" class="mt-3" onsubmit="return confirm('Delete this file?')">
          <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="id" value="<?= e($f['id'] ?? '') ?>">
          <button class="text-sm text-seal hover:underline">Delete</button>
        </form>
      </figure>
    <?php endforeach; ?>
    <?php if (!$files): ?>
      <p class="text-sm text-navy/50 sm:col-span-2">No uploads yet.</p>
    <?php endif; ?>
  </div>

  <div class="mt-12">
    <h2 class="font-display text-xl font-bold">Bundled images</h2>
    <div class="mt-4 flex flex-wrap gap-4">
      <?php foreach (['logo.png', 'coat-of-arms.png', 'exec-president.jpg'] as $img): ?>
        <div class="border border-navy/10 bg-white p-2">
          <img src="/images/<?= e($img) ?>" alt="" class="h-20 w-20 object-contain">
          <p class="mt-1 text-[0.65rem] text-navy/50">/images/<?= e($img) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
