"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Clock, ChevronRight, Trophy, Calendar, RotateCcw } from "lucide-react";
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
    league: { ar: "دوري أبطال أوروبا", en: "Champions League" }, flag: "⭐",
    home: { ar: "ريال مدريد", en: "Real Madrid", abbr: "RMA", color: "#f1f5f9", bg: "#1e293b" },
    away: { ar: "برشلونة",   en: "Barcelona",   abbr: "BAR", color: "#93c5fd", bg: "#1e1b4b" },
    score: "2 - 1", minute: "67'", channel: "beIN Sports HD",
    time: { ar: "مباشر", en: "Live" },
  },
  {
    id: 2, status: "live" as Status,
    league: { ar: "دوري روشن السعودي", en: "Saudi Pro League" }, flag: "🇸🇦",
    home: { ar: "الهلال",  en: "Al Hilal",  abbr: "HLL", color: "#60a5fa", bg: "#1e3a5f" },
    away: { ar: "الشباب",  en: "Al Shabab", abbr: "SHB", color: "#fca5a5", bg: "#7f1d1d" },
    score: "1 - 0", minute: "34'", channel: "SSC 1 HD",
    time: { ar: "مباشر", en: "Live" },
  },
  {
    id: 3, status: "live" as Status,
    league: { ar: "الدوري الإنجليزي", en: "Premier League" }, flag: "🏴",
    home: { ar: "أرسنال",          en: "Arsenal",    abbr: "ARS", color: "#fca5a5", bg: "#7f1d1d" },
    away: { ar: "مانشستر يونايتد", en: "Man United", abbr: "MNU", color: "#f87171", bg: "#450a0a" },
    score: "0 - 0", minute: "12'", channel: "beIN Sports 2",
    time: { ar: "مباشر", en: "Live" },
  },
  /* UPCOMING */
  {
    id: 4, status: "upcoming" as Status,
    league: { ar: "دوري روشن السعودي", en: "Saudi Pro League" }, flag: "🇸🇦",
    home: { ar: "النصر",   en: "Al Nassr",   abbr: "NSR", color: "#fbbf24", bg: "#78350f" },
    away: { ar: "الاتحاد", en: "Al Ittihad", abbr: "ITH", color: "#fcd34d", bg: "#451a03" },
    channel: "SSC Sport", time: { ar: "اليوم 21:00", en: "Today 21:00" },
  },
  {
    id: 5, status: "upcoming" as Status,
    league: { ar: "الدوري الإسباني", en: "La Liga" }, flag: "🇪🇸",
    home: { ar: "أتلتيكو مدريد", en: "Atletico",      abbr: "ATM", color: "#fca5a5", bg: "#7f1d1d" },
    away: { ar: "ريال سوسيداد",  en: "Real Sociedad", abbr: "RSO", color: "#93c5fd", bg: "#1e3a5f" },
    channel: "beIN Sports 3", time: { ar: "غداً 22:00", en: "Tomorrow 22:00" },
  },
  {
    id: 6, status: "upcoming" as Status,
    league: { ar: "الدوري الألماني", en: "Bundesliga" }, flag: "🇩🇪",
    home: { ar: "بايرن ميونخ", en: "Bayern",   abbr: "BAY", color: "#fca5a5", bg: "#7f1d1d" },
    away: { ar: "دورتموند",    en: "Dortmund", abbr: "BVB", color: "#fbbf24", bg: "#78350f" },
    channel: "beIN Sports 4", time: { ar: "السبت 21:30", en: "Sat 21:30" },
  },
  {
    id: 7, status: "upcoming" as Status,
    league: { ar: "دوري روشن السعودي", en: "Saudi Pro League" }, flag: "🇸🇦",
    home: { ar: "الأهلي",  en: "Al Ahli",  abbr: "AHL", color: "#86efac", bg: "#14532d" },
    away: { ar: "الفيحاء", en: "Al Fayha", abbr: "FYH", color: "#a3e635", bg: "#365314" },
    channel: "SSC Extra", time: { ar: "الجمعة 20:00", en: "Fri 20:00" },
  },
  /* RESULTS */
  {
    id: 8, status: "result" as Status,
    league: { ar: "دوري روشن السعودي", en: "Saudi Pro League" }, flag: "🇸🇦",
    home: { ar: "الهلال", en: "Al Hilal", abbr: "HLL", color: "#60a5fa", bg: "#1e3a5f" },
    away: { ar: "النصر",  en: "Al Nassr", abbr: "NSR", color: "#fbbf24", bg: "#78350f" },
    score: "3 - 1", channel: "SSC 1 HD", time: { ar: "أمس", en: "Yesterday" },
  },
  {
    id: 9, status: "result" as Status,
    league: { ar: "دوري أبطال أوروبا", en: "Champions League" }, flag: "⭐",
    home: { ar: "مانشستر سيتي", en: "Man City", abbr: "MCI", color: "#93c5fd", bg: "#1e3a5f" },
    away: { ar: "إنتر ميلان",   en: "Inter",    abbr: "INT", color: "#60a5fa", bg: "#1e1b4b" },
    score: "2 - 2", channel: "beIN Sports HD", time: { ar: "أمس", en: "Yesterday" },
  },
  {
    id: 10, status: "result" as Status,
    league: { ar: "الدوري الإنجليزي", en: "Premier League" }, flag: "🏴",
    home: { ar: "ليفربول",  en: "Liverpool", abbr: "LIV", color: "#fca5a5", bg: "#7f1d1d" },
    away: { ar: "توتنهام",  en: "Tottenham", abbr: "TOT", color: "#e2e8f0", bg: "#334155" },
    score: "4 - 0", channel: "beIN Sports 2", time: { ar: "أول أمس", en: "2 days ago" },
  },
];

