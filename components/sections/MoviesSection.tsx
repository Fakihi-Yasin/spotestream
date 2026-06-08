"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, Plus, ChevronRight, Flame, Sparkles, Clock3 } from "lucide-react";
import { useLang } from "@/lib/lang-context";

/* ─── DATA ─────────────────────────────────────────────────── */
const MOVIES = [
  /* Trending */
  {
    id: 1, cat: "trending",
    title: "نورة", titleEn: "Norah",
    year: 2024, rating: 7.8, votes: "12K",
    genre: { ar: "دراما • تاريخي", en: "Drama • Historical" },
    desc: { ar: "قصة فتاة سعودية في السبعينيات تكتشف شغفها بالفن.", en: "A Saudi girl in the 70s discovers her passion for art." },
    colors: { from: "#92400e", via: "#b45309", to: "#78350f" },
    accent: "#f59e0b",
    tag: { ar: "🏆 جائزة أفضل فيلم", en: "🏆 Award Winner" },
    poster: "🏜️",
  },
  {
    id: 2, cat: "trending",
    title: "شباب البومب", titleEn: "Shabab Al Bomb",
    year: 2024, rating: 8.2, votes: "45K",
    genre: { ar: "كوميديا • اجتماعي", en: "Comedy • Social" },
    desc: { ar: "الجزء الجديد من المسلسل الكوميدي الأكثر مشاهدة في السعودية.", en: "The new season of Saudi Arabia's most watched comedy series." },
    colors: { from: "#7f1d1d", via: "#991b1b", to: "#450a0a" },
    accent: "#f43f5e",
    tag: { ar: "🔥 الأكثر مشاهدة", en: "🔥 Most Watched" },
    poster: "😂",
  },
  {
    id: 3, cat: "trending",
    title: "المداح", titleEn: "Al Maddah",
    year: 2024, rating: 8.6, votes: "38K",
    genre: { ar: "إثارة • غموض", en: "Thriller • Mystery" },
    desc: { ar: "عودة المداح في موسم جديد مليء بالإثارة والغموض.", en: "The return of Al Maddah in a new thrilling season." },
    colors: { from: "#0f172a", via: "#1e293b", to: "#0f172a" },
    accent: "#00FFFF",
    tag: { ar: "⭐ رمضان 2024", en: "⭐ Ramadan 2024" },
    poster: "🎭",
  },
  {
    id: 4, cat: "trending",
    title: "Deadpool & Wolverine", titleEn: "Deadpool & Wolverine",
    year: 2024, rating: 7.9, votes: "210K",
    genre: { ar: "أكشن • خيال علمي", en: "Action • Sci-Fi" },
    desc: { ar: "ديدبول وولفرين يتحدان في مغامرة لا تُنسى عبر الزمكان.", en: "Deadpool and Wolverine team up in an unforgettable multiverse adventure." },
    colors: { from: "#7f1d1d", via: "#1f2937", to: "#111827" },
    accent: "#ef4444",
    tag: { ar: "🎬 بلوكباستر", en: "🎬 Blockbuster" },
    poster: "⚡",
  },
  /* Popular */
  {
    id: 5, cat: "popular",
    title: "House of the Dragon", titleEn: "House of the Dragon",
    year: 2024, rating: 8.4, votes: "320K",
    genre: { ar: "فانتازيا • دراما", en: "Fantasy • Drama" },
    desc: { ar: "الصراع على عرش الحديد يشتعل في بيت التنين.", en: "The battle for the Iron Throne ignites in House of the Dragon." },
    colors: { from: "#7f1d1d", via: "#92400e", to: "#451a03" },
    accent: "#dc2626",
    tag: { ar: "🐉 الأعلى تقييماً", en: "🐉 Top Rated" },
    poster: "🐉",
  },
  {
    id: 6, cat: "popular",
    title: "The Rings of Power", titleEn: "The Rings of Power",
    year: 2024, rating: 7.1, votes: "180K",
    genre: { ar: "فانتازيا • مغامرة", en: "Fantasy • Adventure" },
    desc: { ar: "ملحمة خيالية تجري في عالم الأرض الوسطى قبل ألف سنة.", en: "An epic fantasy set in Middle-earth thousands of years ago." },
    colors: { from: "#1e3a5f", via: "#1e40af", to: "#1e3a5f" },
    accent: "#60a5fa",
    tag: { ar: "✨ ملحمي", en: "✨ Epic" },
    poster: "💍",
  },
  {
    id: 7, cat: "popular",
    title: "Oppenheimer", titleEn: "Oppenheimer",
    year: 2023, rating: 8.9, votes: "850K",
    genre: { ar: "تاريخي • دراما", en: "Historical • Drama" },
    desc: { ar: "قصة أب القنبلة الذرية وأثرها على العالم.", en: "The story of the father of the atomic bomb and its impact on the world." },
    colors: { from: "#451a03", via: "#78350f", to: "#1c1917" },
    accent: "#fb923c",
    tag: { ar: "🏆 أوسكار", en: "🏆 Oscar" },
    poster: "☢️",
  },
  {
    id: 8, cat: "popular",
    title: "دراما العاصوف", titleEn: "Al Asoof",
    year: 2024, rating: 8.1, votes: "22K",
    genre: { ar: "تاريخي • اجتماعي", en: "Historical • Social" },
    desc: { ar: "مسيرة عائلة سعودية عبر عقود من التحولات والتطورات.", en: "A Saudi family's journey through decades of transformation." },
    colors: { from: "#292524", via: "#44403c", to: "#1c1917" },
    accent: "#d97706",
    tag: { ar: "🇸🇦 سعودي", en: "🇸🇦 Saudi" },
    poster: "🕌",
  },
  /* New Releases */
  {
    id: 9, cat: "new",
    title: "Inside Out 2", titleEn: "Inside Out 2",
    year: 2024, rating: 7.8, votes: "95K",
    genre: { ar: "رسوم متحركة • عائلي", en: "Animation • Family" },
    desc: { ar: "المشاعر تعود في مغامرة جديدة مع نضج رايلي.", en: "The emotions return in a new adventure as Riley grows up." },
    colors: { from: "#312e81", via: "#4338ca", to: "#1e1b4b" },
    accent: "#818cf8",
    tag: { ar: "🆕 جديد", en: "🆕 New" },
    poster: "😊",
  },
  {
    id: 10, cat: "new",
    title: "Alien: Romulus", titleEn: "Alien: Romulus",
    year: 2024, rating: 7.3, votes: "58K",
    genre: { ar: "رعب • خيال علمي", en: "Horror • Sci-Fi" },
    desc: { ar: "فريق من الشباب يجد نفسه في مواجهة كائن مرعب في الفضاء.", en: "Young adults face a terrifying creature in deep space." },
    colors: { from: "#0f172a", via: "#1e293b", to: "#020617" },
    accent: "#4ade80",
    tag: { ar: "😱 مرعب", en: "😱 Horror" },
    poster: "👽",
  },
  {
    id: 11, cat: "new",
    title: "The Substance", titleEn: "The Substance",
    year: 2024, rating: 7.6, votes: "41K",
    genre: { ar: "إثارة • رعب", en: "Thriller • Horror" },
    desc: { ar: "دواء غامض يوعد بنسخة أفضل منك، لكن بثمن باهظ.", en: "A mysterious drug promises a better version of you — at a cost." },
    colors: { from: "#4a044e", via: "#701a75", to: "#2e1065" },
    accent: "#e879f9",
    tag: { ar: "🆕 جديد", en: "🆕 New" },
    poster: "💊",
  },
  {
    id: 12, cat: "new",
    title: "تقاطع طرق", titleEn: "Taqatu' Turuq",
    year: 2024, rating: 7.9, votes: "14K",
    genre: { ar: "إثارة • جريمة", en: "Thriller • Crime" },
    desc: { ar: "مسلسل سعودي يتتبع تشابك حياة أشخاص مختلفين في لحظة واحدة.", en: "Saudi series following the intertwined lives of different people." },
    colors: { from: "#1e3a5f", via: "#164e63", to: "#0f172a" },
    accent: "#22d3ee",
    tag: { ar: "🇸🇦 سعودي", en: "🇸🇦 Saudi" },
    poster: "🔍",
  },
];

