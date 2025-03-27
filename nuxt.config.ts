// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      RATES_LINK: 'https://status.neuralgeneration.com/api/currency',
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/eslint-module',
  ],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json', language: 'English' },
      { code: 'ru', file: 'ru.json', language: 'Русский' },
    ],
    langDir: 'locales/',
    vueI18n: './i18n.config.ts',
    defaultLocale: 'ru',
    strategy: 'prefix',
  },
})
