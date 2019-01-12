import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LANG } from '@/config'
import en from './lang/en'
import zh from './lang/zh'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem(LANG) || 'en',
  fallbackLocale: localStorage.getItem(LANG) || 'en',
  messages: {
    en,
    zh
  }
})
