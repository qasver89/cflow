"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TableCard } from "@/components/table/table-card";
import { ConfirmTableDialog } from "@/components/table/confirm-dialog";
import { useCart } from "@/lib/cart-context";

// A single site, a single QR code: every table points here and the
// diner picks their table on-page rather than via a per-table link.
const TABLES = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  seats: [2, 2, 4, 4, 4, 6][i % 6],
}));

export default function TableSelectPage() {
  const { lines, notes, total, selectedTable, selectTable, setLastOrder, clearCart } =
    useCart();
  const router = useRouter();

  const [pendingTable, setPendingTable] = useState<number | null>(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasItems = lines.length > 0;

  async function handlePlaceOrder() {
    if (selectedTable === null || !hasItems || placing) return;
    setPlacing(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.item.id, quantity: l.quantity })),
          tableNumber: selectedTable,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong placing your order.");
        setPlacing(false);
        return;
      }
      setLastOrder(data.order);
      clearCart();
      router.push(`/order-confirmation?id=${data.order.id}`);
    } catch {
      setError("Could not reach the kitchen. Please try again.");
      setPlacing(false);
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-32 md:pt-48">
        <div className="container">
          <span className="eyebrow">Almost There</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-display text-espresso leading-[1.05]">
            Select Your Table
          </h1>
          <p className="mt-4 text-espresso/70 text-lg max-w-xl">
            One scan, one menu — just tell us where you&apos;re sitting so the
            kitchen knows where your order goes.
          </p>

          {!hasItems && (
            <p className="mt-6 rounded-xl bg-ember/10 text-ember px-5 py-3 text-sm font-medium inline-block">
              Your cart is empty. Add items from the menu before selecting a table.
            </p>
          )}

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {TABLES.map((t) => (
              <TableCard
                key={t.number}
                number={t.number}
                seats={t.seats}
                selected={selectedTable === t.number}
                onSelect={() => setPendingTable(t.number)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-3xl bg-paper shadow-card border border-espresso/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              {selectedTable !== null ? (
                <p className="flex items-center gap-2 text-evergreen font-medium">
                  <CheckCircle2 className="h-5 w-5" /> Table {selectedTable} selected
                </p>
              ) : (
                <p className="text-espresso/60">
                  No table selected yet — tap a table above and confirm.
                </p>
              )}
              <p className="mt-1 font-mono text-sm text-espresso/50">
                Grand Total: ${total.toFixed(2)}
              </p>
              {error && (
                <p className="mt-2 text-sm text-ember font-medium">{error}</p>
              )}
            </div>

            <Button
              size="lg"
              variant="brass"
              disabled={selectedTable === null || !hasItems || placing}
              onClick={handlePlaceOrder}
              className="disabled:opacity-40"
            >
              {placing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <ConfirmTableDialog
        tableNumber={pendingTable}
        onCancel={() => setPendingTable(null)}
        onConfirm={() => {
          if (pendingTable !== null) selectTable(pendingTable);
          setPendingTable(null);
        }}
      />
    </main>
  );
}
