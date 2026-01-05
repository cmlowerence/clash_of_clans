/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coc-yellow': '#FACC15',
        'coc-dark': '#1e1e1e',
      },
      fontFamily: {
        // This adds the new font class 'font-clash'
        clash: ['"Luckiest Guy"', 'cursive'],
        sans: ['system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
