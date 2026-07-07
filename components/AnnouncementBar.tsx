"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  { text: "🇳🇴 Begrenset tilbud — ", bold: "Spar opptil 70%", after: " på alle abonnementer", bold2: "" },
  { text: "🔥 ", bold: "50 000+ kanaler", after: " i 4K — ingen buffering", bold2: "" },
  { text: "⚡ Se Eliteserien, Premier League og Champions League direkte", bold: "", after: "", bold2: "" },
  { text: "⏳ Tidsbegrenset tilbud — Ikke gå glipp av denne sjansen!", bold: "", after: "", bold2: "" },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-12 flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #00205B 0%, #003580 40%, #8a0921 70%, #BA0C2F 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />

      <div className="flex-1 overflow-hidden min-w-0" aria-hidden="true">
        <div className="ann-marquee flex items-center gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...MESSAGES, ...MESSAGES].map((msg, i) => (
            <span key={i} className="text-white text-sm font-semibold tracking-wide">
              {typeof msg === "string" ? msg : (
                <>
                  {msg.text}
                  {msg.bold && <strong className="font-black text-yellow-300">{msg.bold}</strong>}
                  {msg.after}
                  {msg.bold2 && <strong className="font-black text-yellow-300">{msg.bold2}</strong>}
                </>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 pr-3 shrink-0">
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-black px-2.5 py-0.5 rounded-full text-white"
          style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}
        >
          -70%
        </motion.span>
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.97 }}
          className="text-sm font-bold px-4 py-1.5 rounded-full text-white transition-all"
          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}
        >
          Benytt tilbudet →
        </motion.a>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="px-2 text-white/60 hover:text-white transition-colors text-lg leading-none shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        aria-label="Lukk kunngjøring"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
