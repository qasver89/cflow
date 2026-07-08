"use client";

import { motion } from "framer-motion";
import { Flame, Leaf, Timer, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { RoastCurveDivider } from "@/components/roast-curve";

const features = [
  {
    icon: Flame,
    title: "Roasted On-Site, Weekly",
    text: "Our drum runs three times a week. Every bag lists its roast date — no exceptions, no stockpiles.",
  },
  {
    icon: Leaf,
    title: "Direct-Trade Only",
    text: "We buy from six farms we've visited ourselves, paying well above commodity price for lots we chose in person.",
  },
  {
    icon: Timer,
    title: "Dialed In, Daily",
    text: "Baristas recalibrate every grinder each morning against that day's roast — because beans change, and so should the shot.",
  },
  {
    icon: Users,
    title: "Built for Lingering",
    text: "No table turns, no rush. Deep chairs, low light, and outlets at every seat for the long conversation or the long edit.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad bg-evergreen text-paper relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<span className="text-paper">Care, measured in seconds and degrees</span>}
          description=""
          className="[&_.eyebrow]:text-brass-light"
        />
        <p className="max-w-2xl -mt-2 text-paper/70 text-lg leading-relaxed">
          Anyone can sell a cup of coffee. We track the ones that make it worth drinking.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-paper/10 bg-paper/5 p-7 hover:bg-paper/10 transition-colors"
            >
              <f.icon className="h-7 w-7 text-brass-light" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg text-paper">{f.title}</h3>
              <p className="mt-2 text-sm text-paper/60 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 opacity-40">
        <RoastCurveDivider />
      </div>
    </section>
  );
}
