import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ninnes Cafe & Restaurant — Admin",
  description: "Ninnes Cafe & Restaurant admin dashboard",
  robots: { index: false, follow: false },
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
