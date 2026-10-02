import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../public/locales/en/common.json";
import nl from "../public/locales/nl/common.json";

export function createI18n() {
  const i18n = createInstance();
  void i18n.use(initReactI18next).init({
    resources: { en: { common: en }, nl: { common: nl } },
    supportedLngs: ["en", "nl"],
    fallbackLng: "en",
    lng: "en",
    ns: ["common"],
    defaultNS: "common",
    initAsync: false,
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  });
  return i18n;
}
