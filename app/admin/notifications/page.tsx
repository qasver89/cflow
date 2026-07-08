"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { Button } from "@/components/ui/button";
import { Notification } from "@/lib/db";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  async function fetchNotifications() {
    const res = await fetch("/api/admin/notifications");
    const data = await res.json();
    if (data.notifications) setNotifications(data.notifications);
    setLoading(false);
  }

  useEffect(() => { fetchNotifications(); }, []);

  async function markAllRead() {
    setMarking(true);
    await fetch("/api/admin/notifications", { method: "POST" });
    await fetchNotifications();
    setMarking(false);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminShell title="Notifications">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-espresso/60 text-sm">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up"}
          </p>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllRead}
              disabled={marking}
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-paper shadow-card border border-espresso/5 p-6"
        >
          {loading ? (
            <p className="text-center text-espresso/40 text-sm py-10">Loading...</p>
          ) : (
            <ActivityFeed notifications={notifications} />
          )}
        </motion.div>
      </div>
    </AdminShell>
  );
}
