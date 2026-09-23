import { deleteMemberAction, saveMemberAction, toggleMemberCertifiedAction } from "@/app/actions";
import { AdminShell } from "@/components/AdminShell";
import { getMembers } from "@/lib/data";

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const sp = await searchParams;
  const members = await getMembers();
  const editId = Number(sp.edit || 0);
  const editing = members.find((m) => m.id === editId);

  return (
    <AdminShell title="Members">
      <p className="text-sm text-navy/60">{members.length} companies in the public directory</p>

      <form action={saveMemberAction} className="mt-8 grid gap-3 border border-navy/10 bg-white p-6 md:grid-cols-2">
        {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
        <h2 className="font-display text-lg font-bold md:col-span-2">{editing ? "Edit member" : "Add member"}</h2>
        <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Company *<input required name="company" defaultValue={editing?.company ?? ""} className="mt-1 w-full border border-navy/15 px-3 py-2 text-sm" /></label>
        <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Contact<input name="contact" defaultValue={editing?.contact ?? ""} className="mt-1 w-full border border-navy/15 px-3 py-2 text-sm" /></label>
        <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase md:col-span-2">Address<input name="address" defaultValue={editing?.address ?? ""} className="mt-1 w-full border border-navy/15 px-3 py-2 text-sm" /></label>
        <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Phone<input name="phone" defaultValue={editing?.phone ?? ""} className="mt-1 w-full border border-navy/15 px-3 py-2 text-sm" /></label>
        <label className="block text-xs font-semibold tracking-wide text-navy/60 uppercase">Email<input name="email" defaultValue={editing?.email ?? ""} className="mt-1 w-full border border-navy/15 px-3 py-2 text-sm" /></label>
        <label className="flex items-center gap-2 text-sm font-medium text-navy md:col-span-2">
          <input type="checkbox" name="certified" defaultChecked={Boolean(editing?.certified)} className="h-4 w-4" />
          Certified member
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button className="bg-navy px-4 py-2 text-sm font-semibold text-ink">{editing ? "Save changes" : "Add member"}</button>
          {editing ? <a href="/admin/members" className="border border-navy/20 px-4 py-2 text-sm">Cancel</a> : null}
        </div>
      </form>

      <div className="mt-10 overflow-x-auto border border-navy/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-navy text-ink">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Certified</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t border-navy/10">
                <td className="px-3 py-2 text-navy/50">{m.id}</td>
                <td className="px-3 py-2 font-medium">{m.company}</td>
                <td className="px-3 py-2">{m.contact}</td>
                <td className="px-3 py-2">{m.phone}</td>
                <td className="px-3 py-2">
                  <form action={toggleMemberCertifiedAction}>
                    <input type="hidden" name="id" value={m.id} />
                    {editing?.id === m.id ? <input type="hidden" name="editing" value={m.id} /> : null}
                    <button
                      className={m.certified ? "text-sm font-semibold text-sky" : "text-sm text-navy/45"}
                      aria-pressed={m.certified ? "true" : "false"}
                    >
                      {m.certified ? "On" : "Off"}
                    </button>
                  </form>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-right">
                  <a className="text-sky hover:underline" href={`/admin/members?edit=${m.id}`}>Edit</a>
                  <form action={deleteMemberAction} className="ml-2 inline">
                    <input type="hidden" name="id" value={m.id} />
                    <button className="text-seal hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
