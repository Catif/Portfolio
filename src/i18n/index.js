import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'fr',
  globalInjection: true,
  messages: {
    en,
    fr,
  },
})
