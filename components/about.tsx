"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-blush/40 -z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
            alt="The dining room at Ninnes Cafe & Restaurant, with warm lighting and set tables"
            className="rounded-3xl shadow-soft w-full aspect-[4/5] object-cover"
          />
          <div className="hidden md:block absolute -bottom-8 -right-8 rounded-2xl bg-paper shadow-soft p-6 max-w-[220px]">
            <p className="font-display text-3xl text-brass-dark">11</p>
            <p className="text-xs text-espresso/60 mt-1">
              years running the same 12kg drum roaster, by hand
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Our Story</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-display text-espresso leading-[1.1]">
            Started in a garage.
            <br />
            Never lost the habit.
          </h2>
          <p className="mt-6 text-espresso/70 text-lg leading-relaxed">
            Ninnes Cafe &amp; Restaurant began in 2025 as a single drum roaster in
            a converted garage, run before and after a day job. What didn&apos;t
            change when we moved into this building was the habit of logging
            every roast — temperature, timing, the sound of first crack — the
            same notebook discipline that now runs the kitchen too.
          </p>
          <p className="mt-4 text-espresso/70 text-lg leading-relaxed">
            Today the roaster sits behind glass at the back of the dining room,
            the pastry case is filled before seven, and breakfast runs until
            close — so there is always a reason to stay a little longer.
          </p>

          <div className="mt-8 flex gap-10 font-mono">
            <div>
              <p className="text-2xl text-brass-dark">6</p>
              <p className="text-xs text-espresso/50 mt-1 uppercase tracking-wide">
                Partner Farms
              </p>
            </div>
            <div>
              <p className="text-2xl text-brass-dark">120k</p>
              <p className="text-xs text-espresso/50 mt-1 uppercase tracking-wide">
                Cups a Year
              </p>
            </div>
            <div>
              <p className="text-2xl text-brass-dark">3x</p>
              <p className="text-xs text-espresso/50 mt-1 uppercase tracking-wide">
                Roasted Weekly
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
