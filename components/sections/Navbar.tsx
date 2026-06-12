"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

function Logo({ brand }: { brand: string }) {
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <Image
        src="/logo/logo.png"
        alt={brand}
        width={220}
        height={80}
        className="h-16 w-auto object-contain"
        priority
      />
    </a>
  );
}

export default function Navbar() {
  const { lang, toggleLang, theme, toggleTheme } = useLang();
  const tx = t[lang].nav;
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);

  const navBg = isDark
    ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
    : "bg-white border-b border-gray-200 shadow-sm py-3";

  const linkClass = isDark
    ? "text-sm text-gray-400 hover:text-[#00FFFF] font-medium transition-colors duration-200"
    : "text-sm text-slate-600 hover:text-[#0891b2] font-medium transition-colors duration-200";

  const mobileMenuBg = isDark
    ? "bg-black/95 border-t border-white/10"
    : "bg-white border-t border-gray-100 shadow-lg";

  const mobileLinkClass = isDark
    ? "text-gray-300 hover:text-[#00FFFF] font-medium transition-colors py-1"
    : "text-slate-600 hover:text-[#0891b2] font-medium transition-colors py-1";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Logo brand={tx.brand} />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {tx.links.map((link, i) => (
            <a key={i} href={tx.hrefs[i]} className={linkClass}>{link}</a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">

          {/* Theme toggle — Sun / Moon */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? "bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-400/25"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-[#A855F7]/50 text-[#A855F7] hover:bg-[#A855F7]/10 transition-all"
          >
            {tx.lang}
          </button>

          {/* CTA */}
          <a
            href="#pricing"
            className="hidden md:block text-sm font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0891b2] to-[#A855F7] text-white hover:opacity-90 hover:scale-105 transition-all glow-cyan shadow-md"
          >
            {tx.cta}
          </a>

          {/* Hamburger */}
          <button
            className={`md:hidden p-1 ${isDark ? "text-gray-300" : "text-slate-700"}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
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
              href="#pricing"
              onClick={() => setOpen(false)}
              className="text-sm font-bold px-4 py-3 rounded-full bg-gradient-to-r from-[#0891b2] to-[#A855F7] text-white text-center"
            >
              {tx.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
