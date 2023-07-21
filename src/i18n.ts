import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(backend)
  .init({
    lng: "ru",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
