import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import translation_en from '../public/locales/en/translation.json';
import translation_ru from '../public/locales/ru/translation.json';
import translation_ua from '../public/locales/ua/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        EN: {
            translation: translation_en,
        },
        UA: {
            translation: translation_ua,
        },
        RU: {
            translation: translation_ru,
        },
    },
    lng: localStorage.getItem('language') || 'RU',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
