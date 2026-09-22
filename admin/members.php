<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_require_admin();

$members = nilsca_members();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
        nilsca_flash('error', 'Invalid session.');
        nilsca_redirect('/admin/members.php');
    }

    $action = $_POST['action'] ?? '';

    if ($action === 'create' || $action === 'update') {
        $entry = [
            'id' => $action === 'update' ? (int) ($_POST['id'] ?? 0) : (empty($members) ? 1 : (max(array_column($members, 'id')) + 1)),
            'company' => trim((string) ($_POST['company'] ?? '')),
            'address' => trim((string) ($_POST['address'] ?? '')),
            'contact' => trim((string) ($_POST['contact'] ?? '')),
            'phone' => trim((string) ($_POST['phone'] ?? '')),
            'email' => trim((string) ($_POST['email'] ?? '')),
        ];
        if ($entry['company'] === '') {
            nilsca_flash('error', 'Company name is required.');
            nilsca_redirect('/admin/members.php');
        }
        if ($action === 'create') {
            $members[] = $entry;
            nilsca_flash('success', 'Member added.');
        } else {
            foreach ($members as &$m) {
                if ((int) $m['id'] === $entry['id']) {
                    $m = $entry;
                    break;
                }
            }
            unset($m);
            nilsca_flash('success', 'Member updated.');
        }
        nilsca_write_json('members.json', ['members' => array_values($members)]);
        nilsca_redirect('/admin/members.php');
    }

    if ($action === 'delete') {
        $id = (int) ($_POST['id'] ?? 0);
        $members = array_values(array_filter($members, fn($m) => (int) $m['id'] !== $id));
        // re-number display ids optionally keep original ids
        nilsca_write_json('members.json', ['members' => $members]);
        nilsca_flash('success', 'Member removed.');
        nilsca_redirect('/admin/members.php');
    }
}

$editId = isset($_GET['edit']) ? (int) $_GET['edit'] : 0;
$editing = null;
foreach ($members as $m) {
    if ((int) $m['id'] === $editId) {
        $editing = $m;
        break;
    }
}

$pageTitle = 'Members';
$adminPage = 'members';
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="mx-auto max-w-7xl px-4 py-10">
  <div class="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl font-bold text-navy">Members</h1>
      <p class="mt-1 text-sm text-navy/60"><?= count($members) ?> companies in the public directory</p>
    </div>
  </div>

  <form method="post" class="mt-8 grid gap-3 border border-navy/10 bg-white p-6 md:grid-cols-2">
    <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
    <input type="hidden" name="action" value="<?= $editing ? 'update' : 'create' ?>">
    <?php if ($editing): ?>
      <input type="hidden" name="id" value="<?= (int) $editing['id'] ?>">
    <?php endif; ?>
    <h2 class="md:col-span-2 font-display text-lg font-bold"><?= $editing ? 'Edit member' : 'Add member' ?></h2>
    <label class="block text-xs font-semibold uppercase tracking-wide text-navy/60">Company *
      <input required name="company" value="<?= e($editing['company'] ?? '') ?>" class="mt-1 w-full border border-navy/15 px-3 py-2 text-sm">
    </label>
    <label class="block text-xs font-semibold uppercase tracking-wide text-navy/60">Contact
      <input name="contact" value="<?= e($editing['contact'] ?? '') ?>" class="mt-1 w-full border border-navy/15 px-3 py-2 text-sm">
    </label>
    <label class="block text-xs font-semibold uppercase tracking-wide text-navy/60 md:col-span-2">Address
      <input name="address" value="<?= e($editing['address'] ?? '') ?>" class="mt-1 w-full border border-navy/15 px-3 py-2 text-sm">
    </label>
    <label class="block text-xs font-semibold uppercase tracking-wide text-navy/60">Phone
      <input name="phone" value="<?= e($editing['phone'] ?? '') ?>" class="mt-1 w-full border border-navy/15 px-3 py-2 text-sm">
    </label>
    <label class="block text-xs font-semibold uppercase tracking-wide text-navy/60">Email
      <input name="email" value="<?= e($editing['email'] ?? '') ?>" class="mt-1 w-full border border-navy/15 px-3 py-2 text-sm">
    </label>
    <div class="md:col-span-2 flex gap-2">
      <button class="bg-navy px-4 py-2 text-sm font-semibold text-ink"><?= $editing ? 'Save changes' : 'Add member' ?></button>
      <?php if ($editing): ?>
        <a href="/admin/members.php" class="border border-navy/20 px-4 py-2 text-sm">Cancel</a>
      <?php endif; ?>
    </div>
  </form>

  <div class="mt-10 overflow-x-auto border border-navy/10 bg-white">
    <table class="min-w-full text-left text-sm">
      <thead class="bg-navy text-ink">
        <tr>
          <th class="px-3 py-2">ID</th>
          <th class="px-3 py-2">Company</th>
          <th class="px-3 py-2">Contact</th>
          <th class="px-3 py-2">Phone</th>
          <th class="px-3 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($members as $m): ?>
          <tr class="border-t border-navy/10">
            <td class="px-3 py-2 text-navy/50"><?= (int) $m['id'] ?></td>
            <td class="px-3 py-2 font-medium"><?= e($m['company'] ?? '') ?></td>
            <td class="px-3 py-2"><?= e($m['contact'] ?? '') ?></td>
            <td class="px-3 py-2"><?= e($m['phone'] ?? '') ?></td>
            <td class="px-3 py-2 whitespace-nowrap text-right">
              <a class="text-sky hover:underline" href="/admin/members.php?edit=<?= (int) $m['id'] ?>">Edit</a>
              <form method="post" class="inline" onsubmit="return confirm('Delete this member?')">
                <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<?= (int) $m['id'] ?>">
                <button class="ml-2 text-seal hover:underline">Delete</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
