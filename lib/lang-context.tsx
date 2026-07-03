"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "fr";
type Theme = "light" | "dark";

interface AppCtx {
  lang: Lang;
  toggleLang: () => void;
  isRTL: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppCtx>({
  lang: "fr", toggleLang: () => {}, isRTL: false,
  theme: "dark", toggleTheme: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <AppContext.Provider value={{ lang: "fr", toggleLang: () => {}, isRTL: false, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useLang = () => useContext(AppContext);
