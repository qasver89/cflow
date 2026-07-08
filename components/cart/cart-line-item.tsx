"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartLine } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 py-5 border-b border-espresso/10 last:border-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={line.item.image}
        alt={line.item.name}
        className="h-20 w-20 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg text-espresso truncate">
          {line.item.name}
        </h3>
        <p className="text-sm text-espresso/50 font-mono mt-0.5">
          ${line.item.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-full bg-evergreen/10 px-2 py-1 shrink-0">
        <button
          aria-label={`Decrease quantity of ${line.item.name}`}
          onClick={() => setQuantity(line.item.id, line.quantity - 1)}
          className="h-7 w-7 rounded-full bg-paper shadow-card flex items-center justify-center hover:bg-espresso hover:text-paper transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-4 text-center font-mono text-sm text-espresso">
          {line.quantity}
        </span>
        <button
          aria-label={`Increase quantity of ${line.item.name}`}
          onClick={() => setQuantity(line.item.id, line.quantity + 1)}
          className="h-7 w-7 rounded-full bg-paper shadow-card flex items-center justify-center hover:bg-espresso hover:text-paper transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <span className="font-mono text-espresso w-16 text-right shrink-0">
        ${(line.item.price * line.quantity).toFixed(2)}
      </span>

      <button
        aria-label={`Remove ${line.item.name} from cart`}
        onClick={() => removeItem(line.item.id)}
        className="p-2 text-espresso/40 hover:text-ember transition-colors shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
