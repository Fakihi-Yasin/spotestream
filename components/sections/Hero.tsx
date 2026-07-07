"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "@/lib/translations";

const WA = "https://wa.me/447460010370?text=Hei%21%20Jeg%20er%20interessert%20i%20et%20IPTV-abonnement.%20Kan%20du%20sende%20meg%20mer%20informasjon%3F";

const SLIDES = [
  {
    src: "/slide1.jpg",
    badge: "🇳🇴 Eksklusivt lanseringstilbud",
    tag: "Nyhet",
    tagBg: "#00205B",
    tagText: "#ffffff",
    barColor: "#00205B",
  },
  {
    src: "/slide2.jpg",
    badge: "⚽ Eliteserien, Champions League og mer",
    tag: "Sport Live 4K",
    tagBg: "#BA0C2F",
    tagText: "#ffffff",
    barColor: "#BA0C2F",
  },
  {
    src: "/slide3.jpg",
    badge: "🏆 Alle store kamper direkte",
    tag: "-70%",
    tagBg: "#ffffff",
    tagText: "#00205B",
    barColor: "#00205B",
  },
];

const HEADLINE_GRADIENT = "linear-gradient(90deg, #00205B 0%, #ffffff 50%, #BA0C2F 100%)";
const BTN_GRADIENT      = "linear-gradient(90deg, #00205B, #BA0C2F)";

export default function Hero() {
  const tx = t.no.hero;
  const [cur, setCur] = useState(0);

  const next = () => setCur(c => (c + 1) % SLIDES.length);
  const prev = () => setCur(c => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[cur];

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "100svh", minHeight: 600 }}>

      <AnimatePresence initial={false}>
        <motion.div
          key={cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            <Image src={slide.src} alt="hero" fill priority className="object-cover object-center" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto pt-20 pb-28">

        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${cur}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="text-xs font-black px-3 py-1 rounded-full shadow-md"
              style={{ background: slide.tagBg, color: slide.tagText }}
            >
              {slide.tag}
            </span>
            <span className="text-sm font-semibold text-white/90 drop-shadow">{slide.badge}</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${cur}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-orbitron font-black text-3xl sm:text-4xl md:text-7xl lg:text-8xl leading-tight mb-5 max-w-3xl drop-shadow-2xl"
          >
            <span className="text-white">{tx.headline1} </span>
            <span style={{
              background: HEADLINE_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {tx.headline2}
            </span>
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-200 text-sm sm:text-base md:text-xl max-w-xl mb-10 leading-relaxed drop-shadow"
        >
          {tx.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105 hover:opacity-90"
            style={{ background: BTN_GRADIENT, boxShadow: "0 2px 10px rgba(0,32,91,0.35)" }}
          >
            <Play size={20} fill="white" />
            {tx.cta1}
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/50 backdrop-blur-sm bg-white/10 hover:bg-[#00205B]/20 hover:border-[#00205B] hover:text-white transition-all hover:scale-105"
          >
            {tx.cta2}
          </a>
        </motion.div>
      </div>

      <button onClick={prev} aria-label="Forrige"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#00205B] hover:bg-[#00205B]/20 transition-all">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} aria-label="Neste"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#00205B] hover:bg-[#00205B]/20 transition-all">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            aria-label={`Lysbilde ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === cur ? 28 : 8,
              height: 8,
              background: i === cur ? s.barColor : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
        <motion.div
          key={cur}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full rounded-full"
          style={{ background: slide.barColor }}
        />
      </div>

      <div className="absolute bottom-10 right-6 z-20 text-white/50 text-xs font-mono">
        {cur + 1} / {SLIDES.length}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}
