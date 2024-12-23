import i18next from 'i18next';
var ESupportedLanguages;
(function (ESupportedLanguages) {
    ESupportedLanguages["RU"] = "ru";
    ESupportedLanguages["UA"] = "ua";
    ESupportedLanguages["EN"] = "en";
})(ESupportedLanguages || (ESupportedLanguages = {}));
export const getLanguage = () => {
    const language = i18next.language?.toLowerCase();
    return language && Object.values(ESupportedLanguages).includes(language)
        ? language
        : ESupportedLanguages.EN;
};
