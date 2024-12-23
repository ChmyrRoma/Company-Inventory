import i18next from 'i18next';

enum ESupportedLanguages {
    RU = 'ru',
    UA = 'ua',
    EN = 'en',
}

export const getLanguage = (): ESupportedLanguages => {
    const language = i18next.language?.toLowerCase();
    return language && Object.values(ESupportedLanguages).includes(language as ESupportedLanguages)
        ? (language as ESupportedLanguages)
        : ESupportedLanguages.EN;
};
