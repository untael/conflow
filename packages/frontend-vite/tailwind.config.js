const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
    "./src/views/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "rgb(30, 64, 175)",
      transparent: "transparent",
      current: "currentColor",
      ...colors,
    },
    fontFamily: {
      body: ["Roboto"],
    },
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      test: "36px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
