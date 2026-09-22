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
        <section className="relative overflow-hidden px-4 py-28 text-ink md:px-6 md:py-32">
          <div className="page-hero-media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="relative z-[1] mx-auto max-w-7xl" data-reveal>
            <p className="eyebrow">Home / Membership / List</p>
            <h1 className="display-xl mt-6 max-w-[12ch]">List of Our Members</h1>
            <p className="measure mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
              NILSCA comprehensive members list — verify licensed ship chandlers before you engage.
            </p>
          </div>
        </section>

        <section className="section-pad !pt-12 md:!pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Directory</p>
                <p className="mt-2 text-sm text-navy/55">
                  <span data-member-count>{members.length}</span> of {members.length} members shown
                </p>
              </div>
              <label className="block w-full max-w-md">
                <span className="sr-only">Search members</span>
                <input
                  type="search"
                  data-member-search
                  placeholder="Search company, contact, phone, email…"
                  className="form-field"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="members-table-wrap mt-10 bg-white">
              <table className="members-table min-w-full text-left text-sm">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name of Companies</th>
                    <th>Companies Address</th>
                    <th>Personal Contact</th>
                    <th>Telephone</th>
                    <th>Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => {
                    const search = [m.company, m.address, m.contact, m.phone, m.email].join(" ").toLowerCase();
                    return (
                      <tr key={m.id} data-member-row data-search={search}>
                        <td className="text-navy/40" data-label="No.">{i + 1}</td>
                        <td className="font-medium text-navy" data-label="Company">{m.company}</td>
                        <td className="text-navy/65" data-label="Address">{m.address}</td>
                        <td className="text-navy/65" data-label="Contact">{m.contact}</td>
                        <td className="whitespace-nowrap text-navy/65" data-label="Telephone">{m.phone}</td>
                        <td className="text-navy/65" data-label="Email">{m.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="hidden px-4 py-10 text-center text-sm text-navy/45" data-member-empty>
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
