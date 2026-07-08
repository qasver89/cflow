"use client";

import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";

export function AdminHeader({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetch("/api/admin/notifications")
      .then((r) => r.json())
      .then((d) => {
        if (d.notifications) {
          setUnread(d.notifications.filter((n: { read: boolean }) => !n.read).length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-paper border-b border-espresso/10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-espresso/60 hover:text-espresso"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-xl text-espresso">{title}</h1>
      </div>

      <Link
        href="/admin/notifications"
        className="relative p-2 text-espresso/60 hover:text-espresso transition-colors"
      >
        <Bell className="h-5 w-5" strokeWidth={1.75} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-ember text-[10px] leading-4 text-paper text-center font-mono">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Link>
    </header>
  );
}
