"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const SLIDES = [
  {
    src: "/slide1.jpg",
    badge: { ar: "🌙 عرض رمضان الخاص", en: "🌙 Ramadan Special" },
    tag:   { ar: "حصري",               en: "Exclusive"         },
    tagColor: "#A855F7",
    from: "50% 40%",
    to:   "50% 50%",
  },
  {
    src: "/slide2.jpg",
    badge: { ar: "⚽ دوريات عالمية", en: "⚽ World Leagues" },
    tag:   { ar: "بث مباشر 4K",     en: "Live 4K"         },
    tagColor: "#00FFFF",
    from: "60% 50%",
    to:   "50% 50%",
  },
  {
    src: "/slide3.jpg",
    badge: { ar: "🏆 أقوى المباريات", en: "🏆 Top Matches" },
    tag:   { ar: "خصم 40%",           en: "40% OFF"        },
    tagColor: "#f59e0b",
    from: "50% 60%",
    to:   "50% 50%",
  },
];

const STATS = [
  { val: "10K+", ar: "قناة",         en: "Channels" },
  { val: "4K",   ar: "جودة",         en: "Quality"  },
  { val: "99.9%",ar: "وقت التشغيل", en: "Uptime"   },
  { val: "24/7", ar: "دعم",          en: "Support"  },
];

export default function Hero() {
  const { lang, isRTL } = useLang();
  const tx = t[lang].hero;
  const [cur, setCur] = useState(0);

  const next = () => setCur(c => (c + 1) % SLIDES.length);
  const prev = () => setCur(c => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[cur];

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* ── BACKGROUND SLIDES ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, x: 0 }}
            animate={{ scale: 1, x: isRTL ? 10 : -10 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            <Image
              src={slide.src}
              alt="hero"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Lighter overlay — only 25% dark so image quality shows */}
          <div className="absolute inset-0 bg-black/25" />
          {/* Cinematic bottom fade for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          {/* Side fade for text area */}
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-black/55 via-black/10 to-transparent`} />
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto pt-20 pb-28">

        {/* Slide tag */}
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
              className="text-xs font-black px-3 py-1 rounded-full text-black shadow-lg"
              style={{ background: slide.tagColor }}
            >
              {slide.tag[lang]}
            </span>
            <span className="text-sm font-semibold text-white/90 drop-shadow">
              {slide.badge[lang]}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${cur}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-5 max-w-3xl drop-shadow-2xl"
          >
            <span className="text-white">{tx.headline1} </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${slide.tagColor}, #A855F7)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tx.headline2}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-200 text-lg md:text-xl max-w-xl mb-10 leading-relaxed drop-shadow"
        >
          {tx.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <a
            href="#pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-black shadow-xl transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${slide.tagColor}, #A855F7)` }}
          >
            <Play size={20} fill="black" />
            {tx.cta1}
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all hover:scale-105"
          >
            {tx.cta2}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-8"
        >
          {STATS.map(s => (
            <div key={s.val} className="text-center">
              <div
                className="font-orbitron font-black text-2xl drop-shadow"
                style={{
                  background: `linear-gradient(135deg, ${slide.tagColor}, #A855F7)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.val}
              </div>
              <div className="text-gray-300 text-xs mt-1">{lang === "ar" ? s.ar : s.en}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── ARROWS ── */}
      <button
        onClick={prev}
        aria-label="prev"
        className="absolute start-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/65 transition-all"
      >
        {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      <button
        onClick={next}
        aria-label="next"
        className="absolute end-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/65 transition-all"
      >
        {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* ── DOTS ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            aria-label={`slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:   i === cur ? 28 : 8,
              height:  8,
              background: i === cur ? s.tagColor : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
        <motion.div
          key={cur}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full rounded-full"
          style={{ background: slide.tagColor }}
        />
      </div>

      {/* ── SLIDE COUNT ── */}
      <div className="absolute bottom-10 end-6 z-20 text-white/50 text-xs font-mono">
        {cur + 1} / {SLIDES.length}
      </div>

      {/* ── SCROLL HINT ── */}
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
