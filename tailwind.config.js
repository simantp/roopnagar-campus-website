/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1b4980',
          900: '#091e3e',
          950: '#051329',
        },
        gold: {
          400: '#fbbf24',
          500: '#d97706',
          600: '#b45309',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Mukta"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        nepali: ['"Mukta"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
