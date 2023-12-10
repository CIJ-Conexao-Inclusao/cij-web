import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "../assets/i18n/pt-BR.json";
import enUS from "../assets/i18n/en-US.json";

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en-US",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			"pt-BR": { translation: ptBR },
			"en-US": { translation: enUS },
		},
	});

export default i18n;
