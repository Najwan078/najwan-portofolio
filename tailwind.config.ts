import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080D",
          900: "#0C0C14",
          800: "#12121C",
          700: "#1A1A28",
          600: "#26263A",
        },
        gold: {
          400: "#E8C989",
          500: "#D4AF7A",
          600: "#B8925A",
        },
        violet: {
          400: "#9C90F5",
          500: "#7C6FF0",
          600: "#6355D6",
        },
        mist: {
          400: "#9A9AB0",
          300: "#B8B8CC",
          100: "#EDEDF4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(8,8,13,1)), repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 48px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212,175,122,0.15), 0 8px 40px -8px rgba(124,111,240,0.25)",
      },
      keyframes: {
        driftCloud: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(24px)" },
        },
        flyBird: {
          "0%": { transform: "translateX(-8vw)" },
          "100%": { transform: "translateX(108vw)" },
        },
        wingFlap: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.35)" },
        },
      },
      animation: {
        "drift-cloud": "driftCloud 9s ease-in-out infinite",
        "fly-bird": "flyBird linear infinite",
        "wing-flap": "wingFlap 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;