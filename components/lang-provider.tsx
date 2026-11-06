"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Lang } from "@/lib/data";

type LangContextValue = { lang: Lang; t: Content; toggle: () => void };

const LangContext = createContext<LangContextValue>({ lang: "en", t: content.en, toggle: () => {} });

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Restore the saved choice, or follow the browser language on first visit.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "ar" || saved === "en") return setLang(saved);
    } catch {}
    if (navigator.language?.toLowerCase().startsWith("ar")) setLang("ar");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return <LangContext.Provider value={{ lang, t: content[lang], toggle }}>{children}</LangContext.Provider>;
}
