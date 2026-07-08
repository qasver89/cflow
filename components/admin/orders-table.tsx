"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { Order } from "@/lib/types";
import { StatusSelector, StatusBadge } from "./order-status";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function OrdersTable({
  orders: initialOrders,
  compact = false,
}: {
  orders: Order[];
  compact?: boolean;
}) {
  const [orders, setOrders] = useState(initialOrders);

  function handleStatusUpdate(id: string, status: Order["status"]) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-espresso/40">
        <UtensilsCrossed className="h-10 w-10 mb-3" strokeWidth={1.25} />
        <p className="text-sm">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-espresso/10">
            <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40 pr-4">Order</th>
            <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40 pr-4">Table</th>
            {!compact && (
              <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40 pr-4">Items</th>
            )}
            <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40 pr-4">Total</th>
            <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40 pr-4">Status</th>
            <th className="text-left pb-3 font-mono text-xs uppercase tracking-wide text-espresso/40">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-espresso/5">
          {orders.map((order, i) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="hover:bg-espresso/2 transition-colors"
            >
              <td className="py-4 pr-4">
                <span className="font-mono text-xs text-espresso">{order.orderNumber}</span>
              </td>
              <td className="py-4 pr-4">
                <span className="inline-flex items-center gap-1 text-espresso/70">
                  <UtensilsCrossed className="h-3 w-3" />
                  {order.tableNumber}
                </span>
              </td>
              {!compact && (
                <td className="py-4 pr-4 text-espresso/60 max-w-[200px]">
                  <span className="truncate block">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  </span>
                </td>
              )}
              <td className="py-4 pr-4 font-mono text-espresso">
                ${order.total.toFixed(2)}
              </td>
              <td className="py-4 pr-4">
                <StatusSelector
                  orderId={order.id}
                  currentStatus={order.status}
                  onUpdated={(s) => handleStatusUpdate(order.id, s)}
                />
              </td>
              <td className="py-4 text-espresso/40 text-xs font-mono whitespace-nowrap">
                {timeAgo(order.createdAt)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
