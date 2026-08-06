"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#why-us", label: "Why Us" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#hours", label: "Hours" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between rounded-full transition-all duration-500 px-6",
          scrolled ? "glass py-2 shadow-card" : "bg-transparent py-1"
        )}
      >
        <Link
          href="/"
          aria-label="Ninnes Cafe &amp; Restaurant — home"
          className="flex items-center gap-2.5 text-espresso"
        >
          <Coffee className="h-5 w-5 shrink-0 text-brown" strokeWidth={1.75} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">Ninnes</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-espresso/60">
              Cafe &amp; Restaurant
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-espresso/80 hover:text-espresso transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/cart" className="relative p-2 text-espresso hover:text-brass-dark transition-colors">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-ember text-[10px] leading-4 text-paper text-center font-mono">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/menu">
            <Button size="sm" variant="brass">
              Order Now
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart" className="relative p-2 text-espresso">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-ember text-[10px] leading-4 text-paper text-center font-mono">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 text-espresso"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden container mt-2 overflow-hidden"
          >
            <div className="glass rounded-3xl p-6 flex flex-col gap-4 shadow-card">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-espresso/80 hover:text-espresso text-base"
                >
                  {l.label}
                </a>
              ))}
              <Link href="/menu" onClick={() => setOpen(false)}>
                <Button variant="brass" className="mt-2 w-full">
                  Order Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
