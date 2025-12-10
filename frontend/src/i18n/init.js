import i18next from 'i18next'
import {initReactI18next} from "react-i18next";
import ru from './locales/ru.js'
import en from './locales/en.js';


i18next
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
            en: { translation: en },
        },
        lng: 'ru',
        fallbackLng: 'ru',
        // debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, // React сам экранирует
        },
    });

export default i18next
