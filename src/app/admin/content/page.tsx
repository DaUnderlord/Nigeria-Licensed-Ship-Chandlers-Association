import { saveContentAction } from "@/app/actions";
import { AdminShell } from "@/components/AdminShell";
import { getContent } from "@/lib/data";

export default async function AdminContentPage() {
  const c = await getContent();

  return (
    <AdminShell title="Site content">
      <form action={saveContentAction} className="mt-2 max-w-4xl space-y-8">
        <fieldset className="space-y-3 border border-navy/10 bg-white p-6">
          <legend className="px-2 font-display font-bold">Hero</legend>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Headline<textarea name="hero_headline" rows={2} defaultValue={c.hero?.headline ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Subhead<textarea name="hero_subhead" rows={2} defaultValue={c.hero?.subhead ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-navy/60 uppercase">CTA label<input name="hero_cta_label" defaultValue={c.hero?.cta_label ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-semibold text-navy/60 uppercase">CTA link<input name="hero_cta_href" defaultValue={c.hero?.cta_href ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          </div>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Hero image path<input name="hero_image" defaultValue={c.hero?.image ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-navy/60 uppercase">Chandlery image<input name="image_chandlery" defaultValue={c.images?.chandlery ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-semibold text-navy/60 uppercase">Horizon image<input name="image_horizon" defaultValue={c.images?.horizon ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          </div>
        </fieldset>

        <fieldset className="space-y-3 border border-navy/10 bg-white p-6">
          <legend className="px-2 font-display font-bold">Caution</legend>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Title<input name="caution_title" defaultValue={c.caution?.title ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Lead<textarea name="caution_lead" rows={2} defaultValue={c.caution?.lead ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Audience<textarea name="caution_audience" rows={2} defaultValue={c.caution?.audience ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Body<textarea name="caution_body" rows={4} defaultValue={c.caution?.body ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
        </fieldset>

        <fieldset className="space-y-3 border border-navy/10 bg-white p-6">
          <legend className="px-2 font-display font-bold">President</legend>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Name<input name="president_name" defaultValue={c.president?.name ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Credentials<input name="president_credentials" defaultValue={c.president?.credentials ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Title<input name="president_title" defaultValue={c.president?.title ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Greeting<input name="president_greeting" defaultValue={c.president?.greeting ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Body (one paragraph per line)<textarea name="president_body" rows={8} defaultValue={(c.president?.body ?? []).join("\n")} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Sign-off<textarea name="president_signoff" rows={2} defaultValue={c.president?.signoff ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
        </fieldset>

        <fieldset className="space-y-3 border border-navy/10 bg-white p-6">
          <legend className="px-2 font-display font-bold">Contact</legend>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Headline<input name="contact_headline" defaultValue={c.contact?.headline ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Subhead<input name="contact_subhead" defaultValue={c.contact?.subhead ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Hours<input name="contact_hours" defaultValue={c.contact?.hours ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <label className="block text-xs font-semibold text-navy/60 uppercase">Address<textarea name="contact_address" rows={2} defaultValue={c.contact?.address ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block text-xs font-semibold text-navy/60 uppercase">Email<input name="contact_email" defaultValue={c.contact?.email ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-semibold text-navy/60 uppercase">Phone<input name="contact_phone" defaultValue={c.contact?.phone ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-semibold text-navy/60 uppercase">Fax<input name="contact_fax" defaultValue={c.contact?.fax ?? ""} className="mt-1 w-full border px-3 py-2 text-sm" /></label>
          </div>
        </fieldset>

        <button className="bg-navy px-6 py-3 text-sm font-semibold text-ink">Save content</button>
      </form>
    </AdminShell>
  );
}
