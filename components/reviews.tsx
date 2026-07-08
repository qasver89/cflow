"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

const reviews = [
  {
    name: "Farida N.",
    role: "Regular, since 2019",
    quote:
      "The only café where the barista can tell you which farm your beans came from without checking. It shows in the cup.",
  },
  {
    name: "Owais K.",
    role: "Local designer",
    quote:
      "I work from here two mornings a week. Quiet enough to think, good enough coffee that I never miss my usual shop.",
  },
  {
    name: "Meher A.",
    role: "First-time visitor",
    quote:
      "Watched them roast a batch through the glass while I waited. Left with beans I still haven't finished raving about.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="section-pad bg-paper/60">
      <div className="container">
        <SectionHeading
          eyebrow="Word of Mouth"
          title="What keeps people coming back"
          align="center"
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Card className="p-8 h-full flex flex-col">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-brass text-brass" />
                  ))}
                </div>
                <p className="mt-5 text-espresso/80 text-lg leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-espresso/10">
                  <p className="font-display text-espresso">{r.name}</p>
                  <p className="text-sm text-espresso/50">{r.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
