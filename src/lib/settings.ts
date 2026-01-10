export type GenderPreference = "boy" | "girl" | "neutral";

export interface AppSettings {
  theme: "light" | "dark" | "system";
  defaultGender: GenderPreference;
  defaultDuration: number;
  defaultAutoReset: boolean;
  largeText: boolean;
  highContrast: boolean;
}

const SETTINGS_KEY = "app-settings";

const DEFAULT_SETTINGS: AppSettings = {
  theme: "light",
  defaultGender: "neutral",
  defaultDuration: 5,
  defaultAutoReset: true,
  largeText: false,
  highContrast: false,
};

export const getSettings = (): AppSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: Partial<AppSettings>): void => {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
};

export const resetSettings = (): void => {
  localStorage.removeItem(SETTINGS_KEY);
};

export const applyTheme = (theme: AppSettings["theme"]): void => {
  const root = document.documentElement;
  
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
  }
};

export const applyAccessibility = (settings: Pick<AppSettings, "largeText" | "highContrast">): void => {
  const root = document.documentElement;
  root.classList.toggle("large-text", settings.largeText);
  root.classList.toggle("high-contrast", settings.highContrast);
};
