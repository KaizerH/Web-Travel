import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#1A8A7A",
          "teal-dark": "#146B5E",
          "teal-light": "#2AADA0",
          rust: "#C4521A",
          "rust-dark": "#A33E10",
          "rust-light": "#E06330",
          cream: "#F5EFE6",
          "cream-dark": "#EDE3D4",
          brown: "#3D2B1F",
          "brown-light": "#6B4C38",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, rgba(26,138,122,0.85) 0%, rgba(196,82,26,0.75) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
