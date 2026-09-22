<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_require_admin();

$content = nilsca_content();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
        nilsca_flash('error', 'Invalid session.');
        nilsca_redirect('/admin/content.php');
    }

    $content['caution']['title'] = trim((string) ($_POST['caution_title'] ?? 'CAUTION'));
    $content['caution']['lead'] = trim((string) ($_POST['caution_lead'] ?? ''));
    $content['caution']['audience'] = trim((string) ($_POST['caution_audience'] ?? ''));
    $content['caution']['body'] = trim((string) ($_POST['caution_body'] ?? ''));

    $content['hero']['headline'] = trim((string) ($_POST['hero_headline'] ?? ''));
    $content['hero']['subhead'] = trim((string) ($_POST['hero_subhead'] ?? ''));
    $content['hero']['cta_label'] = trim((string) ($_POST['hero_cta_label'] ?? ''));
    $content['hero']['cta_href'] = trim((string) ($_POST['hero_cta_href'] ?? '/membership.php'));
    $content['hero']['image'] = trim((string) ($_POST['hero_image'] ?? '/images/hero-port-dawn.png'));
    $content['images']['chandlery'] = trim((string) ($_POST['image_chandlery'] ?? '/images/section-chandlery-dock.png'));
    $content['images']['horizon'] = trim((string) ($_POST['image_horizon'] ?? '/images/section-horizon.png'));

    $content['president']['name'] = trim((string) ($_POST['president_name'] ?? ''));
    $content['president']['credentials'] = trim((string) ($_POST['president_credentials'] ?? ''));
    $content['president']['title'] = trim((string) ($_POST['president_title'] ?? 'President'));
    $content['president']['greeting'] = trim((string) ($_POST['president_greeting'] ?? ''));
    $content['president']['signoff'] = trim((string) ($_POST['president_signoff'] ?? ''));
    $bodyLines = preg_split("/\r\n|\n|\r/", (string) ($_POST['president_body'] ?? '')) ?: [];
    $content['president']['body'] = array_values(array_filter(array_map('trim', $bodyLines), fn($l) => $l !== ''));

    $content['event']['label'] = trim((string) ($_POST['event_label'] ?? ''));
    $content['event']['date'] = trim((string) ($_POST['event_date'] ?? ''));
    $content['event']['title'] = trim((string) ($_POST['event_title'] ?? ''));
    $content['event']['location'] = trim((string) ($_POST['event_location'] ?? ''));

    $content['news']['label'] = trim((string) ($_POST['news_label'] ?? ''));
    $content['news']['title'] = trim((string) ($_POST['news_title'] ?? ''));

    $content['new_members']['label'] = trim((string) ($_POST['new_members_label'] ?? ''));
    $content['new_members']['title'] = trim((string) ($_POST['new_members_title'] ?? ''));

    $content['contact']['headline'] = trim((string) ($_POST['contact_headline'] ?? ''));
    $content['contact']['subhead'] = trim((string) ($_POST['contact_subhead'] ?? ''));
    $content['contact']['hours'] = trim((string) ($_POST['contact_hours'] ?? ''));
    $content['contact']['address'] = trim((string) ($_POST['contact_address'] ?? ''));
    $content['contact']['email'] = trim((string) ($_POST['contact_email'] ?? ''));
    $content['contact']['phone'] = trim((string) ($_POST['contact_phone'] ?? ''));
    $content['contact']['fax'] = trim((string) ($_POST['contact_fax'] ?? ''));

    nilsca_write_json('content.json', $content);
    nilsca_flash('success', 'Content saved.');
    nilsca_redirect('/admin/content.php');
}

$c = $content;
$pageTitle = 'Content';
$adminPage = 'content';
require dirname(__DIR__) . '/includes/admin-header.php';
?>

