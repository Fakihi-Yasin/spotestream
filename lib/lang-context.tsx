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
  theme: "light", toggleTheme: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: read saved preference, default to light
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    if (initial === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  // Sync class + localStorage whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <AppContext.Provider value={{ lang: "fr", toggleLang: () => {}, isRTL: false, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useLang = () => useContext(AppContext);
