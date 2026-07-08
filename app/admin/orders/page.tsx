"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/admin/admin-shell";
import { OrdersTable } from "@/components/admin/orders-table";
import { Order } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "All" | Order["status"];

const FILTERS: Filter[] = [
  "All",
  "Waiting for Approval",
  "Preparing",
  "Ready",
  "Completed",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => { if (d.orders) setOrders(d.orders); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? orders
        : orders.filter((o) => o.status === activeFilter),
    [orders, activeFilter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: orders.length };
    for (const f of FILTERS.slice(1)) {
      c[f] = orders.filter((o) => o.status === f).length;
    }
    return c;
  }, [orders]);

  return (
    <AdminShell title="Orders">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
              activeFilter === f
                ? "bg-espresso text-paper border-espresso"
                : "bg-paper text-espresso/70 border-espresso/15 hover:border-espresso/40"
            )}
          >
            {f}
            <span className="ml-2 font-mono text-xs opacity-60">
              {counts[f] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-paper shadow-card border border-espresso/5 p-6"
      >
        {loading ? (
          <p className="text-center text-espresso/40 text-sm py-12">Loading orders...</p>
        ) : (
          <OrdersTable orders={filtered} />
        )}
      </motion.div>
    </AdminShell>
  );
}
