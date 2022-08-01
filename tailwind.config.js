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
        },
        popIn: {
          '0%': { height: '0', width: '0', opacity: '0' },
          '100%': { height: '1.25rem', width: '1.25rem', opacity: '100%'},
        },
        delayAppear: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        slideOut: 'slideOut 0.3s ease',
        popIn: 'popIn 0.2s ease',
        delayAppear: 'delayAppear 0.3s ease',
      },
      boxShadow: {
        '3xl': '0 0 28px 4px rgba(0, 0, 0, 0.3)',
        'top': '0 -4px 8px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}