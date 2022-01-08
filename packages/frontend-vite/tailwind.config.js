const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  purge: [
    './src/components/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'rgb(30, 64, 175)',
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
    },
    fontFamily: {
      'body': ['Roboto'],
    },
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      test: '36px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
