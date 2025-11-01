import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import pt from "../i18n/pt.json";
import en from "../i18n/en.json";

const { languageTag } = getLocales()[0];
let language = languageTag.startsWith("pt") ? "pt" : "en";
language = "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: language,
  resources : { en: {translation: en}, pt: {translation: pt} },
  fallbackLng: "en",
  interpolation: {escapeValue: false},
});

export default i18n;
