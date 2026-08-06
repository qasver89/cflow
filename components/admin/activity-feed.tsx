"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Bell, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "@/lib/db";

const ICONS = {
  order: ShoppingBag,
  system: Bell,
  alert: AlertTriangle,
};

const ICON_COLORS = {
  order: "bg-brown/10 text-brown",
  system: "bg-brass/10 text-brass-dark",
  alert: "bg-ember/10 text-ember",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function ActivityFeed({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return (
      <p className="text-center text-espresso/40 text-sm py-8">No recent activity</p>
    );
  }

  return (
    <ul className="space-y-3">
      {notifications.slice(0, 8).map((n, i) => {
        const Icon = ICONS[n.type];
        return (
          <motion.li
            key={n.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl transition-colors",
              !n.read ? "bg-brass/5" : "bg-transparent"
            )}
          >
            <span className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", ICON_COLORS[n.type])}>
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm", n.read ? "text-espresso/60" : "text-espresso")}>
                {n.message}
              </p>
              <p className="text-xs text-espresso/40 font-mono mt-0.5">
                {timeAgo(n.createdAt)}
              </p>
            </div>
            {!n.read && (
              <span className="h-2 w-2 rounded-full bg-brass shrink-0 mt-2" />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
