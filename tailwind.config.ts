import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "#FCFCFD",
          muted: "#F4F5F7",
          card: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          accent: "#06B6D4",
        },
        brand: {
          cyan: "#06B6D4",
          purple: "#8B5CF6",
          orange: "#F97316",
          slate: "#0F172A",
        },
        border: "rgba(226, 232, 240, 0.8)", // E2E8F0 with opacity
      },
      boxShadow: {
        premium: "0 4px 30px rgba(0, 0, 0, 0.03)",
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.04)",
        glow: "0 0 20px rgba(6, 182, 212, 0.15)",
        cardHover: "0 20px 40px -15px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blur-reveal": "blurReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-slide-up": "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blurReveal: {
          "0%": { filter: "blur(12px)", opacity: "0", transform: "scale(0.96)" },
          "100%": { filter: "blur(0)", opacity: "1", transform: "scale(1)" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
