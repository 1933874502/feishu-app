// deps
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// json config
import zhJSON from "./zh.json"
import enJSON from "./en.json"

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translations: enJSON,
    },
    zh: {
      translations: zhJSON,
    },
  },
  fallbackLng: "en",
  debug: true,
  
  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
