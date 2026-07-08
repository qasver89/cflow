"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

const images = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop",
    alt: "Latte art on a flat white",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=900&auto=format&fit=crop",
    alt: "Interior seating area with warm light",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop",
    alt: "Roaster tending the drum roaster",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop",
    alt: "Green coffee beans in burlap sack",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?q=80&w=900&auto=format&fit=crop",
    alt: "Espresso shot pulling",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=900&auto=format&fit=crop",
    alt: "Pastry case display",
    span: "",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="A Look Inside"
          title="The roastery, the counter, the room"
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
