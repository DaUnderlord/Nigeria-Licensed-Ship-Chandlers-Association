"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  getAdminPassword,
  isAdminAuthenticated,
} from "@/lib/auth";
import {
  getApplications,
  getInquiries,
  getMembers,
  saveApplications,
  saveContent,
  saveInquiries,
  saveMembers,
  type Application,
  type Inquiry,
  type Member,
  type SiteContent,
} from "@/lib/data";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== getAdminPassword()) {
    redirect("/admin/login?error=1");
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

export async function saveMemberAction(formData: FormData) {
  await requireAdmin();
  const members = await getMembers();
  const id = Number(formData.get("id") || 0);
  const entry: Member = {
    id: id || (members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1),
    company: String(formData.get("company") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    contact: String(formData.get("contact") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    certified: formData.get("certified") === "on",
  };
  if (!entry.company) redirect("/admin/members?error=company");
  const idx = members.findIndex((m) => m.id === entry.id);
  if (idx >= 0) members[idx] = entry;
  else members.push(entry);
  await saveMembers(members);
  redirect("/admin/members?saved=1");
}

export async function toggleMemberCertifiedAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const members = await getMembers();
  const member = members.find((m) => m.id === id);
  if (member) member.certified = !member.certified;
  await saveMembers(members);
  const back = member && String(formData.get("editing") ?? "") === String(id) ? `?edit=${id}` : "";
  redirect(`/admin/members${back}`);
}

export async function deleteMemberAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const members = (await getMembers()).filter((m) => m.id !== id);
  await saveMembers(members);
  redirect("/admin/members?deleted=1");
}

export async function saveContentAction(formData: FormData) {
  await requireAdmin();
  const { getContent } = await import("@/lib/data");
  const content = (await getContent()) as SiteContent;
  content.hero = {
    ...content.hero,
    headline: String(formData.get("hero_headline") ?? ""),
    subhead: String(formData.get("hero_subhead") ?? ""),
    cta_label: String(formData.get("hero_cta_label") ?? ""),
    cta_href: String(formData.get("hero_cta_href") ?? "/membership"),
    image: String(formData.get("hero_image") ?? "/images/hero-port-dawn.png"),
  };
  content.caution = {
    ...content.caution,
    title: String(formData.get("caution_title") ?? "CAUTION"),
    lead: String(formData.get("caution_lead") ?? ""),
    audience: String(formData.get("caution_audience") ?? ""),
    body: String(formData.get("caution_body") ?? ""),
  };
  content.president = {
    ...content.president,
    name: String(formData.get("president_name") ?? ""),
    credentials: String(formData.get("president_credentials") ?? ""),
    title: String(formData.get("president_title") ?? "President"),
    greeting: String(formData.get("president_greeting") ?? ""),
    signoff: String(formData.get("president_signoff") ?? ""),
    body: String(formData.get("president_body") ?? "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean),
  };
  content.contact = {
    ...content.contact,
    headline: String(formData.get("contact_headline") ?? ""),
    subhead: String(formData.get("contact_subhead") ?? ""),
    hours: String(formData.get("contact_hours") ?? ""),
    address: String(formData.get("contact_address") ?? ""),
    email: String(formData.get("contact_email") ?? ""),
    phone: String(formData.get("contact_phone") ?? ""),
    fax: String(formData.get("contact_fax") ?? ""),
  };
  content.images = {
    ...content.images,
    chandlery: String(formData.get("image_chandlery") ?? ""),
    horizon: String(formData.get("image_horizon") ?? ""),
  };
  await saveContent(content);
  redirect("/admin/content?saved=1");
}

export async function submitApplicationAction(formData: FormData) {
  const required = [
    "surname",
    "other_names",
    "email",
    "phone",
    "business_address",
    "home_address",
    "license_number",
    "nationality",
    "state_of_origin",
    "lga",
  ];
  for (const key of required) {
    if (!String(formData.get(key) ?? "").trim()) {
      redirect("/apply?error=1");
    }
  }
  const apps = await getApplications();
  const entry: Application = {
    id: `app_${Date.now()}`,
    created_at: new Date().toISOString(),
    status: "pending",
    surname: String(formData.get("surname")).trim(),
    other_names: String(formData.get("other_names")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    business_address: String(formData.get("business_address")).trim(),
    home_address: String(formData.get("home_address")).trim(),
    license_number: String(formData.get("license_number")).trim(),
    nationality: String(formData.get("nationality")).trim(),
    state_of_origin: String(formData.get("state_of_origin")).trim(),
    lga: String(formData.get("lga")).trim(),
    company: String(formData.get("company") ?? "").trim(),
  };
  apps.push(entry);
  await saveApplications(apps);
  redirect("/apply?ok=1");
}

export async function submitContactAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !subject || !message) redirect("/contact?error=1");
  const items = await getInquiries();
  const entry: Inquiry = {
    id: `inq_${Date.now()}`,
    created_at: new Date().toISOString(),
    status: "new",
    name,
    email,
    subject,
    message,
  };
  items.push(entry);
  await saveInquiries(items);
  redirect("/contact?ok=1");
}

export async function updateApplicationStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const apps = await getApplications();
  const next = apps.map((a) => (a.id === id ? { ...a, status } : a));
  await saveApplications(next);
  redirect("/admin/applications");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const items = await getInquiries();
  const next = items.map((a) => (a.id === id ? { ...a, status } : a));
  await saveInquiries(next);
  redirect("/admin/applications");
}
