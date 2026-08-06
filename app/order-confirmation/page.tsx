"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Hash, UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Order } from "@/lib/types";

function OrderConfirmationContent() {
  const { lastOrder } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");

    // Prefer the order already in context (just placed, no round trip needed).
    if (lastOrder && (!id || lastOrder.id === id)) {
      setOrder(lastOrder);
      return;
    }

    // Fallback: fetch by id (e.g. page was refreshed).
    if (id) {
      fetch(`/api/orders?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order) setOrder(data.order);
          else setNotFound(true);
        })
        .catch(() => setNotFound(true));
    } else {
      setNotFound(true);
    }
  }, [lastOrder, searchParams]);

  if (notFound) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-40 pb-32 text-center">
          <div className="container">
            <p className="text-espresso/60 text-lg">
              We couldn&apos;t find that order. It may have already been
              cleared from this session.
            </p>
            <Link href="/menu" className="inline-block mt-6">
              <Button variant="brass">Back to Menu</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-40 pb-32 text-center">
          <p className="text-espresso/50 font-mono text-sm">Loading your order...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-32 md:pt-48">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
              className="h-20 w-20 rounded-full bg-brown flex items-center justify-center shadow-glow"
            >
              <CheckCircle2 className="h-10 w-10 text-paper" strokeWidth={1.5} />
            </motion.span>

            <h1 className="mt-6 text-3xl md:text-4xl font-display text-espresso">
              Order placed successfully
            </h1>
            <p className="mt-2 text-espresso/60">
              Sent straight to the kitchen — sit tight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-12 rounded-3xl bg-paper shadow-card border border-espresso/5 p-8"
          >
            <div className="grid grid-cols-3 gap-4 text-center pb-6 border-b border-espresso/10">
              <div>
                <Hash className="h-4 w-4 text-brass mx-auto" />
                <p className="mt-2 font-mono text-lg text-espresso">{order.orderNumber}</p>
                <p className="text-xs text-espresso/50 mt-0.5">Order No.</p>
              </div>
              <div>
                <UtensilsCrossed className="h-4 w-4 text-brass mx-auto" />
                <p className="mt-2 font-mono text-lg text-espresso">{order.tableNumber}</p>
                <p className="text-xs text-espresso/50 mt-0.5">Table</p>
              </div>
              <div>
                <Clock className="h-4 w-4 text-brass mx-auto" />
                <p className="mt-2 font-mono text-lg text-espresso">
                  {order.estimatedPrepTime} min
                </p>
                <p className="text-xs text-espresso/50 mt-0.5">Est. Prep Time</p>
              </div>
            </div>

            <div className="py-6 space-y-3">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-espresso">
                    {i.quantity} × {i.name}
                  </span>
                  <span className="font-mono text-espresso/70">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-espresso/10 flex justify-between font-mono text-espresso">
              <span>Grand Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brass/10 text-brass-dark px-4 py-2.5 text-sm font-medium">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-brass-dark"
              />
              Status: {order.status}
            </div>
          </motion.div>

          <div className="mt-10 flex justify-center">
            <Link href="/menu">
              <Button variant="outline" onClick={() => router.refresh()}>
                Order Something Else
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <Navbar />
          <section className="pt-40 pb-32 text-center">
            <p className="text-espresso/50 font-mono text-sm">Loading your order...</p>
          </section>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
