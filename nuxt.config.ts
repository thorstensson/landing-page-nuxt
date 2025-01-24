// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devServer: {
    host: '0.0.0.0'
  },

  site: {
    url: 'https://thomasjt.com',
    name: 'Thomas James Thorstensson',
    // ...etc
  },

  seo: {
    meta: {
      description: 'My awesome website',
    }
  },

  runtimeConfig: {
    public: {
      formApi: '',
      s3Path: ''
    }
  },

  modules: ['@nuxt/fonts', '@vueuse/nuxt', 'nuxt-svgo', '@nuxtjs/seo', 'nuxt-og-image', '@nuxtjs/robots', 'nuxt-seo-utils', 'nuxt-site-config',],

  //@ts-ignore
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'unsafe-none'
    },
  },

  robots: {
    blockNonSeoBots: true
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  fonts: {
    provider: 'google'
  },

  svgo: {
    autoImportPath: './assets/svg/',
    defaultImport: 'component',
  },

  devtools: { enabled: true },

})