import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        primary: '#fe7d1a',
        secondary: '#35374d',
        gray: {
          light: '#f5f6fa',
          medium: '#8588ab',
          dark: '#525470',
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}
export default config