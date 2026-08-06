"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Coffee,
  LayoutDashboard,
  ClipboardList,
  Bell,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: ClipboardList, label: "Orders" },
  { href: "/admin/notifications", icon: Bell, label: "Notifications" },
];

export function AdminSidebar({
  onClose,
}: {
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex flex-col h-full bg-espresso w-64 shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-paper/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-lg bg-brass/20 flex items-center justify-center">
            <Coffee className="h-4 w-4 text-brass-light" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-display text-sm text-paper leading-none">Ninnes Cafe &amp; Restaurant</p>
            <p className="font-mono text-[10px] text-paper/65 uppercase tracking-wider mt-0.5">Admin</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 text-paper/65 hover:text-paper lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                active
                  ? "text-paper bg-paper/10"
                  : "text-paper/65 hover:text-paper/90 hover:bg-paper/5"
              )}
            >
              {active && (
                <motion.span
                  layoutId="admin-nav-active"
                  className="absolute inset-0 rounded-xl bg-paper/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="h-4 w-4 relative z-10" strokeWidth={active ? 2 : 1.75} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-paper/10 pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-paper/65 hover:text-ember hover:bg-ember/5 transition-colors"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
