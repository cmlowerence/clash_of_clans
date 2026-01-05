/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coc-yellow': '#FACC15', // Custom yellow typically used in CoC
        'coc-dark': '#1e1e1e',
      },
      fontFamily: {
        // We can add a custom game font later
        sans: ['Graphik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
