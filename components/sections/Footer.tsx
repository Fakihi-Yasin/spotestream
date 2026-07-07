"use client";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Footer() {
  const { theme } = useLang();
  const tx = t.fr.footer;
  const nav = t.fr.nav;
  const dark = theme === "dark";

  return (
    <footer className={`py-12 px-4 border-t ${dark ? "border-white/10 bg-black" : "border-slate-200 bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <Image
            src="/logo/logo.svg"
            alt={nav.brand}
            width={220}
            height={80}
            className="h-14 w-auto object-contain"
            unoptimized
          />

          <p className={`text-sm ${dark ? "text-gray-500" : "text-slate-500"}`}>{tx.tagline}</p>

          <div className="flex gap-6">
            {tx.links.map((link, i) => (
              <a
                key={i}
                href={tx.hrefs[i]}
                className={`text-sm transition-colors hover:text-[#0055A4] ${dark ? "text-gray-500" : "text-slate-500"}`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className={`border-t pt-6 text-center text-sm ${dark ? "border-white/5 text-gray-600" : "border-slate-100 text-slate-400"}`}>
          {tx.copy}
        </div>
      </div>
    </footer>
  );
}