<main class="mx-auto max-w-4xl px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-navy">Site content</h1>
  <p class="mt-1 text-sm text-navy/60">Edit home page messaging, news teasers, and contact details.</p>

  <form method="post" class="mt-8 space-y-10">
    <input type="hidden" name="csrf" value="<?= e(nilsca_csrf_token()) ?>">

    <fieldset class="space-y-3 border border-navy/10 bg-white p-6">
      <legend class="px-2 font-display font-bold">Hero</legend>
      <label class="block text-xs font-semibold uppercase text-navy/60">Headline (use line break for two lines)<textarea name="hero_headline" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['hero']['headline'] ?? '') ?></textarea></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Subhead<textarea name="hero_subhead" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['hero']['subhead'] ?? '') ?></textarea></label>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="block text-xs font-semibold uppercase text-navy/60">CTA label<input name="hero_cta_label" value="<?= e($c['hero']['cta_label'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">CTA link<input name="hero_cta_href" value="<?= e($c['hero']['cta_href'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      </div>
      <label class="block text-xs font-semibold uppercase text-navy/60">Hero image path<input name="hero_image" value="<?= e($c['hero']['image'] ?? '/images/hero-port-dawn.png') ?>" class="mt-1 w-full border px-3 py-2 text-sm" placeholder="/images/hero-port-dawn.png"></label>
      <?php if (!empty($c['hero']['image'])): ?>
        <img src="<?= e($c['hero']['image']) ?>" alt="" class="mt-2 aspect-video max-w-md object-cover border border-navy/10">
      <?php endif; ?>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="block text-xs font-semibold uppercase text-navy/60">Chandlery section image<input name="image_chandlery" value="<?= e($c['images']['chandlery'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Horizon section image<input name="image_horizon" value="<?= e($c['images']['horizon'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      </div>
    </fieldset>

    <fieldset class="space-y-3 border border-navy/10 bg-white p-6">
      <legend class="px-2 font-display font-bold">Caution band</legend>
      <label class="block text-xs font-semibold uppercase text-navy/60">Title<input name="caution_title" value="<?= e($c['caution']['title'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Lead<textarea name="caution_lead" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['caution']['lead'] ?? '') ?></textarea></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Audience<textarea name="caution_audience" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['caution']['audience'] ?? '') ?></textarea></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Body<textarea name="caution_body" rows="4" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['caution']['body'] ?? '') ?></textarea></label>
    </fieldset>

    <fieldset class="space-y-3 border border-navy/10 bg-white p-6">
      <legend class="px-2 font-display font-bold">President message</legend>
      <label class="block text-xs font-semibold uppercase text-navy/60">Name<input name="president_name" value="<?= e($c['president']['name'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Credentials<input name="president_credentials" value="<?= e($c['president']['credentials'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Title<input name="president_title" value="<?= e($c['president']['title'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Greeting<input name="president_greeting" value="<?= e($c['president']['greeting'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Body (one paragraph per line)<textarea name="president_body" rows="8" class="mt-1 w-full border px-3 py-2 text-sm"><?= e(implode("\n", $c['president']['body'] ?? [])) ?></textarea></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Sign-off<textarea name="president_signoff" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['president']['signoff'] ?? '') ?></textarea></label>
    </fieldset>

    <fieldset class="space-y-3 border border-navy/10 bg-white p-6">
      <legend class="px-2 font-display font-bold">Home teasers</legend>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="block text-xs font-semibold uppercase text-navy/60">Event label<input name="event_label" value="<?= e($c['event']['label'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Event date<input name="event_date" value="<?= e($c['event']['date'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Event title<input name="event_title" value="<?= e($c['event']['title'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Event location<input name="event_location" value="<?= e($c['event']['location'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">News label<input name="news_label" value="<?= e($c['news']['label'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">News title<input name="news_title" value="<?= e($c['news']['title'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">New members label<input name="new_members_label" value="<?= e($c['new_members']['label'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">New members title<input name="new_members_title" value="<?= e($c['new_members']['title'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      </div>
    </fieldset>

    <fieldset class="space-y-3 border border-navy/10 bg-white p-6">
      <legend class="px-2 font-display font-bold">Contact</legend>
      <label class="block text-xs font-semibold uppercase text-navy/60">Headline<input name="contact_headline" value="<?= e($c['contact']['headline'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Subhead<input name="contact_subhead" value="<?= e($c['contact']['subhead'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Hours<input name="contact_hours" value="<?= e($c['contact']['hours'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      <label class="block text-xs font-semibold uppercase text-navy/60">Address<textarea name="contact_address" rows="2" class="mt-1 w-full border px-3 py-2 text-sm"><?= e($c['contact']['address'] ?? '') ?></textarea></label>
      <div class="grid gap-3 sm:grid-cols-3">
        <label class="block text-xs font-semibold uppercase text-navy/60">Email<input name="contact_email" value="<?= e($c['contact']['email'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Phone<input name="contact_phone" value="<?= e($c['contact']['phone'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
        <label class="block text-xs font-semibold uppercase text-navy/60">Fax<input name="contact_fax" value="<?= e($c['contact']['fax'] ?? '') ?>" class="mt-1 w-full border px-3 py-2 text-sm"></label>
      </div>
    </fieldset>

    <button class="bg-navy px-6 py-3 text-sm font-semibold text-ink">Save content</button>
  </form>
</main>

<?php require dirname(__DIR__) . '/includes/admin-footer.php'; ?>
