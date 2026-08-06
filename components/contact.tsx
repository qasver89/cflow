"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container grid lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Questions, events, or a standing order"
            description="Whether it's a private cupping, a wholesale order, or a table for eight — send a note and we'll reply within a day."
          />

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <span className="h-11 w-11 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-brown" />
              </span>
              <span className="font-mono text-sm text-espresso/80">+358 9 3456 7890</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="h-11 w-11 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-brown" />
              </span>
              <span className="font-mono text-sm text-espresso/80">hello@ninnescafe.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="h-11 w-11 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-brown" />
              </span>
              <span className="font-mono text-sm text-espresso/80">
                Tapiola, Espoo, Finland
              </span>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-paper shadow-soft p-8 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-espresso/50">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-espresso/15 bg-transparent px-4 py-3 text-sm focus-visible:border-brass"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-espresso/50">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-espresso/15 bg-transparent px-4 py-3 text-sm focus-visible:border-brass"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-espresso/50">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-xl border border-espresso/15 bg-transparent px-4 py-3 text-sm focus-visible:border-brass resize-none"
              placeholder="Tell us what you need..."
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
