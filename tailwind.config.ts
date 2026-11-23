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
        // User Brand Palette
        navy: {
          950: "#0B131A",
          900: "#12212E", // Deep Navy
          800: "#1A2E3F",
          700: "#243E54",
          600: "#30516E",
          500: "#3F678B",
        },
        teal: {
          900: "#1A3E48",
          800: "#245564",
          700: "#307082", // Teal Blue
          600: "#3C8B9F",
          500: "#4CA3B9",
          400: "#6CB7CB",
          100: "#E2F0F4",
          50: "#F1F7F9",
        },
        aqua: {
          800: "#3B605F",
          700: "#4F7F7E",
          600: "#5D9291",
          500: "#6CA3A2", // Muted Aqua
          400: "#86B6B5",
          300: "#A4CBCB",
          200: "#C4E0E0",
          100: "#E3F1F1",
          50: "#F3F9F9",
        },
        beige: {
          900: "#29241B",
          800: "#474033",
          700: "#6A604E",
          600: "#8D816C",
          500: "#B0A38D",
          400: "#C7BCAB",
          300: "#D9D1C2",
          200: "#E4DFD3",
          100: "#ECE7DC", // Light Beige
          50: "#F8F6F1",
        },
        orange: {
          900: "#4D2D06",
          800: "#7A480B",
          700: "#A76311",
          600: "#CA7B1A",
          500: "#EA9527", // Vibrant Orange
          400: "#EEAA52",
          300: "#F3BF7F",
          200: "#F8D7AC",
          100: "#FDF1E1",
          50: "#FEFAF4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
