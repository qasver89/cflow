import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "cFlow Cafe — Admin",
  description: "cFlow Cafe admin dashboard",
};

// The admin section uses its own layout so it doesn't inherit
// the landing page's CartProvider or public Navbar.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
