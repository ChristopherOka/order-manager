/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: {
          100: "#fafafa",
          900: "#161616",
        }
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      keyframes: {
        slideOut: {
          '0%': { transform: 'translateY(-35px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '100%' },
        }
      },
      animation: {
        slideOut: 'slideOut 0.3s ease',
      },
      boxShadow: {
        '3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}