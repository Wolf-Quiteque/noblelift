import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../admin.css";

export const metadata: Metadata = {
  title: "Admin — Noblelift Angola",
  robots: "noindex, nofollow",
};

// Bare admin wrapper (used by login + panel). The authenticated shell lives in
// the (panel) layout so the login page stays chrome-free.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased">
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
