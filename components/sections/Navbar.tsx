"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Navbar() {
  const { lang, toggle } = useLang();
  const tx = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/10 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#A855F7] flex items-center justify-center glow-cyan">
            <Zap size={16} className="text-black" />
          </div>
          <span className="font-orbitron font-bold text-lg gradient-text">{tx.brand}</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {tx.links.map((link, i) => (
            <a
              key={i}
              href={tx.hrefs[i]}
              className="text-sm text-gray-400 hover:text-[#00FFFF] transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#A855F7]/40 text-[#A855F7] hover:border-[#A855F7] hover:glow-purple transition-all"
          >
            {tx.lang}
          </button>
          <a
            href="#pricing"
            className="hidden md:block text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black hover:opacity-90 transition-opacity glow-cyan"
          >
            {tx.cta}
          </a>
          <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
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
            className="md:hidden glass border-t border-white/10 px-4 py-4 flex flex-col gap-4"
          >
            {tx.links.map((link, i) => (
              <a
                key={i}
                href={tx.hrefs[i]}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-[#00FFFF] transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black text-center"
            >
              {tx.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
