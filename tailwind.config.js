/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
      '3xl': '0 45px 50px 30px rgba(0, 0, 0, 0.3)',
    }},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

