import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: "#00FFFF", 400: "#22d3ee", 500: "#06b6d4" },
        purple: { DEFAULT: "#A855F7", 400: "#c084fc", 500: "#a855f7" },
        neon: { cyan: "#00FFFF", purple: "#A855F7" },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      backgroundSize: { "300%": "300%" },
    },
  },
  plugins: [],
};
export default config;
