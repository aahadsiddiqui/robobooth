/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#3B82F6',
        'brand-purple': '#8B5CF6',
        gold: '#fce4a6',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-opacity': 'pulse-opacity 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-opacity': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
} 