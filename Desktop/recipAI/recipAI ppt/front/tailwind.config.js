/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#024B39',    // Dark Green (Main sidebar background)
          light: '#035C46',      // Slightly lighter green (Hover states)
          dark: '#01352A',       // Darker green (Gradient bottom)
        },
        secondary: {
          DEFAULT: '#FBC02D',    // Golden Yellow
          dark: '#FFB300',       // Amber Yellow
          light: '#FFF263'       // Lighter shade
        },
        accent: {
          DEFAULT: '#F57C00',    // Burnt Orange
          dark: '#C25E00',
          light: '#FFB74D'
        },
        text: {
          DEFAULT: '#424242',    // Charcoal Gray
          light: '#757575',
          lighter: '#9E9E9E'
        },
        background: {
          DEFAULT: '#FAFAFA',    // Off-White
          darker: '#E0E0E0',     // Light Gray
          darkest: '#BDBDBD'
        },
        border: {
          DEFAULT: '#E0E0E0',    // Light Gray
          dark: '#BDBDBD'
        }
      },
      boxShadow: {
        'inner-white': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      }
    },
  },
  plugins: [],
}