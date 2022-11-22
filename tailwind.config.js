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
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1669001904/xuanming_U5ep_RU_6s_Y_A_unsplash_sm_f3eadf65ea.jpg')",
        "hero-faq":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668056478/salman_hossain_saif_IH_Yo_Os_Wkuf_Q_unsplash_6f143b914e.jpg')",
        "hero-tournaments":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668056996/siora_photography_h_Ve_O_Zsl_Mj_GA_unsplash_1e0a3efebc.jpg')",
        "hero-laws":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668056603/salman_hossain_saif_f_O2764zsk_EQ_unsplash_d3b61b5974.jpg')",
        "hero-training":
          "url('https://res.cloudinary.com/tbcc-media/image/upload/v1668056632/salman_hossain_saif_X_Ca_I0_J_Ma_Nls_unsplash_64bcaefb28.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
