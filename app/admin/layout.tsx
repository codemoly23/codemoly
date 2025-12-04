import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - CodeMoly",
  description: "CodeMoly Content Management System",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
