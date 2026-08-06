"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TableCard({
  number,
  seats,
  selected,
  onSelect,
}: {
  number: number;
  seats: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl p-6 text-left border transition-colors duration-300 shadow-card",
        selected
          ? "bg-brown text-paper border-brown shadow-glow"
          : "bg-paper text-espresso border-espresso/10 hover:border-brass"
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 h-6 w-6 rounded-full bg-brass flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-espresso" strokeWidth={3} />
        </span>
      )}

      <UtensilsCrossed
        className={cn("h-7 w-7", selected ? "text-brass-light" : "text-brass")}
        strokeWidth={1.5}
      />

      <p className="mt-4 font-display text-2xl">Table {number}</p>
      <p
        className={cn(
          "mt-1 text-xs font-mono uppercase tracking-wide",
          selected ? "text-paper/60" : "text-espresso/50"
        )}
      >
        Seats {seats}
      </p>
    </motion.button>
  );
}
