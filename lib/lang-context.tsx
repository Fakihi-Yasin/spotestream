"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";
type Theme = "light" | "dark";

interface AppCtx {
  lang: Lang;
  toggleLang: () => void;
  isRTL: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppCtx>({
  lang: "ar", toggleLang: () => {}, isRTL: true,
  theme: "light", toggleTheme: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("light");

  // Apply dark class to <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleLang = () => setLang(l => l === "en" ? "ar" : "en");
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <AppContext.Provider value={{ lang, toggleLang, isRTL: lang === "ar", theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useLang = () => useContext(AppContext);
