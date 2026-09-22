import { updateApplicationStatusAction, updateInquiryStatusAction } from "@/app/actions";
import { AdminShell } from "@/components/AdminShell";
import { getApplications, getInquiries } from "@/lib/data";

export default async function AdminApplicationsPage() {
  const apps = [...(await getApplications())].reverse();
  const inquiries = [...(await getInquiries())].reverse();

  return (
    <AdminShell title="Applications & inquiries">
      <h2 className="font-display text-xl font-bold">Membership applications</h2>
      <div className="mt-4 space-y-4">
        {!apps.length ? <p className="text-sm text-navy/50">No applications yet.</p> : null}
        {apps.map((a) => (
          <article key={a.id} className="border border-navy/10 bg-white p-5">
            <p className="font-display text-lg font-bold">{a.surname} {a.other_names}</p>
            <p className="text-sm text-navy/60">{a.company} · {a.email} · {a.phone}</p>
            <p className="mt-2 text-xs text-navy/45">{a.created_at} · Status: <strong>{a.status}</strong></p>
            <form action={updateApplicationStatusAction} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="id" value={a.id} />
              <button name="status" value="pending" className="border px-3 py-1.5 text-xs">Pending</button>
              <button name="status" value="approved" className="border border-sky bg-sky/10 px-3 py-1.5 text-xs">Approved</button>
              <button name="status" value="rejected" className="border border-seal/40 px-3 py-1.5 text-xs text-seal">Rejected</button>
            </form>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-xl font-bold">Contact inquiries</h2>
      <div className="mt-4 space-y-4">
        {!inquiries.length ? <p className="text-sm text-navy/50">No inquiries yet.</p> : null}
        {inquiries.map((inq) => (
          <article key={inq.id} className="border border-navy/10 bg-white p-5">
            <p className="font-display text-lg font-bold">{inq.subject}</p>
            <p className="text-sm text-navy/60">{inq.name} · {inq.email}</p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-navy/75">{inq.message}</p>
            <form action={updateInquiryStatusAction} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={inq.id} />
              <button name="status" value="new" className="border px-3 py-1.5 text-xs">New</button>
              <button name="status" value="read" className="border border-sky bg-sky/10 px-3 py-1.5 text-xs">Mark read</button>
            </form>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
