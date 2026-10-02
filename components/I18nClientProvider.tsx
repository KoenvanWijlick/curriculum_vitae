"use client";

import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "../src/i18n";

export default function I18nClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [i18n] = useState(createI18n);

  useEffect(() => {
    const handleChange = (language: string) => {
      document.documentElement.lang = language;
      try {
        localStorage.setItem("cv-lang", language);
      } catch {
        // Language switching also works when persistent storage is disabled.
      }
    };
    i18n.on("languageChanged", handleChange);
    document.documentElement.lang = i18n.language;
    try {
      const stored = localStorage.getItem("cv-lang");
      if ((stored === "en" || stored === "nl") && stored !== i18n.language) {
        void i18n.changeLanguage(stored);
      }
    } catch {
      // Use the default language if preferences cannot be read.
    }
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
