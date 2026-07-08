"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { StatCard } from "@/components/admin/stat-card";
import { OrdersTable } from "@/components/admin/orders-table";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { Order } from "@/lib/types";
import { Notification } from "@/lib/db";

interface Stats {
  todayOrdersCount: number;
  pendingCount: number;
  completedCount: number;
  todayRevenue: number;
  recentOrders: Order[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Fetch admin identity
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => { if (d.admin?.name) setAdminName(d.admin.name); })
      .catch(() => {});

    // Fetch stats
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

    // Fetch notifications
    fetch("/api/admin/notifications")
      .then((r) => r.json())
      .then((d) => { if (d.notifications) setNotifications(d.notifications); })
      .catch(() => {});
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <AdminShell title="Dashboard">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-display text-espresso">
          {greeting}, {adminName.split(" ")[0]} 👋
        </h2>
        <p className="text-espresso/60 mt-1 text-sm">
          Here&apos;s what&apos;s happening at Trio Bites today.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Today's Orders"
          value={stats?.todayOrdersCount ?? "—"}
          icon={ShoppingBag}
          color="green"
          index={0}
        />
        <StatCard
          title="Pending Orders"
          value={stats?.pendingCount ?? "—"}
          icon={Clock}
          color="brass"
          index={1}
        />
        <StatCard
          title="Completed"
          value={stats?.completedCount ?? "—"}
          icon={CheckCircle2}
          color="blue"
          index={2}
        />
        <StatCard
          title="Today's Revenue"
          value={stats ? stats.todayRevenue.toFixed(2) : "—"}
          icon={DollarSign}
          color="ember"
          suffix="$"
          index={3}
        />
      </div>

      {/* Bottom grid: recent orders + activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="lg:col-span-2 rounded-2xl bg-paper shadow-card border border-espresso/5 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg text-espresso">Recent Orders</h3>
            <Link
              href="/admin/orders"
              className="text-xs text-brass-dark font-mono uppercase tracking-wide hover:text-espresso flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {stats ? (
            <OrdersTable orders={stats.recentOrders} compact />
          ) : (
            <p className="text-center text-espresso/40 text-sm py-10">Loading...</p>
          )}
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="rounded-2xl bg-paper shadow-card border border-espresso/5 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg text-espresso">Recent Activity</h3>
            <Link
              href="/admin/notifications"
              className="text-xs text-brass-dark font-mono uppercase tracking-wide hover:text-espresso flex items-center gap-1"
            >
              All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ActivityFeed notifications={notifications} />
        </motion.div>
      </div>
    </AdminShell>
  );
}
