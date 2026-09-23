import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  const target = path.join(dataDir, file);
  const tmp = `${target}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(tmp, target);
}

export type Member = {
  id: number;
  company: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
  certified?: boolean;
};

export type Executive = {
  name: string;
  role: string;
  company: string;
  photo: string;
};

export type Application = {
  id: string;
  created_at: string;
  status: string;
  surname: string;
  other_names: string;
  email: string;
  phone: string;
  business_address: string;
  home_address: string;
  license_number: string;
  nationality: string;
  state_of_origin: string;
  lga: string;
  company: string;
  photo?: string;
};

export type Inquiry = {
  id: string;
  created_at: string;
  status: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = Record<string, any>;

export async function getContent(): Promise<SiteContent> {
  return readJson<SiteContent>("content.json", {});
}

export async function saveContent(content: SiteContent) {
  await writeJson("content.json", content);
}

export async function getMembers(): Promise<Member[]> {
  const data = await readJson<{ members: Member[] }>("members.json", { members: [] });
  return data.members ?? [];
}

export async function saveMembers(members: Member[]) {
  await writeJson("members.json", { members });
}

export async function getExecutives(): Promise<Executive[]> {
  const data = await readJson<{ executives: Executive[] }>("executives.json", {
    executives: [],
  });
  return data.executives ?? [];
}

export async function getApplications(): Promise<Application[]> {
  const data = await readJson<{ applications: Application[] }>("applications.json", {
    applications: [],
  });
  return data.applications ?? [];
}

export async function saveApplications(applications: Application[]) {
  await writeJson("applications.json", { applications });
}

export async function getInquiries(): Promise<Inquiry[]> {
  const data = await readJson<{ inquiries: Inquiry[] }>("inquiries.json", { inquiries: [] });
  return data.inquiries ?? [];
}

export async function saveInquiries(inquiries: Inquiry[]) {
  await writeJson("inquiries.json", { inquiries });
}

export function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "NA"
  );
}
