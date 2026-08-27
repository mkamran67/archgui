/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)",
        },
        cream: {
          50: "rgb(var(--cream-50) / <alpha-value>)",
          100: "rgb(var(--cream-100) / <alpha-value>)",
          200: "rgb(var(--cream-200) / <alpha-value>)",
        },
        lime: {
          400: "rgb(var(--lime-400) / <alpha-value>)",
          500: "rgb(var(--lime-500) / <alpha-value>)",
          600: "rgb(var(--lime-600) / <alpha-value>)",
        },
        rust: {
          500: "rgb(var(--rust-500) / <alpha-value>)",
          600: "rgb(var(--rust-600) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};