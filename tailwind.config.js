/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple: "#8e3996",
    },
    extend: {
      screens: {
        sm: "429px",
        md: "833px",
      },
    },
  },
  plugins: [],
};
