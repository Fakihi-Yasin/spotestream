"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";
interface LangCtx { lang: Lang; toggle: () => void; isRTL: boolean }

const LangContext = createContext<LangCtx>({ lang: "en", toggle: () => {}, isRTL: false });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang(l => l === "en" ? "ar" : "en");
  return (
    <LangContext.Provider value={{ lang, toggle, isRTL: lang === "ar" }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
