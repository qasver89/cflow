"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function FloatingCartBar() {
  const { itemCount, total } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 inset-x-0 z-40 px-6"
        >
          <div className="container">
            <div className="ml-auto max-w-sm rounded-2xl bg-espresso text-paper shadow-soft px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-brass/20 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-brass-light" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {itemCount} item{itemCount > 1 ? "s" : ""}
                  </p>
                  <p className="font-mono text-xs text-paper/60">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link href="/cart">
                <Button size="sm" variant="brass">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
