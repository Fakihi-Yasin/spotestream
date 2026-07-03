"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Tv, Calendar, BarChart2, Zap, Star, Play, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

/* ── Countdown target: FIFA World Cup 2026 ── */
const WC_DATE = new Date("2026-06-11T00:00:00Z");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

const FEATURES = [
  { icon: Tv,       key: "live"       },
  { icon: Calendar, key: "schedule"   },
  { icon: BarChart2,key: "standings"  },
  { icon: Trophy,   key: "knockout"   },
  { icon: Play,     key: "highlights" },
  { icon: Zap,      key: "scores"     },
];

const FLAGS = ["🇫🇷","🇧🇷","🇦🇷","🇩🇪","🇪🇸","🇵🇹","🇬🇧","🇮🇹","🇳🇱","🇧🇪","🇺🇸","🇲🇦","🇸🇦","🇯🇵","🇰🇷","🇸🇳"];

export default function WorldCup() {
  const { theme } = useLang();
  const tx = t.fr.worldcup;
  const dark = theme === "dark";
  const { days, hours, minutes, seconds } = useCountdown(WC_DATE);
  const [activeFlag, setActiveFlag] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveFlag(p => (p + 1) % FLAGS.length), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="worldcup"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: dark ? "#04040e" : "#03051a" }}
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #d4af37, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0891b2, transparent)" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#d4af37 1px,transparent 1px),linear-gradient(90deg,#d4af37 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          {/* Animated trophy */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
            style={{ background: "linear-gradient(135deg,#d4af37,#f5d76e,#b8860b)" }}
          >
            <Trophy size={40} className="text-white drop-shadow-lg" />
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">{tx.badge}</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-4 leading-tight">
            {tx.title1}{" "}
            <span style={{ background: "linear-gradient(90deg,#d4af37,#f5d76e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {tx.title2}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{tx.sub}</p>
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-center text-gray-500 text-sm mb-6 font-semibold tracking-widest uppercase">{tx.countdown}</p>
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
            {[
              { v: days,    l: tx.days    },
              { v: hours,   l: tx.hours   },
              { v: minutes, l: tx.minutes },
              { v: seconds, l: tx.seconds },
            ].map(({ v, l }) => (
              <div key={l} className="relative rounded-2xl overflow-hidden text-center py-5 px-2"
                style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.12),rgba(212,175,55,0.04))", border: "1px solid rgba(212,175,55,0.25)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={v}
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-orbitron font-black text-3xl md:text-4xl text-white"
                    style={{ textShadow: "0 0 20px rgba(212,175,55,0.5)" }}
                  >
                    {String(v).padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
                <p className="text-[#d4af37] text-[10px] font-bold tracking-widest uppercase mt-1">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Features grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14"
        >
          {FEATURES.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="group relative rounded-2xl p-5 cursor-pointer overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(8,145,178,0.05))" }} />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.05))", border: "1px solid rgba(212,175,55,0.3)" }}>
                  <Icon size={18} style={{ color: "#d4af37" }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{tx.features[key as keyof typeof tx.features].title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{tx.features[key as keyof typeof tx.features].desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Flags ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-center text-gray-600 text-xs font-semibold tracking-widest uppercase mb-5">{tx.nations}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {FLAGS.map((flag, i) => (
              <motion.span
                key={i}
                animate={{ scale: activeFlag === i ? 1.4 : 1, opacity: activeFlag === i ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                className="text-2xl cursor-default select-none"
              >
                {flag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center"
          style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.15) 0%,rgba(8,145,178,0.1) 50%,rgba(168,85,247,0.1) 100%)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          {/* Corner stars */}
          {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-bottom-2 -right-2"].map((pos, i) => (
            <Star key={i} size={16} className={`absolute ${pos} text-[#d4af37] opacity-40`} fill="#d4af37" />
          ))}

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex mb-4"
          >
            <Trophy size={32} style={{ color: "#d4af37" }} />
          </motion.div>

          <h3 className="font-orbitron font-black text-2xl md:text-3xl text-white mb-3">{tx.cta_title}</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">{tx.cta_sub}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white shadow-lg"
              style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            >
              <Trophy size={16} />
              {tx.cta_btn}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-colors"
            >
              {tx.cta_trial}
              <ChevronRight size={16} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
