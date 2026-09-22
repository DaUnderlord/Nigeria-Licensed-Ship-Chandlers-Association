<?php
require_once __DIR__ . '/includes/bootstrap.php';

$members = nilsca_members();
$total = count($members);
$banner = nilsca_content()['hero']['image'] ?? '/images/hero-port-dawn.png';

$pageTitle = "Member's List";
$bodyClass = 'bg-ink';
require __DIR__ . '/includes/header.php';
?>

<main class="pt-24">
  <section class="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
    <div class="page-hero-media" aria-hidden="true">
      <img src="<?= e(nilsca_asset(ltrim($banner, '/'))) ?>" alt="" width="1600" height="900" fetchpriority="high">
    </div>
    <div class="relative z-[1] mx-auto max-w-7xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Membership / List</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold md:text-5xl">List of Our Members</h1>
      <p class="mt-4 max-w-2xl text-ink/70">NILSCA comprehensive members list — verify licensed ship chandlers before you engage.</p>
    </div>
  </section>

  <section class="px-4 py-12 md:px-6 md:py-16">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="font-display text-sm font-semibold tracking-[0.15em] text-sky uppercase">Directory</p>
          <p class="mt-1 text-sm text-navy/60"><span data-member-count><?= (int) $total ?></span> of <?= (int) $total ?> members shown</p>
        </div>
        <label class="block w-full max-w-md">
          <span class="sr-only">Search members</span>
          <input type="search" data-member-search placeholder="Search company, contact, phone, email…" class="w-full border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none ring-sky focus:ring-2" autocomplete="off">
        </label>
      </div>

      <div class="mt-8 members-table-wrap border border-navy/10 bg-white">
        <table class="members-table min-w-full text-left text-sm">
          <thead class="bg-navy text-ink">
            <tr>
              <th class="px-3 py-3 font-semibold tracking-wide">No.</th>
              <th class="px-3 py-3 font-semibold tracking-wide">Name of Companies</th>
              <th class="px-3 py-3 font-semibold tracking-wide">Companies Address</th>
              <th class="px-3 py-3 font-semibold tracking-wide">Personal Contact</th>
              <th class="px-3 py-3 font-semibold tracking-wide">Telephone</th>
              <th class="px-3 py-3 font-semibold tracking-wide">Email Address</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($members as $i => $m):
              $search = strtolower(trim(($m['company'] ?? '') . ' ' . ($m['address'] ?? '') . ' ' . ($m['contact'] ?? '') . ' ' . ($m['phone'] ?? '') . ' ' . ($m['email'] ?? '')));
            ?>
              <tr class="border-t border-navy/8 odd:bg-ink/40" data-member-row data-search="<?= e($search) ?>">
                <td class="px-3 py-3 text-navy/50" data-label="No."><?= (int) ($i + 1) ?></td>
                <td class="px-3 py-3 font-medium text-navy" data-label="Company"><?= e($m['company'] ?? '') ?></td>
                <td class="px-3 py-3 text-navy/70" data-label="Address"><?= e($m['address'] ?? '') ?></td>
                <td class="px-3 py-3 text-navy/70" data-label="Contact"><?= e($m['contact'] ?? '') ?></td>
                <td class="px-3 py-3 text-navy/70 whitespace-nowrap" data-label="Telephone"><?= e($m['phone'] ?? '') ?></td>
                <td class="px-3 py-3 text-navy/70" data-label="Email"><?= e($m['email'] ?? '') ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
        <p class="hidden px-4 py-8 text-center text-sm text-navy/50" data-member-empty>No members match your search.</p>
      </div>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
