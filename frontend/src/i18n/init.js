import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.js'
import en from './locales/en.js'

i18next
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
