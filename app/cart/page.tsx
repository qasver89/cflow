"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { lines, notes, setNotes, subtotal, tax, total } = useCart();
  const router = useRouter();

  const isEmpty = lines.length === 0;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pt-48">
        <div className="container">
          <span className="eyebrow">Your Order</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-display text-espresso leading-[1.05]">
            Shopping Cart
          </h1>

          {isEmpty ? (
            <div className="mt-16 flex flex-col items-center text-center py-16">
              <span className="h-16 w-16 rounded-full bg-evergreen/10 flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-evergreen" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-espresso/60 text-lg">
                Your cart is empty right now.
              </p>
              <Link href="/menu" className="mt-6">
                <Button variant="brass">Browse the Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 rounded-3xl bg-paper shadow-card border border-espresso/5 p-6 md:p-8">
                <AnimatePresence>
                  {lines.map((line) => (
                    <CartLineItem key={line.item.id} line={line} />
                  ))}
                </AnimatePresence>

                <div className="mt-6">
                  <label className="text-xs font-mono uppercase tracking-wide text-espresso/50">
                    Order Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="Allergies, spice level, no onions — anything the kitchen should know."
                    className="mt-2 w-full rounded-xl border border-espresso/15 bg-transparent px-4 py-3 text-sm focus-visible:border-brass resize-none"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-evergreen text-paper shadow-soft p-8 h-fit lg:sticky lg:top-32"
              >
                <h2 className="font-display text-xl">Order Summary</h2>
                <div className="mt-6 space-y-3 font-mono text-sm">
                  <div className="flex justify-between text-paper/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-paper/70">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-paper/15 flex justify-between text-lg text-paper">
                    <span>Grand Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="brass"
                  className="mt-8 w-full"
                  onClick={() => router.push("/table-select")}
                >
                  Proceed to Table Selection <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
