"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoastCurveHero } from "@/components/roast-curve";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      {/* Soft blush-to-cream wash, with a warm pink bloom behind the headline */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blush-soft via-stone to-stone" />
      <div className="absolute -top-32 -left-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-blush/50 blur-3xl" />
      <div className="absolute -top-16 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-brass/10 blur-3xl" />

      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="eyebrow">Ninnes Cafe &amp; Restaurant</span>
          <h1 className="mt-5 text-5xl md:text-7xl leading-[1.02] font-display text-espresso">
            Coffee,
            <br />
            served <em className="text-brass-dark not-italic font-medium italic">deliberate</em>.
          </h1>
          <p className="mt-6 text-lg text-espresso/70 max-w-md leading-relaxed">
            Espresso pulled to order, breakfast from an open kitchen, and cakes
            baked in-house each morning. Quick doesn&apos;t have to mean
            careless.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/menu">
              <Button size="lg" variant="default">
                Order Now
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline">
                View the Menu
              </Button>
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-8 font-mono text-xs text-espresso/50 tracking-wider uppercase">
            <span>Est. 2025</span>
            <span className="h-1 w-1 rounded-full bg-espresso/30" />
            <span>All-Day Breakfast</span>
            <span className="h-1 w-1 rounded-full bg-espresso/30" />
            <span>Roasted On-Site</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-3xl bg-blush/40 blur-2xl" />
          <div className="relative rounded-3xl bg-paper/80 glass shadow-soft p-8 md:p-10">
            <p className="eyebrow mb-4">Today&apos;s Roast Profile</p>
            <RoastCurveHero />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-espresso/50"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
