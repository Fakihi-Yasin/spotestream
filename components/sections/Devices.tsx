"use client";
import { motion } from "framer-motion";
import { Tv2, Smartphone, Tablet, Monitor, Box, Flame } from "lucide-react";
import { useLang } from "@/lib/lang-context";

/* ── Channel Logo Components ── */
function MBCLogo() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect width="80" height="40" rx="6" fill="#1a1a2e" />
      <text x="40" y="27" textAnchor="middle" fill="#00d4d4" fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">MBC</text>
    </svg>
  );
}
function MBC2Logo() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect width="80" height="40" rx="6" fill="#1a1a2e" />
      <text x="36" y="27" textAnchor="middle" fill="#00d4d4" fontSize="16" fontWeight="900" fontFamily="Arial Black, sans-serif">MBC</text>
      <text x="68" y="27" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">2</text>
    </svg>
  );
}
function MBCDramaLogo() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect width="100" height="40" rx="6" fill="#1a1a2e" />
      <text x="50" y="16" textAnchor="middle" fill="#00d4d4" fontSize="12" fontWeight="900" fontFamily="Arial Black, sans-serif">MBC</text>
      <text x="50" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">DRAMA</text>
    </svg>
  );
}
function RotanaLogo() {
  return (
    <svg viewBox="0 0 90 40" className="w-full h-full">
      <rect width="90" height="40" rx="6" fill="#7c2d12" />
      <text x="45" y="27" textAnchor="middle" fill="#fbbf24" fontSize="15" fontWeight="900" fontFamily="Arial Black, sans-serif">ROTANA</text>
    </svg>
  );
}
function BeinLogo() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect width="80" height="40" rx="6" fill="#4c1d95" />
      <text x="40" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif">بي إن</text>
      <text x="40" y="31" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="Arial Black, sans-serif">beIN</text>
    </svg>
  );
}
function BeinSportsLogo() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect width="100" height="40" rx="6" fill="#4c1d95" />
      <text x="50" y="16" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="700" fontFamily="Arial, sans-serif">beIN</text>
      <text x="50" y="31" textAnchor="middle" fill="white" fontSize="12" fontWeight="900" fontFamily="Arial Black, sans-serif">SPORTS</text>
    </svg>
  );
}
function SSCLogo() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect width="80" height="40" rx="6" fill="#14532d" />
      <text x="40" y="27" textAnchor="middle" fill="#4ade80" fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">SSC</text>
    </svg>
  );
}
function SSCExtraLogo() {
  return (
    <svg viewBox="0 0 110 40" className="w-full h-full">
      <rect width="110" height="40" rx="6" fill="#14532d" />
      <text x="55" y="16" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="900" fontFamily="Arial Black, sans-serif">SSC</text>
      <text x="55" y="32" textAnchor="middle" fill="#bbf7d0" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">EXTRA</text>
    </svg>
  );
}
function SaudiTVLogo() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect width="100" height="40" rx="6" fill="#1d4ed8" />
      <text x="50" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="8" fontWeight="700" fontFamily="Arial, sans-serif">القناة السعودية</text>
      <text x="50" y="31" textAnchor="middle" fill="white" fontSize="12" fontWeight="900" fontFamily="Arial Black, sans-serif">SAUDI TV</text>
    </svg>
  );
}
function NetflixLogo() {
  return (
    <svg viewBox="0 0 90 40" className="w-full h-full">
      <rect width="90" height="40" rx="6" fill="#141414" />
      <text x="45" y="27" textAnchor="middle" fill="#e50914" fontSize="14" fontWeight="900" fontFamily="Arial Black, sans-serif">NETFLIX</text>
    </svg>
  );
}
function AmazonLogo() {
  return (
    <svg viewBox="0 0 90 40" className="w-full h-full">
      <rect width="90" height="40" rx="6" fill="#232f3e" />
      <text x="45" y="18" textAnchor="middle" fill="#00a8e1" fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif">amazon</text>
      <text x="45" y="33" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif">prime video</text>
    </svg>
  );
}
function OSNLogo() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect width="80" height="40" rx="6" fill="#0f172a" />
      <text x="40" y="27" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">OSN</text>
    </svg>
  );
}

