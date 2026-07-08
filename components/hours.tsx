"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

const hours = [
  { day: "Monday", time: "7:00 — 18:00" },
  { day: "Tuesday", time: "7:00 — 18:00" },
  { day: "Wednesday", time: "7:00 — 18:00" },
  { day: "Thursday", time: "7:00 — 20:00", note: "Cupping night" },
  { day: "Friday", time: "7:00 — 20:00" },
  { day: "Saturday", time: "8:00 — 20:00" },
  { day: "Sunday", time: "8:00 — 16:00" },
];

export function Hours() {
  return (
    <section id="hours" className="section-pad bg-paper/60">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <SectionHeading
          eyebrow="Opening Hours"
          title="Come find us on the daily"
          description="Kitchen closes thirty minutes before the door. The roastery floor is visible through the glass whenever we're open."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-paper shadow-card border border-espresso/5 divide-y divide-espresso/10 overflow-hidden"
        >
          {hours.map((h) => (
            <div
              key={h.day}
              className="flex items-center justify-between px-7 py-4 font-mono text-sm"
            >
              <span className="text-espresso">{h.day}</span>
              <span className="flex items-center gap-3 text-espresso/70">
                {h.note && (
                  <span className="text-xs text-brass-dark uppercase tracking-wide">
                    {h.note}
                  </span>
                )}
                {h.time}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
