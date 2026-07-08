"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  suffix,
  index = 0,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "green" | "brass" | "ember" | "blue";
  suffix?: string;
  index?: number;
}) {
  const colors = {
    green: "bg-evergreen/10 text-evergreen",
    brass: "bg-brass/10 text-brass-dark",
    ember: "bg-ember/10 text-ember",
    blue: "bg-blue-500/10 text-blue-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl bg-paper shadow-card border border-espresso/5 p-6"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-espresso/60 font-medium">{title}</p>
        <span className={cn("h-10 w-10 rounded-xl flex items-center justify-center", colors[color])}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-display text-espresso">
        {suffix && <span className="text-xl text-espresso/60 mr-0.5">{suffix}</span>}
        {value}
      </p>
    </motion.div>
  );
}
