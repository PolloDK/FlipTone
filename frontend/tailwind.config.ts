import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fliptone: {
          blue: "#065FA8",
          cyan: "#2B9CE3",
          green: "#7EE6FD",
          dark: "#0B0F19",
          light: "#F9FAFB",
        },
      },
      fontFamily: {
        primary: ["'Space Grotesk'", "sans-serif"],
        secondary: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        nav: "0 -1px 10px rgba(0,0,0,0.1)",
      },
    },
  },
  darkMode: "class",
};

export default config;
