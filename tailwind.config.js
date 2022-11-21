/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8e3996",
        sitemapLink: "#F0F0F0",
        footerWordmark: "#E1E1E1",
        heroText: "#E1E1E1",
      },
      screens: {
        sm: "429px",
        md: "833px",
      },
      backgroundImage: {
        "hero-home":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
        "hero-about":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
        "hero-faq":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
        "hero-tournaments":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
        "hero-laws":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
        "hero-training":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668049222/aboodi_vesakaran_nu_D_Bpg_KO_2_Pc_unsplash_dadba394fa.jpg')",
      },
    },
  },
  plugins: [],
};
