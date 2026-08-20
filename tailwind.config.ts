import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6F2",
        "paper-alt": "#ECEFE7",
        ink: "#12201A",
        pine: {
          DEFAULT: "#1B5E46",
          dark: "#0F3A2B",
          light: "#2C7A5C",
        },
        copper: {
          DEFAULT: "#B5622A",
          light: "#D98A4F",
          dark: "#8A4A1E",
        },
        border: "#DDE1D8",
        muted: "#5C6B62",
        charcoal: "#0E1613",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(18,32,26,0.04), 0 8px 24px -12px rgba(18,32,26,0.12)",
        card: "0 1px 3px rgba(18,32,26,0.06), 0 1px 2px rgba(18,32,26,0.04)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(18,32,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,32,26,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
