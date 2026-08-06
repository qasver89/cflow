import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-paper/70 mt-20">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div>
          <a href="#" className="flex items-center gap-2.5 text-paper">
            <Coffee className="h-5 w-5 shrink-0 text-brass-light" strokeWidth={1.75} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl">Ninnes</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/60">
                Cafe &amp; Restaurant
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            Coffee, breakfast, desserts, and dinner made fresh,
            served warm, without cutting corners.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-paper/70">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {["Menu", "About", "Gallery", "Hours"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-paper transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-paper/70">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Tapiola, Espoo, Finland</li>
            <li>+358 9 3456 7890</li>
            <li>hello@ninnescafe.com</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-paper/70">Follow</p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-paper/15 flex items-center justify-center hover:bg-paper/10 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6">
        <p className="container text-xs text-paper/70 font-mono">
          © {new Date().getFullYear()} Ninnes Cafe &amp; Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
