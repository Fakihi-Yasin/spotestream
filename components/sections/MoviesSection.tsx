"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, Plus, ChevronRight, Flame, Sparkles, Clock3 } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const MOVIES = [
  { id: 1, cat: "trending", title: "Dune: Part Two", year: 2024, rating: 8.5, votes: "310K", genre: "Sci-Fi • Episk", desc: "Paul Atreides leder Fremen i en hellig krig mot galaksens mektigste krefter.", colors: { from: "#0f172a", via: "#1e293b", to: "#0f172a" }, accent: "#00FFFF", tag: "⭐ Blockbuster", poster: "🏜️" },
  { id: 2, cat: "trending", title: "Oppenheimer", year: 2023, rating: 8.9, votes: "850K", genre: "Historisk • Drama", desc: "Historien om mannen bak atombomben og hans indre konflikt.", colors: { from: "#451a03", via: "#78350f", to: "#1c1917" }, accent: "#fb923c", tag: "🏆 Oscar", poster: "☢️" },
  { id: 3, cat: "trending", title: "Deadpool & Wolverine", year: 2024, rating: 7.9, votes: "210K", genre: "Action • Sci-Fi", desc: "Deadpool og Wolverine slår seg sammen i et multiverset-eventyr.", colors: { from: "#7f1d1d", via: "#1f2937", to: "#111827" }, accent: "#ef4444", tag: "🎬 Marvel", poster: "⚡" },
  { id: 4, cat: "trending", title: "Troll", year: 2022, rating: 6.0, votes: "95K", genre: "Action • Eventyr", desc: "Et gammelt vesen fra norsk folklore vekkes til live i fjellene.", colors: { from: "#14532d", via: "#166534", to: "#052e16" }, accent: "#4ade80", tag: "🇳🇴 Norsk", poster: "🏔️" },
  { id: 5, cat: "popular", title: "Kon-Tiki", year: 2012, rating: 7.3, votes: "120K", genre: "Eventyr • Drama", desc: "Thor Heyerdahls legendariske ferd over Stillehavet på en balsaflåte.", colors: { from: "#1e3a5f", via: "#7c2d12", to: "#1e3a5f" }, accent: "#60a5fa", tag: "🇳🇴 Norsk klassiker", poster: "⛵" },
  { id: 6, cat: "popular", title: "The Revenant", year: 2015, rating: 8.0, votes: "780K", genre: "Eventyr • Thriller", desc: "En pelsjeger kjemper for overlevelse etter å ha blitt angrepet av en bjørn.", colors: { from: "#14532d", via: "#1e3a5f", to: "#0f172a" }, accent: "#86efac", tag: "🏆 Oscar", poster: "🐻" },
  { id: 7, cat: "popular", title: "Inception", year: 2010, rating: 8.8, votes: "2.4M", genre: "Sci-Fi • Thriller", desc: "En tyv som stjeler hemmeligheter fra drømmenes verden får et siste oppdrag.", colors: { from: "#0c1445", via: "#2d1b69", to: "#0f172a" }, accent: "#818cf8", tag: "⭐ Klassiker", poster: "🌀" },
  { id: 8, cat: "popular", title: "Inside Out 2", year: 2024, rating: 7.8, votes: "95K", genre: "Animasjon • Familie", desc: "Følelsene er tilbake med nye utfordringer i tenårene.", colors: { from: "#312e81", via: "#4338ca", to: "#1e1b4b" }, accent: "#818cf8", tag: "🆕 Ny", poster: "😊" },
  { id: 9, cat: "new", title: "Alien: Romulus", year: 2024, rating: 7.3, votes: "58K", genre: "Skrekk • Sci-Fi", desc: "Unge voksne møter en skremmende skapning i verdensrommet.", colors: { from: "#0f172a", via: "#1e293b", to: "#020617" }, accent: "#4ade80", tag: "😱 Skrekk", poster: "👽" },
  { id: 10, cat: "new", title: "The Substance", year: 2024, rating: 7.6, votes: "41K", genre: "Thriller • Skrekk", desc: "Et mystisk legemiddel lover en bedre versjon av deg selv.", colors: { from: "#4a044e", via: "#701a75", to: "#2e1065" }, accent: "#e879f9", tag: "🆕 Ny", poster: "💊" },
  { id: 11, cat: "new", title: "Ragnarok S3", year: 2023, rating: 7.5, votes: "88K", genre: "Drama • Fantasy", desc: "Magne fortsetter kampen mot jotunene i en moderne norsk by.", colors: { from: "#0c4a6e", via: "#1e1040", to: "#0f172a" }, accent: "#38bdf8", tag: "🇳🇴 Norsk", poster: "⚡" },
  { id: 12, cat: "new", title: "Norsemen S3", year: 2023, rating: 8.0, votes: "62K", genre: "Komedie • Historisk", desc: "Vikingene fra Norheim er tilbake med ny galskap og absurd humor.", colors: { from: "#7c2d12", via: "#431407", to: "#1c1917" }, accent: "#fb923c", tag: "🇳🇴 Norsk", poster: "🛡️" },
];

const CATS = [
  { key: "trending", label: "Trender", icon: Flame },
  { key: "popular",  label: "Populære", icon: Sparkles },
  { key: "new",      label: "Nyheter", icon: Clock3 },
];

const copy = { title: "Filmer & Serier", sub: "Tusenvis av filmer og serier i 4K — alt på ett sted", watch: "Se nå", add: "Min liste" };

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
              style={{ background: `linear-gradient(135deg, ${movie.accent}, #00205B)` }}>
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
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold text-white transition-all" style={{ background: "linear-gradient(90deg,#00205B,#BA0C2F)" }}>
            <Play size={11} fill="white" />{copy.watch}
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
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#00205B] to-[#BA0C2F]" />
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${active ? "bg-gradient-to-r from-[#00205B] to-[#BA0C2F] text-white shadow-lg" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"}`}>
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
            Se alt <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
