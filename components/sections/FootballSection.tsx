"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, ChevronRight, Trophy, Calendar, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type Status = "live" | "upcoming" | "result";

function TeamBadge({ abbr, color, bg }: { abbr: string; color: string; bg: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black border-2 shrink-0"
      style={{ background: bg, color, borderColor: `${color}50` }}
    >
      {abbr}
    </div>
  );
}

const MATCHES = [
  /* LIVE */
  {
    id: 1, status: "live" as Status,
    league: "Eliteserien", flag: "🇳🇴",
    home: { name: "Rosenborg",    abbr: "RBK", color: "#f1f5f9", bg: "#1e293b" },
    away: { name: "Molde",        abbr: "MFK", color: "#93c5fd", bg: "#1e3a5f" },
    score: "1 - 0", minute: "58'", channel: "TV 2 Sport",
    time: "Direkte",
  },
  {
    id: 2, status: "live" as Status,
    league: "Champions League", flag: "⭐",
    home: { name: "Real Madrid",  abbr: "RMA", color: "#f1f5f9", bg: "#1e293b" },
    away: { name: "Bayern",       abbr: "BAY", color: "#fca5a5", bg: "#7f1d1d" },
    score: "2 - 1", minute: "71'", channel: "Viaplay",
    time: "Direkte",
  },
  {
    id: 3, status: "live" as Status,
    league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    home: { name: "Arsenal",      abbr: "ARS", color: "#fca5a5", bg: "#7f1d1d" },
    away: { name: "Liverpool",    abbr: "LIV", color: "#fca5a5", bg: "#450a0a" },
    score: "0 - 1", minute: "34'", channel: "V Sport",
    time: "Direkte",
  },
  /* UPCOMING */
  {
    id: 4, status: "upcoming" as Status,
    league: "Eliteserien", flag: "🇳🇴",
    home: { name: "Brann",        abbr: "BRN", color: "#fca5a5", bg: "#7f1d1d" },
    away: { name: "Vålerenga",    abbr: "VIF", color: "#93c5fd", bg: "#1e3a5f" },
    channel: "TV 2 Sport", time: "I dag 19:00",
  },
  {
    id: 5, status: "upcoming" as Status,
    league: "Nations League", flag: "🇳🇴",
    home: { name: "Norge",        abbr: "NOR", color: "#fca5a5", bg: "#7f1d1d" },
    away: { name: "Sverige",      abbr: "SWE", color: "#fbbf24", bg: "#78350f" },
    channel: "NRK 1", time: "I morgen 20:45",
  },
  {
    id: 6, status: "upcoming" as Status,
    league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    home: { name: "Man City",     abbr: "MCI", color: "#93c5fd", bg: "#1e3a5f" },
    away: { name: "Chelsea",      abbr: "CHE", color: "#93c5fd", bg: "#1e3a5f" },
    channel: "V Sport", time: "Lør 16:00",
  },
  {
    id: 7, status: "upcoming" as Status,
    league: "Ski VM", flag: "🎿",
    home: { name: "Norge",        abbr: "NOR", color: "#fca5a5", bg: "#7f1d1d" },
    away: { name: "Østerrike",    abbr: "AUT", color: "#fbbf24", bg: "#78350f" },
    channel: "NRK 1", time: "Søn 11:30",
  },
  /* RESULTS */
  {
    id: 8, status: "result" as Status,
    league: "Eliteserien", flag: "🇳🇴",
    home: { name: "Rosenborg",    abbr: "RBK", color: "#f1f5f9", bg: "#1e293b" },
    away: { name: "Lillestrøm",   abbr: "LSK", color: "#fbbf24", bg: "#78350f" },
    score: "2 - 1", channel: "TV 2 Sport", time: "I går",
  },
  {
    id: 9, status: "result" as Status,
    league: "Champions League", flag: "⭐",
    home: { name: "Man City",     abbr: "MCI", color: "#93c5fd", bg: "#1e3a5f" },
    away: { name: "Inter",        abbr: "INT", color: "#60a5fa", bg: "#1e1b4b" },
    score: "1 - 1", channel: "Viaplay", time: "I går",
  },
  {
    id: 10, status: "result" as Status,
    league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    home: { name: "Tottenham",    abbr: "TOT", color: "#e2e8f0", bg: "#334155" },
    away: { name: "Newcastle",    abbr: "NEW", color: "#e2e8f0", bg: "#1e293b" },
    score: "2 - 0", channel: "V Sport", time: "For 2 dager siden",
  },
];

