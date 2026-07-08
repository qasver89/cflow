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
        stone: {
          DEFAULT: "#EFE9DC",
          50: "#FBF8F1",
        },
        paper: "#FBF8F1",
        espresso: "#2B1D14",
        evergreen: {
          DEFAULT: "#1F3D2F",
          light: "#2C5642",
          dark: "#152A20",
        },
        brass: {
          DEFAULT: "#B8894F",
          light: "#D4AC7A",
          dark: "#8F6636",
        },
        ember: {
          DEFAULT: "#A64B2A",
          light: "#C46840",
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
        soft: "0 20px 60px -20px rgba(43, 29, 20, 0.25)",
        card: "0 12px 32px -12px rgba(43, 29, 20, 0.18)",
        glow: "0 0 0 1px rgba(184, 137, 79, 0.25), 0 20px 60px -20px rgba(184, 137, 79, 0.35)",
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
