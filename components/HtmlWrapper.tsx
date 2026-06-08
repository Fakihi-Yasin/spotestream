"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

function DirApplier() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);
  return null;
}

export default function HtmlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning dir="rtl" lang="ar">
      <body>
        {children}
        <DirApplier />
      </body>
    </html>
  );
}
