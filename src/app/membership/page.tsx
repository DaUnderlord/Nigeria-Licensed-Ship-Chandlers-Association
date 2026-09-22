import type { Metadata } from "next";
import { ClientEffects } from "@/components/ClientEffects";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContent, getMembers } from "@/lib/data";

export const metadata: Metadata = { title: "Member's List" };

export default async function MembershipPage() {
  const content = await getContent();
  const members = await getMembers();
  const banner = content.hero?.image ?? "/images/hero-port-dawn.png";

  return (
    <>
      <ClientEffects />
      <SiteHeader />
      <main className="pt-24">
        <section className="relative overflow-hidden px-4 py-20 text-ink md:px-6 md:py-24">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky uppercase">Home / Membership / List</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">List of Our Members</h1>
            <p className="mt-4 max-w-2xl text-ink/85">NILSCA comprehensive members list — verify licensed ship chandlers before you engage.</p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-sm font-semibold tracking-[0.15em] text-sky uppercase">Directory</p>
                <p className="mt-1 text-sm text-navy/60">
                  <span data-member-count>{members.length}</span> of {members.length} members shown
                </p>
              </div>
              <label className="block w-full max-w-md">
                <span className="sr-only">Search members</span>
                <input
                  type="search"
                  data-member-search
                  placeholder="Search company, contact, phone, email…"
                  className="w-full border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none ring-sky focus:ring-2"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="members-table-wrap mt-8 border border-navy/10 bg-white">
              <table className="members-table min-w-full text-left text-sm">
                <thead className="bg-navy text-ink">
                  <tr>
                    <th className="px-3 py-3 font-semibold tracking-wide">No.</th>
                    <th className="px-3 py-3 font-semibold tracking-wide">Name of Companies</th>
                    <th className="px-3 py-3 font-semibold tracking-wide">Companies Address</th>
                    <th className="px-3 py-3 font-semibold tracking-wide">Personal Contact</th>
                    <th className="px-3 py-3 font-semibold tracking-wide">Telephone</th>
                    <th className="px-3 py-3 font-semibold tracking-wide">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => {
                    const search = [m.company, m.address, m.contact, m.phone, m.email].join(" ").toLowerCase();
                    return (
                      <tr key={m.id} className="odd:bg-ink/40 border-t border-navy/10" data-member-row data-search={search}>
                        <td className="px-3 py-3 text-navy/50" data-label="No.">{i + 1}</td>
                        <td className="px-3 py-3 font-medium text-navy" data-label="Company">{m.company}</td>
                        <td className="px-3 py-3 text-navy/70" data-label="Address">{m.address}</td>
                        <td className="px-3 py-3 text-navy/70" data-label="Contact">{m.contact}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-navy/70" data-label="Telephone">{m.phone}</td>
                        <td className="px-3 py-3 text-navy/70" data-label="Email">{m.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="hidden px-4 py-8 text-center text-sm text-navy/50" data-member-empty>
                No members match your search.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter contact={content.contact} />
    </>
  );
}
