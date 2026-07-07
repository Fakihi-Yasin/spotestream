"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const WA = "https://wa.me/447460010370?text=Hei%21%20Jeg%20er%20interessert%20i%20et%20IPTV-abonnement.%20Kan%20du%20sende%20meg%20mer%20informasjon%3F";

export default function Navbar() {
  const { toggleTheme, theme } = useLang();
  const tx = t.no.nav;
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);

  const navBg = isDark
    ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
    : "bg-white border-b border-gray-200 shadow-sm py-3";

  const linkClass = isDark
    ? "text-sm text-gray-400 hover:text-[#BA0C2F] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA0C2F] rounded"
    : "text-sm text-slate-600 hover:text-[#00205B] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded";

  const mobileMenuBg = isDark
    ? "bg-black/95 border-t border-white/10"
    : "bg-white border-t border-gray-100 shadow-lg";

  const mobileLinkClass = isDark
    ? "text-gray-300 hover:text-[#BA0C2F] font-medium transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA0C2F] rounded"
    : "text-slate-600 hover:text-[#00205B] font-medium transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      aria-label="Hovednavigasjon"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded" aria-label="SpoteStream – gå til toppen">
          <Image
            src={isDark ? "/logo/logo-dark.svg" : "/logo/logo-light.svg"}
            alt="SpoteStream logo"
            width={380}
            height={120}
            className="h-16 w-auto object-contain"
            priority
            unoptimized
          />
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Sidenavigasjon">
          {tx.links.map((link, i) => (
            <a key={i} href={tx.hrefs[i]} className={linkClass}>{link}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
              isDark
                ? "bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-400/25 focus-visible:ring-yellow-400"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 focus-visible:ring-slate-400"
            }`}
            aria-label={isDark ? "Bytt til lyst tema" : "Bytt til mørkt tema"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-sm font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00205B] to-[#BA0C2F] text-white hover:opacity-90 hover:scale-105 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00205B]"
          >
            {tx.cta}
          </a>

          <button
            className={`md:hidden p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] ${isDark ? "text-gray-300" : "text-slate-700"}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden px-4 py-4 flex flex-col gap-4 ${mobileMenuBg}`}
          >
            {tx.links.map((link, i) => (
              <a key={i} href={tx.hrefs[i]} onClick={() => setOpen(false)} className={mobileLinkClass}>
                {link}
              </a>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-sm font-bold px-4 py-3 rounded-full bg-gradient-to-r from-[#00205B] to-[#BA0C2F] text-white text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00205B]"
            >
              {tx.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
