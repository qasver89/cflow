"use client";

import { motion } from "framer-motion";
import { Clock, Leaf, Flame, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function FoodCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { lines, addItem, setQuantity } = useCart();
  const line = lines.find((l) => l.item.id === item.id);
  const quantity = line?.quantity ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {item.popular && (
              <span className="flex items-center gap-1 rounded-full bg-ember text-paper text-[11px] font-mono uppercase tracking-wide px-2.5 py-1 shadow-card">
                <Flame className="h-3 w-3" /> Popular
              </span>
            )}
            {item.vegetarian && (
              <span className="flex items-center gap-1 rounded-full bg-brown text-paper text-[11px] font-mono uppercase tracking-wide px-2.5 py-1 shadow-card">
                <Leaf className="h-3 w-3" /> Veg
              </span>
            )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg text-espresso leading-snug">{item.name}</h3>
            <span className="font-mono text-brass-dark text-sm shrink-0 pt-1">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 text-sm text-espresso/60 flex-1">{item.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-espresso/50 font-mono">
              <Clock className="h-3.5 w-3.5" /> {item.prepTime} min
            </span>

            {quantity === 0 ? (
              <Button size="sm" variant="brass" onClick={() => addItem(item)}>
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-3 rounded-full bg-brown/10 px-2 py-1">
                <button
                  aria-label={`Remove one ${item.name}`}
                  onClick={() => setQuantity(item.id, quantity - 1)}
                  className="h-7 w-7 rounded-full bg-paper shadow-card flex items-center justify-center hover:bg-espresso hover:text-paper transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-4 text-center font-mono text-sm text-espresso">
                  {quantity}
                </span>
                <button
                  aria-label={`Add one more ${item.name}`}
                  onClick={() => addItem(item)}
                  className="h-7 w-7 rounded-full bg-paper shadow-card flex items-center justify-center hover:bg-espresso hover:text-paper transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
