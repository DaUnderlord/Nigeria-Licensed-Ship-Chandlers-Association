import type { Metadata } from "next";
import { getContent } from "@/lib/data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: {
      default: "Nigeria Licensed Ship Chandlers Association",
      template: "%s | NILSCA",
    },
    description:
      content.meta_description ??
      "Nigeria Licensed Ship Chandlers Association — licensed ship chandlers for Nigerian ports.",
    icons: { icon: "/images/logo.png" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink antialiased">{children}</body>
    </html>
  );
}
