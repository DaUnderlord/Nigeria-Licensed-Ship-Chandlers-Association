"use client";

import { useMemo, useState } from "react";
import { CertifiedMark } from "@/components/CertifiedMark";

export type LookupMember = {
  id: number;
  company: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
  certified?: boolean;
};

export function MemberLookup({ members }: { members: LookupMember[] }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (needle.length < 2) return [];
    return members
      .filter((member) =>
        [member.company, member.address, member.contact, member.phone, member.email]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
      .slice(0, 6);
  }, [members, needle]);

  return (
    <div className="member-lookup relative mt-7 max-w-xl" data-hero-rise style={{ ["--rise-delay" as string]: "400ms" }}>
      <form action="/membership" method="get">
        <label className="block">
          <span className="sr-only">Search members</span>
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search licensed members by company, contact, or phone"
            className="member-lookup-input"
            autoComplete="off"
          />
        </label>
      </form>
      {needle.length >= 2 ? (
        <div className="member-lookup-panel">
          {matches.length === 0 ? (
            <p className="px-4 py-3 text-sm text-navy/55">No members match that search.</p>
          ) : (
            <ul>
              {matches.map((member) => (
                <li key={member.id}>
                  <a href={`/membership?q=${encodeURIComponent(member.company)}`}>
                    <span className="flex items-center gap-2 font-medium text-navy">
                      {member.company}
                      {member.certified ? <CertifiedMark /> : null}
                    </span>
                    <span className="mt-0.5 block text-xs text-navy/50">
                      {[member.contact, member.phone].filter(Boolean).join(" · ") || member.address}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a className="member-lookup-all" href={`/membership?q=${encodeURIComponent(query.trim())}`}>
            View all matches in the directory
          </a>
        </div>
      ) : null}
    </div>
  );
}
