/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8e3996",
        sitemapLink: "#F0F0F0",
        footerWordmark: "#E1E1E1",
      },
      screens: {
        sm: "429px",
        md: "833px",
      },
    },
  },
  plugins: [],
};