"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

const dishes = [
  {
    name: "Ember Pour-Over",
    note: "Ethiopia Guji, washed",
    price: "6.50",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Brown Butter Croissant",
    note: "Laminated 48 hours, baked to order",
    price: "5.00",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Oat Cortado",
    note: "Double ristretto, house oat milk",
    price: "5.75",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Fig & Honey Toast",
    note: "Sourdough, whipped ricotta, thyme",
    price: "9.00",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Cascara Fizz",
    note: "Coffee cherry tea, soda, citrus",
    price: "6.00",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dark Chocolate Torte",
    note: "70% single-origin cacao, sea salt",
    price: "8.50",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
  },
];

export function FeaturedDishes() {
  return (
    <section id="menu" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="From the Counter"
          title="Featured on the board today"
          description="A short list, changed often — built around whatever is freshest from the roaster and the bakery that morning."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-espresso">{d.name}</h3>
                    <span className="font-mono text-brass-dark text-sm shrink-0 pt-1">
                      ${d.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-espresso/60">{d.note}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
