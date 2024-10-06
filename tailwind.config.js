/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme"); // Include the default theme for extending fonts

module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans], // Open Sans for body text
        display: ["Inter", ...defaultTheme.fontFamily.sans], // Oswald for display/heading
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        html: { fontSize: "62.5%" }, // Set the base font size to 62.5% (10px equivalent)
      });
    },
  ],
};
