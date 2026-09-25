/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'ivory' ko humne Cream me convert kar diya hai
        ivory: '#FDFBF7', 
        // 'champagne' ko Deep Red me convert kar diya hai
        champagne: '#8B0000', 
        // 'charcoal' ko aur dark/premium black-red tint diya hai 
        charcoal: '#1A0F0F', 
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}