"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Play, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type Tab = "movies" | "series" | "sports";

/* Poster card — gradient-based, no external images */
function PosterCard({ title, subtitle, genre, rating, rank, color1, color2, badge }: {
  title: string; subtitle?: string; genre: string; rating: string;
  rank: number; color1: string; color2: string; badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: rank * 0.07 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
    >
      {/* Poster gradient background */}
      <div
        className="aspect-[2/3] flex flex-col justify-end p-4"
        style={{ background: `linear-gradient(160deg, ${color1} 0%, ${color2} 100%)` }}
      >
        {/* Rank badge */}
        <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
          <span className="text-white text-xs font-black">#{rank}</span>
        </div>

        {/* Optional badge */}
        {badge && (
          <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-[#A855F7] text-white text-[10px] font-bold">
            {badge}
          </div>
        )}

        {/* Decorative elements inside poster */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-20 h-20 rounded-full border-4 border-white" />
        </div>
        <div className="absolute top-1/3 inset-x-0 flex justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-white blur-2xl" />
        </div>

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play size={22} fill="#0f172a" className="text-slate-900 ms-0.5" />
          </div>
        </div>

        {/* Info overlay */}
        <div className="relative z-10">
          <div className="flex items-center gap-1 mb-1">
            <Star size={11} fill="#fbbf24" className="text-yellow-400" />
            <span className="text-white text-xs font-semibold">{rating}</span>
            <span className="text-white/50 text-xs mx-1">•</span>
            <span className="text-white/70 text-xs">{genre}</span>
          </div>
          <h3 className="text-white font-bold text-sm leading-tight">{title}</h3>
          {subtitle && <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}

const content = {
  movies: [
    { title: "نورة", subtitle: "2024", genre: "دراما", rating: "7.8", color1: "#1e3a5f", color2: "#7c2d12", badge: "جديد" },
    { title: "القضية 23", subtitle: "2024", genre: "إثارة", rating: "8.1", color1: "#14532d", color2: "#1e3a5f" },
    { title: "الحارس", subtitle: "2024", genre: "أكشن", rating: "7.5", color1: "#4c1d95", color2: "#1e1a4e" },
    { title: "الغريب", subtitle: "2023", genre: "غموض", rating: "8.3", color1: "#1c1917", color2: "#3b1a1a" },
    { title: "ما وراء الغيب", subtitle: "2024", genre: "رعب", rating: "7.2", color1: "#0c1445", color2: "#2d1b69", badge: "رمضان" },
    { title: "العودة", subtitle: "2024", genre: "دراما", rating: "8.0", color1: "#7c2d12", color2: "#431407" },
  ],
  series: [
    { title: "النهاية", subtitle: "الموسم 2", genre: "خيال علمي", rating: "8.9", color1: "#0c4a6e", color2: "#1e1040", badge: "🔥 ترند" },
    { title: "جاسوس الرياض", subtitle: "الموسم 1", genre: "تشويق", rating: "8.4", color1: "#14532d", color2: "#052e16" },
    { title: "صراع العائلات", subtitle: "الموسم 3", genre: "دراما", rating: "8.6", color1: "#7c2d12", color2: "#431407" },
    { title: "في الظلام", subtitle: "الموسم 1", genre: "إثارة", rating: "7.9", color1: "#1c1917", color2: "#292524" },
    { title: "المدينة المنورة", subtitle: "وثائقي", genre: "تاريخي", rating: "9.1", color1: "#854d0e", color2: "#422006", badge: "مميز" },
    { title: "بنت الملك", subtitle: "الموسم 2", genre: "دراما رومانسية", rating: "8.2", color1: "#4c1d95", color2: "#2e1065" },
  ],
  sports: [
    { title: "الكلاسيكو السعودي", subtitle: "الهلال vs النصر", genre: "كرة قدم", rating: "9.5", color1: "#1d4ed8", color2: "#1e3a5f", badge: "🔴 مباشر" },
    { title: "دوري روشن", subtitle: "الموسم 2024", genre: "كرة قدم", rating: "9.2", color1: "#14532d", color2: "#052e16" },
    { title: "بطولة الملك", subtitle: "كأس السعودية", genre: "كرة قدم", rating: "9.0", color1: "#7c2d12", color2: "#431407" },
    { title: "أبطال آسيا", subtitle: "دور المجموعات", genre: "كرة قدم", rating: "8.8", color1: "#4c1d95", color2: "#2e1065" },
    { title: "نزال الملوك", subtitle: "ملاكمة", genre: "ملاكمة", rating: "8.5", color1: "#1c1917", color2: "#78350f", badge: "حصري" },
    { title: "Moto GP", subtitle: "جائزة السعودية", genre: "سباقات", rating: "8.3", color1: "#0c4a6e", color2: "#0a2540" },
  ],
};

const tabs = {
  ar: [
    { key: "movies" as Tab,  label: "🎬 أفلام" },
    { key: "series" as Tab,  label: "📺 مسلسلات" },
    { key: "sports" as Tab,  label: "⚽ رياضة" },
  ],
  en: [
    { key: "movies" as Tab,  label: "🎬 Movies" },
    { key: "series" as Tab,  label: "📺 Series" },
    { key: "sports" as Tab,  label: "⚽ Sports" },
  ],
};

const copy = {
  ar: { title: "الأكثر مشاهدةً في السعودية", sub: "محتوى مختار بعناية — أفلام ومسلسلات ورياضة على مدار الساعة" },
  en: { title: "Trending in Saudi Arabia", sub: "Handpicked content — movies, series & sports 24/7" },
};

export default function TopContent() {
  const { lang } = useLang();
  const [tab, setTab] = useState<Tab>("movies");
  const tx = copy[lang];
  const tabList = tabs[lang];

  return (
    <section id="content" className="py-24 px-4 section-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp size={20} className="text-[#0891b2]" />
            <span className="text-[#0891b2] text-sm font-bold uppercase tracking-widest">
              {lang === "ar" ? "ترند الآن" : "Trending Now"}
            </span>
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">{tx.sub}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {tabList.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Poster grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content[tab].map((item, i) => (
            <PosterCard key={i} {...item} rank={i + 1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0891b2] to-[#A855F7] text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg glow-cyan"
          >
            <Play size={20} fill="white" />
            {lang === "ar" ? "شاهد الكل — اشترك الآن" : "Watch All — Subscribe Now"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
