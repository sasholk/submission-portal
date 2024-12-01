import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        mutedPurple: 'var(--primary)',
        softPink: 'var(--secondary)',
        lightPink: 'var(--light-pink)',
        cream: 'var(--cream)',
      },
    },
  },
  plugins: [],
} satisfies Config;