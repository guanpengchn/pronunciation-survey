import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LANG } from '@/config'
import en from './lang/en'
import zh from './lang/zh'

Vue.use(VueI18n)

// function loadLocaleMessages () {
//   const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

export default new VueI18n({
  locale: localStorage.getItem(LANG) || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    zh
  }
})
