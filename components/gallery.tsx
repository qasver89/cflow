"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

const images = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop",
    alt: "Latte art poured on a flat white",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=900&auto=format&fit=crop",
    alt: "The restaurant dining room, set for service",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=900&auto=format&fit=crop",
    alt: "A breakfast plate of eggs, toast and greens",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=900&auto=format&fit=crop",
    alt: "A layered chocolate cake on a stand",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=900&auto=format&fit=crop",
    alt: "Plated dessert with berries and cream",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop",
    alt: "Fresh croissants and pastries in the case",
    span: "",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="A Look Inside"
          title="The counter, the kitchen, the room"
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
