"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Play, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type Tab = "movies" | "series" | "sports";

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
      <div className="aspect-[2/3] flex flex-col justify-end p-4"
        style={{ background: `linear-gradient(160deg, ${color1} 0%, ${color2} 100%)` }}>
        <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
          <span className="text-white text-xs font-black">#{rank}</span>
        </div>
        {badge && (
          <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-[#BA0C2F] text-white text-[10px] font-bold">{badge}</div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-20 h-20 rounded-full border-4 border-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play size={22} fill="#0f172a" className="text-slate-900 ms-0.5" />
          </div>
        </div>
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
    { title: "Kon-Tiki", subtitle: "2012", genre: "Eventyr", rating: "7.3", color1: "#1e3a5f", color2: "#7c2d12", badge: "Norsk" },
    { title: "Dune: Part Two", subtitle: "2024", genre: "Sci-Fi", rating: "8.5", color1: "#4c1d95", color2: "#1e1a4e" },
    { title: "Oppenheimer", subtitle: "2023", genre: "Drama", rating: "8.9", color1: "#1c1917", color2: "#3b1a1a" },
    { title: "Inception", subtitle: "2010", genre: "Thriller", rating: "8.8", color1: "#0c1445", color2: "#2d1b69", badge: "Klassiker" },
    { title: "The Revenant", subtitle: "2015", genre: "Eventyr", rating: "8.0", color1: "#14532d", color2: "#1e3a5f" },
    { title: "Troll", subtitle: "2022", genre: "Action", rating: "6.0", color1: "#7c2d12", color2: "#431407", badge: "Norsk" },
  ],
  series: [
    { title: "Ragnarok", subtitle: "Sesong 3", genre: "Drama", rating: "7.5", color1: "#0c4a6e", color2: "#1e1040", badge: "🔥 Trending" },
    { title: "Succession", subtitle: "Sesong 4", genre: "Drama", rating: "9.3", color1: "#14532d", color2: "#052e16" },
    { title: "The Last of Us", subtitle: "Sesong 2", genre: "Drama", rating: "8.8", color1: "#854d0e", color2: "#422006", badge: "Eksklusiv" },
    { title: "House of the Dragon", subtitle: "Sesong 2", genre: "Fantasy", rating: "8.4", color1: "#1c1917", color2: "#292524" },
    { title: "Stranger Things", subtitle: "Sesong 5", genre: "Thriller", rating: "8.7", color1: "#4c1d95", color2: "#2e1065" },
    { title: "Norsemen", subtitle: "Sesong 3", genre: "Komedie", rating: "8.0", color1: "#7c2d12", color2: "#431407", badge: "Norsk" },
  ],
  sports: [
    { title: "Eliteserien", subtitle: "Sesong 2024/25", genre: "Fotball", rating: "9.2", color1: "#7f1d1d", color2: "#1e3a5f", badge: "🔴 Direkte" },
    { title: "Champions League", subtitle: "Gruppespill", genre: "Fotball", rating: "9.4", color1: "#7c2d12", color2: "#431407" },
    { title: "Ski-VM", subtitle: "Alpint", genre: "Vinter", rating: "9.0", color1: "#1e3a5f", color2: "#0c4a6e", badge: "🇳🇴 Norge" },
    { title: "Premier League", subtitle: "2024/25", genre: "Fotball", rating: "9.3", color1: "#4c1d95", color2: "#2e1065" },
    { title: "Formel 1", subtitle: "VM-sesong", genre: "Motorsport", rating: "8.8", color1: "#1c1917", color2: "#78350f", badge: "Eksklusiv" },
    { title: "NHL", subtitle: "Sluttspill", genre: "Ishockey", rating: "8.5", color1: "#0c4a6e", color2: "#0a2540" },
  ],
};

const tabs: { key: Tab; label: string }[] = [
  { key: "movies", label: "🎬 Filmer" },
  { key: "series", label: "📺 Serier" },
  { key: "sports", label: "⚽ Sport" },
];

const copy = { title: "Trender i Norge", sub: "Utvalgt innhold — filmer, serier og sport 24/7" };

export default function TopContent() {
  const [tab, setTab] = useState<Tab>("movies");

  return (
    <section id="content" className="py-24 px-4 section-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp size={20} className="text-[#00205B]" />
            <span className="text-[#00205B] text-sm font-bold uppercase tracking-widest">Trender</span>
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{copy.title}</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">{copy.sub}</p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content[tab].map((item, i) => <PosterCard key={i} {...item} rank={i + 1} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00205B] to-[#BA0C2F] text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg">
            <Play size={20} fill="white" />
            Se alt — Abonner nå
          </a>
        </motion.div>
      </div>
    </section>
  );
}
