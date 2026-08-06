"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order } from "@/lib/types";

const STATUS_STYLES: Record<Order["status"], string> = {
  "Waiting for Approval": "bg-amber-100 text-amber-700 border-amber-200",
  Preparing: "bg-blue-100 text-blue-700 border-blue-200",
  Ready: "bg-brown/10 text-brown border-brown/20",
  Completed: "bg-espresso/10 text-espresso/60 border-espresso/10",
};

const ALL_STATUSES: Order["status"][] = [
  "Waiting for Approval",
  "Preparing",
  "Ready",
  "Completed",
];

export function StatusBadge({ status }: { status: Order["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  );
}

export function StatusSelector({
  orderId,
  currentStatus,
  onUpdated,
}: {
  orderId: string;
  currentStatus: Order["status"];
  onUpdated: (status: Order["status"]) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function change(status: Order["status"]) {
    if (status === currentStatus) return;
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) onUpdated(status);
    setLoading(false);
  }

  return (
    <div className="relative inline-flex items-center gap-1">
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-espresso/50" />
      ) : (
        <div className="relative">
          <select
            value={currentStatus}
            onChange={(e) => change(e.target.value as Order["status"])}
            className={cn(
              "appearance-none rounded-full border pl-3 pr-7 py-1 text-xs font-medium cursor-pointer",
              STATUS_STYLES[currentStatus]
            )}
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none opacity-50" />
        </div>
      )}
    </div>
  );
}
