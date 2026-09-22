<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';

if (nilsca_is_admin()) {
    nilsca_redirect('/admin/index.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
        $error = 'Invalid session. Please try again.';
    } elseif (nilsca_attempt_login((string) ($_POST['password'] ?? ''))) {
        nilsca_redirect('/admin/index.php');
    } else {
        $error = 'Incorrect password.';
    }
}

$pageTitle = 'Admin Login';
$hideAdminChrome = true;
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="flex min-h-screen items-center justify-center px-4 py-16">
  <div class="w-full max-w-md border border-navy/10 bg-white p-8 shadow-sm">
    <div class="flex items-center gap-3">
      <img src="<?= e(nilsca_asset('images/logo.png')) ?>" alt="" class="h-12 w-12 object-contain">
      <div>
        <p class="font-display text-lg font-bold text-navy">Admin Login</p>
        <p class="text-xs text-navy/50">NILSCA control panel</p>
      </div>
    </div>
    <?php if ($error): ?>
      <p class="mt-4 border border-seal/30 bg-seal/10 px-3 py-2 text-sm text-seal"><?= e($error) ?></p>
    <?php endif; ?>
    <form method="post" class="mt-6 space-y-4">
      <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
      <label class="block">
        <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Password</span>
        <input type="password" name="password" required autofocus class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
      </label>
      <button type="submit" class="w-full bg-navy px-4 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid">Sign in</button>
    </form>
    <p class="mt-6 text-center text-xs text-navy/40"><a href="/" class="hover:text-sky">← Back to site</a></p>
  </div>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
