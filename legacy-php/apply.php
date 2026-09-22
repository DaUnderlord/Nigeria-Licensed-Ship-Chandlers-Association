<?php
require_once __DIR__ . '/includes/bootstrap.php';

$pageTitle = 'Membership Application';
$bodyClass = 'bg-ink';
$flash = nilsca_get_flash();
$banner = nilsca_content()['images']['chandlery'] ?? '/images/section-chandlery-dock.png';
require __DIR__ . '/includes/header.php';
?>

<main class="pt-24">
  <section class="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
    <div class="page-hero-media" aria-hidden="true">
      <img src="<?= e(nilsca_asset(ltrim($banner, '/'))) ?>" alt="" width="1600" height="900" fetchpriority="high">
    </div>
    <div class="relative z-[1] mx-auto max-w-7xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Membership / Apply</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold md:text-5xl">Membership Application Form</h1>
      <p class="mt-4 max-w-2xl text-ink/70">Please ensure all fields are completed. Applications are reviewed by the Association.</p>
    </div>
  </section>

  <section class="px-4 py-12 md:px-6 md:py-16">
    <div class="mx-auto max-w-3xl">
      <?php if ($flash): ?>
        <div class="mb-6 border px-4 py-3 text-sm <?= $flash['type'] === 'success' ? 'border-sky/40 bg-sky/10 text-navy' : 'border-seal/40 bg-seal/10 text-seal' ?>">
          <?= e($flash['message']) ?>
        </div>
      <?php endif; ?>

      <form action="/api/apply.php" method="post" enctype="multipart/form-data" class="space-y-6 border border-navy/10 bg-white p-6 md:p-10">
        <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">

        <label class="block">
          <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Profile image (optional)</span>
          <input type="file" name="photo" accept="image/*" class="mt-2 block w-full text-sm text-navy/70 file:mr-4 file:border-0 file:bg-navy file:px-4 file:py-2 file:text-ink">
        </label>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block sm:col-span-1">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Surname *</span>
            <input required name="surname" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky" placeholder="Your surname">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Other names *</span>
            <input required name="other_names" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Email address *</span>
            <input required type="email" name="email" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Phone number *</span>
            <input required name="phone" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
        </div>

        <label class="block">
          <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Business address *</span>
          <textarea required name="business_address" rows="2" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky"></textarea>
        </label>
        <label class="block">
          <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Home address *</span>
          <textarea required name="home_address" rows="2" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky"></textarea>
        </label>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">License number *</span>
            <input required name="license_number" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Nationality *</span>
            <input required name="nationality" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">State of origin *</span>
            <input required name="state_of_origin" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
          </label>
          <label class="block">
            <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">L.G.A *</span>
            <input required name="lga" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky" placeholder="Local Govt. Area">
          </label>
        </div>

        <label class="block">
          <span class="text-xs font-semibold tracking-wide text-navy/60 uppercase">Company name</span>
          <input name="company" class="mt-2 w-full border border-navy/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky">
        </label>

        <button type="submit" class="w-full bg-navy px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-navy-mid sm:w-auto">
          Submit application
        </button>
      </form>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>