const TABS = [
  { key: "live",     label: { ar: "مباشر",   en: "Live"     }, icon: Wifi,      grad: "from-red-500 to-rose-600"    },
  { key: "upcoming", label: { ar: "القادمة", en: "Upcoming" }, icon: Calendar,  grad: "from-cyan-500 to-blue-600"   },
  { key: "result",   label: { ar: "النتائج", en: "Results"  }, icon: RotateCcw, grad: "from-slate-500 to-slate-700" },
];

const copy = {
  ar: { title: "الكورة مباشر", sub: "نتائج وبث مباشر لأقوى الدوريات العالمية والسعودية", now: "المباريات الجارية الآن", upcoming: "المباريات القادمة", results: "آخر النتائج" },
  en: { title: "Live Football",  sub: "Live scores and streams for the biggest leagues and Saudi Pro League", now: "Matches in progress", upcoming: "Upcoming fixtures", results: "Recent results" },
};

function MatchRow({ m, lang }: { m: typeof MATCHES[0]; lang: "ar" | "en" }) {
  const live = m.status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, x: lang === "ar" ? 10 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/[0.06] hover:border-cyan-500/30 transition-all cursor-pointer group"
    >
      {/* Flag */}
      <span className="text-xl w-7 text-center shrink-0">{m.flag}</span>

      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-[10px] font-medium mb-2 truncate">{m.league[lang]}</p>
        <div className="flex items-center gap-2">
          {/* Home */}
          <TeamBadge abbr={m.home.abbr} color={m.home.color} bg={m.home.bg} />
          <span className="text-white text-sm font-semibold truncate flex-1">{m.home[lang]}</span>

          {/* Center: score or time */}
          <div className="shrink-0 min-w-[64px] text-center">
            {m.score ? (
              <>
                <div className={`font-orbitron font-black text-lg leading-none ${live ? "text-white" : "text-gray-400"}`}>{m.score}</div>
                {live && <div className="text-red-400 text-[9px] font-bold animate-pulse mt-0.5">{m.minute}</div>}
              </>
            ) : (
              <div className="font-mono text-xs font-bold text-cyan-400 leading-snug">{m.time[lang]}</div>
            )}
          </div>

          {/* Away */}
          <span className="text-white text-sm font-semibold truncate flex-1 text-end">{m.away[lang]}</span>
          <TeamBadge abbr={m.away.abbr} color={m.away.color} bg={m.away.bg} />
        </div>
      </div>

      {/* Right meta */}
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
  const { lang, theme } = useLang();
  const dark = theme === "dark";
  const [tab, setTab] = useState<Status>("live");
  const tx = copy[lang];
  const filtered = MATCHES.filter(m => m.status === tab);
  const liveCount = MATCHES.filter(m => m.status === "live").length;
  const tabLabel = tab === "live" ? tx.now : tab === "upcoming" ? tx.upcoming : tx.results;

  return (
    <section id="football" className={`py-24 px-4 ${dark ? "bg-[#06060f]" : "bg-slate-900"}`}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-green-400 to-cyan-500" />
              <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white">{tx.title}</h2>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 text-[10px] font-bold">{liveCount} LIVE</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{tx.sub}</p>
          </div>

          {/* Tabs */}
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
                  {t.label[lang]}
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

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={13} className="text-yellow-400 shrink-0" />
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">{tabLabel}</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Matches */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {filtered.map(m => <MatchRow key={m.id} m={m} lang={lang} />)}
          </motion.div>
        </AnimatePresence>

        {/* Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-gray-600 text-xs me-1">{lang === "ar" ? "البث عبر:" : "Watch on:"}</span>
          {["SSC 1 HD", "SSC Sport", "SSC Extra", "beIN Sports HD", "beIN Sports 2", "beIN Sports 3", "beIN Sports 4"].map(ch => (
            <span key={ch} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px] font-semibold">
              {ch}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
