import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as RNLocalize from "react-native-localize";
import en from "./i18n/en.json";
import pt from "./i18n/pt.json";
const resources = { en: {translation: en}, pt: {translation: pt} };
const {languageTag} = RNLocalize.getLocales()[0];
i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: languageTag.startsWith("pt") ? "pt" : "en",
//   lng: "pt",
  resources,
  fallbackLng: "en",
  interpolation: {escapeValue: false},
});
export default i18n;
