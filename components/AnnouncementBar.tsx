"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  { text: "🏆 Offre Spéciale ", bold: "Coupe du Monde 2026", after: "", bold2: "" },
  { text: "🔥 Jusqu'à ", bold: "70% de réduction", after: " sur tous les abonnements streaming", bold2: "" },
  { text: "⚽ Regardez chaque match en 4K sans interruption", bold: "", after: "", bold2: "" },
  { text: "⏳ Offre à durée limitée — Ne manquez pas cette chance !", bold: "", after: "", bold2: "" },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-12 flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #003580 0%, #0055A4 40%, #cc2a1f 70%, #EF4135 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes marquee-ann {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ann-marquee {
          animation: marquee-ann 28s linear infinite;
          will-change: transform;
        }
        .ann-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* Scrolling messages */}
      <div className="flex-1 overflow-hidden min-w-0">
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

      {/* Pulsing badge + CTA */}
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
          Profiter de l&apos;offre →
        </motion.a>
      </div>

      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        className="px-2 text-white/50 hover:text-white transition-colors text-lg leading-none shrink-0"
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
}
