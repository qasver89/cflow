import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Page canvas — warm cream
        stone: {
          DEFAULT: "#FFF8F2",
          50: "#FFFDFB",
        },
        // Card / on-dark text surface — a touch lighter than the canvas
        paper: "#FFFDFB",
        // Primary text — dark brown
        espresso: "#3E2723",
        // Primary brand + button colour — warm brown (7.4:1 on paper)
        brown: {
          DEFAULT: "#6F4E37",
          light: "#8A6349",
          dark: "#573C2A",
        },
        // Accent — caramel. `dark` is the text-safe variant on cream (5.6:1),
        // `light` is the on-dark-surface variant.
        brass: {
          DEFAULT: "#C68B59",
          light: "#E0B48A",
          dark: "#8A5A2B",
        },
        // Soft pink — decorative washes and highlights only
        blush: {
          DEFAULT: "#F8D7DA",
          soft: "#FDEEEF",
          deep: "#EDBFC4",
        },
        // Alerts / badges — terracotta (4.9:1 on paper, 4.7:1 as text on cream)
        ember: {
          DEFAULT: "#B5533C",
          light: "#CE6E56",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(62, 39, 35, 0.22)",
        card: "0 4px 6px -4px rgba(62, 39, 35, 0.08), 0 12px 32px -12px rgba(62, 39, 35, 0.16)",
        glow: "0 0 0 1px rgba(198, 139, 89, 0.25), 0 20px 60px -20px rgba(198, 139, 89, 0.35)",
      },
      backgroundImage: {
        grain: "url('/grain.png')",
      },
      keyframes: {
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "draw-line": "draw-line 2.4s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
