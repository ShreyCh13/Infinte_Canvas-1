import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#b3d8ff',
          300: '#85c2ff',
          400: '#4da6ff',
          500: '#1a8cff',
          600: '#0073e6',
          700: '#005bb4',
          800: '#004288',
          900: '#002b59',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config



