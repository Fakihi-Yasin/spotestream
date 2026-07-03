"use client";
import { useLang } from "@/lib/lang-context";

export default function HtmlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="fr">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