const channels = [
  { Logo: MBCLogo,      name: "MBC 1",        cat: "ترفيه" },
  { Logo: MBC2Logo,     name: "MBC 2",        cat: "أفلام" },
  { Logo: MBCDramaLogo, name: "MBC Drama",    cat: "مسلسلات" },
  { Logo: RotanaLogo,   name: "Rotana",       cat: "عربي" },
  { Logo: BeinLogo,     name: "beIN",         cat: "رياضة" },
  { Logo: BeinSportsLogo,name:"beIN Sports",  cat: "رياضة" },
  { Logo: SSCLogo,      name: "SSC",          cat: "سعودي" },
  { Logo: SSCExtraLogo, name: "SSC Extra",    cat: "رياضة" },
  { Logo: SaudiTVLogo,  name: "Saudi TV",     cat: "رسمي" },
  { Logo: NetflixLogo,  name: "Netflix",      cat: "عالمي" },
  { Logo: AmazonLogo,   name: "Prime Video",  cat: "عالمي" },
  { Logo: OSNLogo,      name: "OSN",          cat: "عربي" },
];

const devices = {
  ar: [
    { icon: Tv2,        label: "تلفاز ذكي",     sub: "Samsung • LG • Sony" },
    { icon: Smartphone, label: "الهاتف",         sub: "iOS & Android" },
    { icon: Tablet,     label: "الجهاز اللوحي",  sub: "iPad & Android" },
    { icon: Monitor,    label: "الكمبيوتر",      sub: "Windows & macOS" },
    { icon: Flame,      label: "Firestick",       sub: "Amazon Fire TV" },
    { icon: Box,        label: "MAG Box",         sub: "Set-Top Box" },
  ],
  en: [
    { icon: Tv2,        label: "Smart TV",   sub: "Samsung • LG • Sony" },
    { icon: Smartphone, label: "Mobile",     sub: "iOS & Android" },
    { icon: Tablet,     label: "Tablet",     sub: "iPad & Android" },
    { icon: Monitor,    label: "PC / Mac",   sub: "Windows & macOS" },
    { icon: Flame,      label: "Firestick",  sub: "Amazon Fire TV" },
    { icon: Box,        label: "MAG Box",    sub: "Set-Top Box" },
  ],
};

const copy = {
  ar: { title: "شاهد على أي جهاز", sub: "كورة لايف 11 يعمل على جميع أجهزتك", ch: "قنواتنا المميزة" },
  en: { title: "Watch on Any Device", sub: "KooraLive11 works on all your devices", ch: "Featured Channels" },
};

export default function Devices() {
  const { lang, theme } = useLang();
  const dark = theme === "dark";
  const list = devices[lang];
  const tx = copy[lang];

  return (
    <section id="devices" className={`py-24 px-4 relative overflow-hidden ${dark ? "bg-[#050510]" : "bg-slate-50"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        {/* Device cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {list.map((d, i) => {
            const Icon = d.icon;
            const color = dark
              ? (i % 2 === 0 ? "#00FFFF" : "#A855F7")
              : (i % 2 === 0 ? "#0369a1" : "#7c3aed");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, scale: 1.04 }}
                className={`rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-all cursor-default border ${
                  dark ? "glass" : "bg-white border-gray-100"
                }`}
                style={dark ? { border: `1px solid ${color}25` } : {}}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}12` }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>{d.label}</div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-slate-400"}`}>{d.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Channel logos — large and prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className={`text-center text-sm font-semibold uppercase tracking-widest mb-8 ${dark ? "text-gray-500" : "text-slate-400"}`}>{tx.ch}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {channels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className={`rounded-2xl p-3 transition-all cursor-default flex flex-col items-center gap-2 border ${
                  dark ? "glass border-white/10 hover:border-white/20 hover:shadow-lg" : "bg-white border-gray-100 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Logo */}
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <ch.Logo />
                </div>
                {/* Name + category */}
                <div className="text-center">
                  <div className={`text-xs font-bold ${dark ? "text-gray-200" : "text-slate-700"}`}>{ch.name}</div>
                  <div className={`text-[10px] ${dark ? "text-gray-500" : "text-slate-400"}`}>{ch.cat}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
