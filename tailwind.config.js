/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        surface: "var(--dark-surface)",
        "card-surface": "var(--card-surface)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-glow": "var(--accent-glow)",
        "accent-base": "var(--accent-border)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        druk: ['"Druk Wide"', '"Arial Black"', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-accent": "var(--gradient-accent)",
      },
      borderColor: {
        "accent-base": "var(--accent-border)",
      },
      boxShadow: {
        "accent-glow": "0 0 60px var(--accent-glow)",
        "cta-glow": "0 0 40px rgba(230, 50, 28, 0.4)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        }
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}
