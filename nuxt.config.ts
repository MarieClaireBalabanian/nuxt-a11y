// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  devtools: { enabled: process.env.NODE_ENV === "production" ? false : true },

  components: {
    dirs: [
      {
        path: '~/components',
        global: true,
      },
      '~/components',
    ],
  },


  imports: {
    dirs: ['stores', 'composables'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },
})
