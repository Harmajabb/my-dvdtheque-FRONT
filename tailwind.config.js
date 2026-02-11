/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#3f3f46", light: "#52525b", dark: "#27272a" },
        accent: { DEFAULT: "#C0392B", hover: "#A93226" },
        success: "#27AE60",
        warning: "#F39C12",
        danger: "#B91C1C",
        bg: { dark: "#1a1a1a", darker: "#0a0a0a" },
      },
      fontFamily: {
        primary: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        sm: "clamp(0.875rem, 0.85rem + 0.125vw, 1rem)",
        base: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        lg: "clamp(1.125rem, 1rem + 0.625vw, 1.5rem)",
        xl: "clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)",
        "2xl": "clamp(1.5rem, 1.3rem + 1vw, 2.25rem)",
        "3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 3rem)",
        "4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 4rem)",
        "5xl": "clamp(3.5rem, 15vw, 10rem)",
      },
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.04em",
        normal: "0",
        wide: "0.1em",
        wider: "0.15em",
        widest: "0.2em",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(0, 0, 0, 0.08)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.12)",
        "glow-red": "0 0 20px rgba(231, 76, 60, 0.3)",
        "glow-red-lg": "0 0 30px rgba(231, 76, 60, 0.5)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-custom": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "bounce-slow": "bounce-custom 2.5s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
