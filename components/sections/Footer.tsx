"use client";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang, theme } = useLang();
  const tx = t[lang].footer;
  const nav = t[lang].nav;
  const dark = theme === "dark";

  return (
    <footer className={`py-12 px-4 border-t ${dark ? "border-white/10 bg-black" : "border-slate-200 bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M12 6l3 4-3 4-3-4 3-4Z" fill="white" fillOpacity="0.9" />
                <path d="M6 10l3 2-1 4-4-1 2-5ZM18 10l-3 2 1 4 4-1-2-5Z" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <span className="font-orbitron font-bold text-lg gradient-text">{nav.brand}</span>
          </div>

          <p className={`text-sm ${dark ? "text-gray-500" : "text-slate-500"}`}>{tx.tagline}</p>

          <div className="flex gap-6">
            {tx.links.map((link, i) => (
              <a
                key={i}
                href={tx.hrefs[i]}
                className={`text-sm transition-colors hover:text-cyan-500 ${dark ? "text-gray-500" : "text-slate-500"}`}
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
