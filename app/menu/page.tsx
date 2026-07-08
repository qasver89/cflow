"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FoodCard } from "@/components/menu/food-card";
import { MenuSearch, CategoryFilter } from "@/components/menu/menu-filters";
import { FloatingCartBar } from "@/components/menu/floating-cart-bar";
import { Category, MenuItem } from "@/lib/types";

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setCategories(data.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, search, activeCategory]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 md:pt-48">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Full Menu</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-display text-espresso leading-[1.05]">
              What are you in the mood for?
            </h1>
            <p className="mt-4 text-espresso/70 text-lg max-w-xl">
              Coffee, tea, burgers, pizza, desserts, and drinks — all made
              fresh to order.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center gap-5 md:justify-between">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <MenuSearch value={search} onChange={setSearch} />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          {loading ? (
            <p className="text-center text-espresso/50 py-20 font-mono text-sm">
              Loading the menu...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-espresso/50 py-20">
              Nothing matches &ldquo;{search}&rdquo;. Try another search or category.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <FoodCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingCartBar />
    </main>
  );
}
