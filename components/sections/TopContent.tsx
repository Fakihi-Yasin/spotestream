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
          <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-[#EF4135] text-white text-[10px] font-bold">{badge}</div>
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
    { title: "Astérix & Obélix", subtitle: "2023", genre: "Comédie", rating: "6.8", color1: "#1e3a5f", color2: "#7c2d12", badge: "Nouveau" },
    { title: "Le Comte de Monte-Cristo", subtitle: "2024", genre: "Aventure", rating: "8.1", color1: "#14532d", color2: "#1e3a5f" },
    { title: "Dune: Part Two", subtitle: "2024", genre: "Sci-Fi", rating: "8.5", color1: "#4c1d95", color2: "#1e1a4e" },
    { title: "Oppenheimer", subtitle: "2023", genre: "Drame", rating: "8.9", color1: "#1c1917", color2: "#3b1a1a" },
    { title: "Inception", subtitle: "2010", genre: "Thriller", rating: "8.8", color1: "#0c1445", color2: "#2d1b69", badge: "Classique" },
    { title: "Intouchables", subtitle: "2011", genre: "Comédie dramatique", rating: "8.5", color1: "#7c2d12", color2: "#431407" },
  ],
  series: [
    { title: "Lupin", subtitle: "Saison 3", genre: "Thriller", rating: "7.5", color1: "#0c4a6e", color2: "#1e1040", badge: "🔥 Tendance" },
    { title: "Le Bureau des Légendes", subtitle: "Saison 5", genre: "Espionnage", rating: "8.7", color1: "#14532d", color2: "#052e16" },
    { title: "Engrenages", subtitle: "Saison 8", genre: "Policier", rating: "8.4", color1: "#7c2d12", color2: "#431407" },
    { title: "House of the Dragon", subtitle: "Saison 2", genre: "Fantaisie", rating: "8.4", color1: "#1c1917", color2: "#292524" },
    { title: "The Last of Us", subtitle: "Saison 2", genre: "Drame", rating: "8.8", color1: "#854d0e", color2: "#422006", badge: "Exclusif" },
    { title: "Stranger Things", subtitle: "Saison 5", genre: "Horreur", rating: "8.7", color1: "#4c1d95", color2: "#2e1065" },
  ],
  sports: [
    { title: "PSG vs Marseille", subtitle: "Le Classique", genre: "Football", rating: "9.5", color1: "#1d4ed8", color2: "#1e3a5f", badge: "🔴 En direct" },
    { title: "Ligue 1", subtitle: "Saison 2024/25", genre: "Football", rating: "9.2", color1: "#14532d", color2: "#052e16" },
    { title: "Champions League", subtitle: "Phase de groupes", genre: "Football", rating: "9.4", color1: "#7c2d12", color2: "#431407" },
    { title: "Roland-Garros", subtitle: "Grand Chelem", genre: "Tennis", rating: "8.8", color1: "#4c1d95", color2: "#2e1065" },
    { title: "Tour de France", subtitle: "Cyclisme", genre: "Cyclisme", rating: "8.5", color1: "#1c1917", color2: "#78350f", badge: "Exclusif" },
    { title: "Rugby Top 14", subtitle: "Finale", genre: "Rugby", rating: "8.3", color1: "#0c4a6e", color2: "#0a2540" },
  ],
};

const tabs: { key: Tab; label: string }[] = [
  { key: "movies", label: "🎬 Films" },
  { key: "series", label: "📺 Séries" },
  { key: "sports", label: "⚽ Sport" },
];

const copy = { title: "Tendances en France", sub: "Contenu sélectionné — films, séries et sport 24h/24" };

export default function TopContent() {
  const [tab, setTab] = useState<Tab>("movies");

  return (
    <section id="content" className="py-24 px-4 section-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp size={20} className="text-[#0055A4]" />
            <span className="text-[#0055A4] text-sm font-bold uppercase tracking-widest">Tendances</span>
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
          <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg">
            <Play size={20} fill="white" />
            Tout regarder — S'abonner maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
