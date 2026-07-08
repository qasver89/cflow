"use client";

import { motion } from "framer-motion";

/**
 * The page's signature visual: a stylized coffee roast profile —
 * temperature over time, with the real stages a roaster tracks.
 * Used large in the Hero, and as a thin recurring divider elsewhere.
 */
export function RoastCurveHero() {
  const stages = [
    { x: 40, label: "CHARGE", temp: "Start" },
    { x: 220, label: "FIRST CRACK", temp: "196°C" },
    { x: 340, label: "DEVELOPMENT", temp: "" },
    { x: 460, label: "DROP", temp: "205°C" },
  ];

  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="Illustration of a coffee roast temperature curve, from charge to first crack to drop"
    >
      {/* baseline grid */}
      {[80, 140, 200, 260].map((y) => (
        <line key={y} x1="20" y1={y} x2="500" y2={y} stroke="#2B1D14" strokeOpacity="0.06" strokeWidth="1" />
      ))}

      {/* the roast curve itself */}
      <motion.path
        d="M40,290 C90,280 130,250 160,210 C190,168 195,150 220,120 C245,92 300,84 340,80 C390,75 430,60 460,40"
        stroke="#B8894F"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />

      {/* ember gradient fill under curve */}
      <motion.path
        d="M40,290 C90,280 130,250 160,210 C190,168 195,150 220,120 C245,92 300,84 340,80 C390,75 430,60 460,40 L460,300 L40,300 Z"
        fill="url(#roastGradient)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.6 }}
      />

      <defs>
        <linearGradient id="roastGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A64B2A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#A64B2A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* stage markers */}
      {stages.map((s, i) => (
        <motion.g
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.25 }}
        >
          <circle cx={s.x} cy={[290, 210, 92, 40][i]} r="5" fill="#1F3D2F" />
          <text
            x={s.x}
            y={[315, 235, 117, 65][i] * 1}
            textAnchor="middle"
            className="fill-espresso"
            fontSize="10"
            letterSpacing="1.5"
            fontFamily="var(--font-plex-mono)"
          >
            {s.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function RoastCurveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" className="w-full h-10" preserveAspectRatio="none">
        <motion.path
          d="M0,45 C150,45 200,15 350,15 C500,15 550,45 700,45 C850,45 900,10 1050,10 C1150,10 1180,20 1200,25"
          stroke="#B8894F"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
