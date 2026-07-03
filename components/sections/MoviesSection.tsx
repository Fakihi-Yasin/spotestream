"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, Plus, ChevronRight, Flame, Sparkles, Clock3 } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const MOVIES = [
  { id: 1, cat: "trending", title: "Le Comte de Monte-Cristo", year: 2024, rating: 8.1, votes: "42K", genre: "Aventure • Drame", desc: "L'adaptation épique du chef-d'œuvre d'Alexandre Dumas.", colors: { from: "#92400e", via: "#b45309", to: "#78350f" }, accent: "#f59e0b", tag: "🏆 Succès", poster: "⚔️" },
  { id: 2, cat: "trending", title: "Lupin — Saison 3", year: 2024, rating: 7.5, votes: "85K", genre: "Thriller • Policier", desc: "Assane Diop revient pour une nouvelle aventure palpitante.", colors: { from: "#7f1d1d", via: "#991b1b", to: "#450a0a" }, accent: "#f43f5e", tag: "🔥 Tendance", poster: "🎩" },
  { id: 3, cat: "trending", title: "Dune: Part Two", year: 2024, rating: 8.5, votes: "310K", genre: "Sci-Fi • Épique", desc: "Paul Atréides mène les Fremen dans une guerre sainte.", colors: { from: "#0f172a", via: "#1e293b", to: "#0f172a" }, accent: "#00FFFF", tag: "⭐ Blockbuster", poster: "🏜️" },
  { id: 4, cat: "trending", title: "Deadpool & Wolverine", year: 2024, rating: 7.9, votes: "210K", genre: "Action • Sci-Fi", desc: "Deadpool et Wolverine s'associent dans une aventure multivers.", colors: { from: "#7f1d1d", via: "#1f2937", to: "#111827" }, accent: "#ef4444", tag: "🎬 Marvel", poster: "⚡" },
  { id: 5, cat: "popular", title: "Intouchables", year: 2011, rating: 8.5, votes: "950K", genre: "Comédie dramatique", desc: "L'amitié improbable entre un aristocrate et son aide-soignant.", colors: { from: "#7f1d1d", via: "#92400e", to: "#451a03" }, accent: "#dc2626", tag: "🇫🇷 Classique", poster: "🤝" },
  { id: 6, cat: "popular", title: "Le Bureau des Légendes", year: 2024, rating: 8.7, votes: "120K", genre: "Espionnage • Drame", desc: "Les agents de la DGSE dans les missions les plus secrètes.", colors: { from: "#1e3a5f", via: "#1e40af", to: "#1e3a5f" }, accent: "#60a5fa", tag: "✨ Série culte", poster: "🕵️" },
  { id: 7, cat: "popular", title: "Oppenheimer", year: 2023, rating: 8.9, votes: "850K", genre: "Historique • Drame", desc: "L'histoire du père de la bombe atomique.", colors: { from: "#451a03", via: "#78350f", to: "#1c1917" }, accent: "#fb923c", tag: "🏆 Oscar", poster: "☢️" },
  { id: 8, cat: "popular", title: "Astérix & Obélix", year: 2023, rating: 6.8, votes: "55K", genre: "Comédie • Aventure", desc: "Les irréductibles Gaulois dans une nouvelle aventure.", colors: { from: "#292524", via: "#44403c", to: "#1c1917" }, accent: "#d97706", tag: "🇫🇷 Français", poster: "🛡️" },
  { id: 9, cat: "new", title: "Inside Out 2", year: 2024, rating: 7.8, votes: "95K", genre: "Animation • Famille", desc: "Les émotions reviennent dans une nouvelle aventure.", colors: { from: "#312e81", via: "#4338ca", to: "#1e1b4b" }, accent: "#818cf8", tag: "🆕 Nouveau", poster: "😊" },
  { id: 10, cat: "new", title: "Alien: Romulus", year: 2024, rating: 7.3, votes: "58K", genre: "Horreur • Sci-Fi", desc: "De jeunes adultes face à une créature terrifiante dans l'espace.", colors: { from: "#0f172a", via: "#1e293b", to: "#020617" }, accent: "#4ade80", tag: "😱 Horreur", poster: "👽" },
  { id: 11, cat: "new", title: "The Substance", year: 2024, rating: 7.6, votes: "41K", genre: "Thriller • Horreur", desc: "Un médicament mystérieux promet une meilleure version de vous.", colors: { from: "#4a044e", via: "#701a75", to: "#2e1065" }, accent: "#e879f9", tag: "🆕 Nouveau", poster: "💊" },
  { id: 12, cat: "new", title: "Engrenages S8", year: 2024, rating: 8.4, votes: "34K", genre: "Policier • Drame", desc: "La brigade criminelle parisienne face à ses affaires les plus sombres.", colors: { from: "#1e3a5f", via: "#164e63", to: "#0f172a" }, accent: "#22d3ee", tag: "🇫🇷 Série", poster: "🔍" },
];

const CATS = [
  { key: "trending", label: "Tendances", icon: Flame },
  { key: "popular",  label: "Populaires", icon: Sparkles },
  { key: "new",      label: "Nouveautés", icon: Clock3 },
];

const copy = { title: "Films & Séries", sub: "Des milliers de films et séries en 4K — tout en un seul endroit", watch: "Regarder", add: "Ma liste" };

function MovieCard({ movie, dark }: { movie: typeof MOVIES[0]; dark: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "2/3" }}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ background: `linear-gradient(160deg, ${movie.colors.from}, ${movie.colors.via}, ${movie.colors.to})` }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-8xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-60 opacity-40 select-none">{movie.poster}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute top-2 start-2">
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white backdrop-blur-sm" style={{ background: `${movie.accent}bb` }}>{movie.tag}</span>
      </div>
      <div className="absolute top-2 end-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
        <Star size={9} fill="#fbbf24" className="text-yellow-400" />
        <span className="text-yellow-400 text-[10px] font-bold">{movie.rating}</span>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
            <motion.button initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold shadow-xl"
              style={{ background: `linear-gradient(135deg, ${movie.accent}, #A855F7)` }}>
              <Play size={24} fill="black" className="ms-0.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 start-0 end-0 p-3">
        <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-[10px]">{movie.year} • {movie.genre}</span>
          <span className="text-gray-400 text-[10px]">{movie.votes}</span>
        </div>
        <div className="flex gap-1.5">
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold text-black transition-all" style={{ background: movie.accent }}>
            <Play size={11} fill="black" />{copy.watch}
          </button>
          <button className="w-8 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
            <Plus size={13} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MoviesSection() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"trending"|"popular"|"new">("trending");
  const filtered = MOVIES.filter(m => m.cat === activeTab);

  return (
    <section id="movies" className={`py-24 px-4 ${dark ? "bg-[#0a0a0f]" : "bg-gray-950"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#0055A4] to-[#EF4135]" />
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white">{copy.title}</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-lg">{copy.sub}</p>
          </div>
          <div className="flex gap-2">
            {CATS.map(cat => {
              const Icon = cat.icon;
              const active = activeTab === cat.key;
              return (
                <button key={cat.key} onClick={() => setActiveTab(cat.key as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${active ? "bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white shadow-lg" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"}`}>
                  <Icon size={13} />{cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((movie, i) => (
              <motion.div key={movie.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                <MovieCard movie={movie} dark={dark} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-10">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all text-sm font-medium">
            Voir tout <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
