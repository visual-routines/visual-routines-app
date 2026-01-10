import { useState, useEffect, useCallback } from "react";
import {
  AppSettings,
  getSettings,
  saveSettings,
  applyTheme,
  applyAccessibility,
} from "@/lib/settings";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(getSettings);

  useEffect(() => {
    applyTheme(settings.theme);
    applyAccessibility({ largeText: settings.largeText, highContrast: settings.highContrast });
  }, [settings.theme, settings.largeText, settings.highContrast]);

  useEffect(() => {
    if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [settings.theme]);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(newSettings);
      return updated;
    });
  }, []);

  return { settings, updateSettings };
}
