"use client";
import { Zap } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  const nav = t[lang].nav;

  return (
    <footer className="border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#A855F7] flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="font-orbitron font-bold text-lg gradient-text">{nav.brand}</span>
          </div>
          <p className="text-gray-500 text-sm">{tx.tagline}</p>
          <div className="flex gap-6">
            {tx.links.map((link, i) => (
              <a key={i} href={tx.hrefs[i]} className="text-sm text-gray-500 hover:text-[#00FFFF] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-gray-600 text-sm">
          {tx.copy}
        </div>
      </div>
    </footer>
  );
}
