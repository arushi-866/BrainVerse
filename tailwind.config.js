/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7f5',
          100: '#d5ebe6',
          200: '#addfd6',
          300: '#84d3c5',
          400: '#5cc7b4',
          500: '#33bba3',
          600: '#29a18c',
          700: '#1f7d6d',
          800: '#15594d',
          900: '#0a352e',
        },
        secondary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e1fd',
          300: '#c2d1fc',
          400: '#adc2fb',
          500: '#99b3fa',
          600: '#7f95d6',
          700: '#6577b3',
          800: '#4b598f',
          900: '#313b6c',
        },
        midnight: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        bounce: 'bounce 1s infinite',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-25%)', opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}