export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  nitro: {
    preset: 'static',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      title: '數獨解題器',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '線上數獨解題工具，輸入題目即可自動求解。',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01',
})