const TABS = [
  { key: "live",     label: "Direkte",    icon: Wifi,      grad: "from-red-500 to-rose-600"    },
  { key: "upcoming", label: "Kommende",   icon: Calendar,  grad: "from-cyan-500 to-blue-600"   },
  { key: "result",   label: "Resultater", icon: RotateCcw, grad: "from-slate-500 to-slate-700" },
];

const copy = {
  title: "Sport Direkte",
  sub: "Direkteresultater og sendinger for de største konkurransene i Norge og verden",
  now: "Pågående kamper",
  upcoming: "Kommende kamper",
  results: "Siste resultater",
};

function MatchRow({ m }: { m: typeof MATCHES[0] }) {
  const live = m.status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/[0.06] hover:border-cyan-500/30 transition-all cursor-pointer group"
    >
      <span className="text-xl w-7 text-center shrink-0">{m.flag}</span>

      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-[10px] font-medium mb-2 truncate">{m.league}</p>
        <div className="flex items-center gap-2">
          <TeamBadge abbr={m.home.abbr} color={m.home.color} bg={m.home.bg} />
          <span className="text-white text-sm font-semibold truncate flex-1">{m.home.name}</span>

          <div className="shrink-0 min-w-[64px] text-center">
            {m.score ? (
              <>
                <div className={`font-orbitron font-black text-lg leading-none ${live ? "text-white" : "text-gray-400"}`}>{m.score}</div>
                {live && <div className="text-red-400 text-[9px] font-bold animate-pulse mt-0.5">{m.minute}</div>}
              </>
            ) : (
              <div className="font-mono text-xs font-bold text-cyan-400 leading-snug">{m.time}</div>
            )}
          </div>

          <span className="text-white text-sm font-semibold truncate flex-1 text-end">{m.away.name}</span>
          <TeamBadge abbr={m.away.abbr} color={m.away.color} bg={m.away.bg} />
        </div>
      </div>

      <div className="shrink-0 hidden sm:flex flex-col items-end gap-1">
        {live && (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 text-[9px] font-bold">LIVE</span>
          </div>
        )}
        <span className="text-gray-500 text-[10px]">{m.channel}</span>
        <ChevronRight size={13} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
      </div>
    </motion.div>
  );
}

export default function FootballSection() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const [tab, setTab] = useState<Status>("live");
  const filtered = MATCHES.filter(m => m.status === tab);
  const liveCount = MATCHES.filter(m => m.status === "live").length;
  const tabLabel = tab === "live" ? copy.now : tab === "upcoming" ? copy.upcoming : copy.results;

  return (
    <section id="football" className={`py-24 px-4 ${dark ? "bg-[#06060f]" : "bg-slate-900"}`}>
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-green-400 to-cyan-500" />
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white">{copy.title}</h2>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 text-[10px] font-bold">{liveCount} LIVE</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{copy.sub}</p>
          </div>

          <div className="flex gap-2 shrink-0">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key as Status)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? `bg-gradient-to-r ${t.grad} text-white shadow-lg`
                      : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Icon size={12} />
                  {t.label}
                  {t.key === "live" && (
                    <span className={`text-[9px] px-1 rounded-full font-black ${active ? "bg-white/20" : "bg-red-500/20 text-red-400"}`}>
                      {liveCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="flex items-center gap-3 mb-4">
          <Trophy size={13} className="text-yellow-400 shrink-0" />
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">{tabLabel}</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {filtered.map(m => <MatchRow key={m.id} m={m} />)}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-gray-600 text-xs me-1">Tilgjengelig på:</span>
          {["TV 2 Sport", "NRK 1", "Viaplay", "V Sport", "Eurosport", "Discovery", "TV3 Norge"].map(ch => (
            <span key={ch} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px] font-semibold">
              {ch}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
