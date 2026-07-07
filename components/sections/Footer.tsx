"use client";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Footer() {
  const { theme } = useLang();
  const tx = t.no.footer;
  const nav = t.no.nav;
  const dark = theme === "dark";

  return (
    <footer
      role="contentinfo"
      className={`py-12 px-4 border-t ${dark ? "border-white/10 bg-black" : "border-slate-200 bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <a href="#" aria-label="SpoteStream – gå til toppen" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded">
            <Image
              src="/logo/logo.svg"
              alt="SpoteStream logo"
              width={220}
              height={80}
              className="h-14 w-auto object-contain"
              unoptimized
            />
          </a>

          <p className={`text-sm ${dark ? "text-gray-400" : "text-slate-500"}`}>{tx.tagline}</p>

          <nav aria-label="Bunnavigasjon">
            <ul className="flex gap-6" role="list">
              {tx.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={tx.hrefs[i]}
                    className={`text-sm transition-colors hover:text-[#00205B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded ${dark ? "text-gray-400" : "text-slate-500"}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={`border-t pt-6 text-center text-sm ${dark ? "border-white/5 text-gray-500" : "border-slate-100 text-slate-400"}`}>
          {tx.copy}
        </div>
      </div>
    </footer>
  );
}
