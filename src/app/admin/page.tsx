import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { getApplications, getInquiries, getMembers } from "@/lib/data";

export default async function AdminDashboardPage() {
  const members = await getMembers();
  const apps = await getApplications();
  const inquiries = await getInquiries();
  const pending = apps.filter((a) => a.status === "pending").length;
  const newInquiries = inquiries.filter((a) => a.status === "new").length;

  return (
    <AdminShell title="Dashboard">
      <p className="text-sm text-navy/60">Manage membership and site copy. On Vercel, set ADMIN_PASSWORD in project env vars. JSON writes persist best on a Node host with a writable filesystem; for durable cloud storage we can add Supabase later.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/members" className="border border-navy/10 bg-white p-6 hover:border-sky">
          <p className="text-xs font-semibold tracking-wide text-sky uppercase">Members</p>
          <p className="mt-3 font-display text-4xl font-bold">{members.length}</p>
        </Link>
        <Link href="/admin/applications" className="border border-navy/10 bg-white p-6 hover:border-sky">
          <p className="text-xs font-semibold tracking-wide text-sky uppercase">Pending applications</p>
          <p className="mt-3 font-display text-4xl font-bold">{pending}</p>
        </Link>
        <Link href="/admin/applications" className="border border-navy/10 bg-white p-6 hover:border-sky">
          <p className="text-xs font-semibold tracking-wide text-sky uppercase">New inquiries</p>
          <p className="mt-3 font-display text-4xl font-bold">{newInquiries}</p>
        </Link>
        <Link href="/admin/content" className="border border-navy/10 bg-white p-6 hover:border-sky">
          <p className="text-xs font-semibold tracking-wide text-sky uppercase">Content</p>
          <p className="mt-3 font-display text-lg font-bold">Edit site copy</p>
        </Link>
      </div>
    </AdminShell>
  );
}
