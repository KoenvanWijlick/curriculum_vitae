"use client";

import type { ReactNode } from "react";
import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { SiteMotionProvider } from "../components/ScrollScene/ScrollScene";
import { theme } from "../theme";
import I18nClientProvider from "../components/I18nClientProvider";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "mantine-color-scheme-value",
});
const getStoredScheme = colorSchemeManager.get;
colorSchemeManager.get = (defaultValue) => {
  try {
    // Preserve preferences saved by the previous version of the website.
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("mantine-color-scheme-value")
    ) {
      const legacy = localStorage.getItem("runevolve-theme");
      if (legacy === "theme-light") return "light";
      if (legacy === "theme-dark") return "dark";
    }
  } catch {
    // Browsers may disable storage; the theme still works for this visit.
  }
  return getStoredScheme(defaultValue);
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nClientProvider>
      <MantineProvider
        defaultColorScheme="dark"
        colorSchemeManager={colorSchemeManager}
        theme={theme}
      >
        <SiteMotionProvider>{children}</SiteMotionProvider>
      </MantineProvider>
    </I18nClientProvider>
  );
}
