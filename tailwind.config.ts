import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        lightPink: 'var(--light-pink)',
        cream: 'var(--cream)',
      },
      boxShadow: {
        custom:
          '0px 0px 25px 6px rgba(0,0,0,0.1),0px 1px 6px -3px rgba(0,0,0,0.1),0px 1px 6px -3px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