const CATS = [
  { key: "trending", label: { ar: "الأكثر رواجاً",   en: "Trending"      }, icon: Flame      },
  { key: "popular",  label: { ar: "الأكثر شعبية",    en: "Popular"       }, icon: Sparkles   },
  { key: "new",      label: { ar: "إصدارات جديدة",   en: "New Releases"  }, icon: Clock3     },
];

const copy = {
  ar: { title: "أفلام ومسلسلات", sub: "آلاف الأفلام والمسلسلات بجودة 4K — كل شيء في مكان واحد", watch: "شاهد الآن", add: "أضف للقائمة" },
  en: { title: "Movies & Series", sub: "Thousands of movies and series in 4K — all in one place",  watch: "Watch Now",   add: "Add to List"    },
};

/* ─── POSTER CARD ───────────────────────────────────────────── */
function MovieCard({ movie, lang, dark }: { movie: typeof MOVIES[0]; lang: "ar"|"en"; dark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const title = lang === "ar" ? movie.title : movie.titleEn;
  const tx = copy[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster gradient bg */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ background: `linear-gradient(160deg, ${movie.colors.from}, ${movie.colors.via}, ${movie.colors.to})` }}
      />

      {/* Big emoji poster */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-8xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-60 opacity-40 select-none">
          {movie.poster}
        </span>
      </div>

      {/* Cinematic bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Top badge */}
      <div className="absolute top-2 start-2">
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white backdrop-blur-sm"
          style={{ background: `${movie.accent}bb` }}
        >
          {movie.tag[lang]}
        </span>
      </div>

      {/* Rating badge top-end */}
      <div className="absolute top-2 end-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
        <Star size={9} fill="#fbbf24" className="text-yellow-400" />
        <span className="text-yellow-400 text-[10px] font-bold">{movie.rating}</span>
      </div>

      {/* Hover overlay with play + buttons */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30"
          >
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold shadow-xl"
              style={{ background: `linear-gradient(135deg, ${movie.accent}, #A855F7)` }}
            >
              <Play size={24} fill="black" className="ms-0.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom info */}
      <div className="absolute bottom-0 start-0 end-0 p-3">
        <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-[10px]">{movie.year} • {movie.genre[lang]}</span>
          <span className="text-gray-400 text-[10px]">{movie.votes} {lang === "ar" ? "تقييم" : "ratings"}</span>
        </div>

        {/* Watch button */}
        <div className="flex gap-1.5">
          <button
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold text-black transition-all"
            style={{ background: movie.accent }}
          >
            <Play size={11} fill="black" />
            {tx.watch}
          </button>
          <button className="w-8 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
            <Plus size={13} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function MoviesSection() {
  const { lang, theme } = useLang();
  const dark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"trending"|"popular"|"new">("trending");
  const tx = copy[lang];
  const filtered = MOVIES.filter(m => m.cat === activeTab);

  return (
    <section id="movies" className={`py-24 px-4 ${dark ? "bg-[#0a0a0f]" : "bg-gray-950"}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white">{tx.title}</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-lg">{tx.sub}</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2">
            {CATS.map(cat => {
              const Icon = cat.icon;
              const active = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <Icon size={13} />
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {filtered.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                <MovieCard movie={movie} lang={lang} dark={dark} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all text-sm font-medium">
            {lang === "ar" ? "عرض الكل" : "View All"}
            <ChevronRight size={16} className={lang === "ar" ? "rotate-180" : ""} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
