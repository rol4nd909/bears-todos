// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/motion/nuxt",
    "@nuxt/icon",
  ],
  colorMode: {
    classSuffix: "",
  },
  icon: {
    clientBundle: {
      icons: ["solar:trash-bin-minimalistic-linear"],
    },
  },
});
