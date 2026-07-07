"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tv2, Smartphone, Tablet, Monitor, Box, Flame } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const CHANNELS = [
  { file: "2004b28714a8ac61b629daa56de05e91.jpg", name: "Canal+ Sport" },
  { file: "31a02b6e7b2cba0edf9678159b6151e6.jpg", name: "beIN Sports" },
  { file: "3cad4b413b8e806fe858dee875f558c3.jpg",  name: "Canal+" },
  { file: "4caa83a63167c64fce7946795e57c48d.jpg",  name: "TF1" },
  { file: "50a8836404f6acfe6f78dbe274d4d523.jpg",  name: "Sky Sport" },
  { file: "5dae64173273aa9edd1f80c546b71563.jpg",  name: "Disney+" },
  { file: "bd4114283735733d93933f6940860641.jpg",  name: "CNN" },
  { file: "c6c56dcb4f20e1bfbe82c5cf85a61069.jpg",  name: "Netflix" },
  { file: "cae9a94338c12ed80fddd2fec0c7a8a9.jpg",  name: "RMC Sport" },
  { file: "d0795904ca709db34bde5e445527ff3a.jpg",  name: "Amazon Prime" },
  { file: "d3da3b2fb7db022db0f7d54f2d463622.jpg",  name: "Cartoon Network" },
  { file: "d5709ffc0ef20f8eb61838b1d2056341.jpg",  name: "Fox" },
  { file: "d6ee1ce5c71fd7f2db593651f8cad295.jpg",  name: "France 2" },
  { file: "db366dad48df88d27c0d0cffee4c0102.jpg",  name: "France 3" },
  { file: "e212d95f949659d63722256d04fae268.jpg",  name: "Arte" },
  { file: "ea72c6ac5f06d6e46c64fbdb799ace0a.jpg",  name: "Eurosport" },
  { file: "f03775fea6a6cf80ac37be33aa11ef97.jpg",  name: "RMC Sport 2" },
  { file: "f3aefb4a4b110cadbc2c1ad0aa4aaa74.jpg",  name: "BFM TV" },
  { file: "f42f1eecc32bc6b11b0b41a36d019c39.jpg",  name: "L'Equipe" },
  { file: "sport-en-france-streaming-650x650.png", name: "Sport en France" },
];

const CARD_W = 280;
const CARD_H = 180;
const GAP = 16;
const STEP = CARD_W + GAP;
const SINGLE_W = CHANNELS.length * STEP;
const DURATION = CHANNELS.length * 2;

const DEVICES = [
  { icon: Tv2,        label: "Smart TV",  sub: "Samsung - LG - Sony" },
  { icon: Smartphone, label: "Mobile",    sub: "iOS & Android" },
  { icon: Tablet,     label: "Tablette",  sub: "iPad & Android" },
  { icon: Monitor,    label: "PC / Mac",  sub: "Windows & macOS" },
  { icon: Flame,      label: "Firestick", sub: "Amazon Fire TV" },
  { icon: Box,        label: "MAG Box",   sub: "Set-Top Box" },
];

export default function Devices() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const [paused, setPaused] = useState(false);
  const strip = [...CHANNELS, ...CHANNELS, ...CHANNELS, ...CHANNELS];

  return (
    <section
      id="devices"
      className={`py-24 relative ${dark ? "bg-[#050510]" : "bg-slate-50"}`}
    >
      <style>{`
        @keyframes marquee-ch {
          from { transform: translateX(0); }
          to   { transform: translateX(-${SINGLE_W}px); }
        }
        .marquee-ch {
          animation: marquee-ch ${DURATION}s linear infinite;
          will-change: transform;
        }
        .marquee-ch.paused { animation-play-state: paused; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">
            Regardez sur n&apos;importe quel appareil
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-slate-600"}`}>
            SpoteStream fonctionne sur tous vos appareils
          </p>
        </motion.div>

        {/* Device cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-24">
          {DEVICES.map((d, i) => {
            const Icon = d.icon;
            const color = dark
              ? (i % 2 === 0 ? "#0055A4" : "#EF4135")
              : (i % 2 === 0 ? "#0055A4" : "#EF4135");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all cursor-default border ${
                  dark ? "bg-white/4 border-white/8" : "bg-white border-gray-100"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>
                    {d.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-slate-400"}`}>
                    {d.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Channels marquee — full width, no padding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-10 px-4">
          <h3 className="font-orbitron font-black text-4xl md:text-5xl gradient-text">
            Cha&icirc;nes disponibles
          </h3>
        </div>

        <div className="relative overflow-hidden" style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}>
          {/* Left fade shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${dark ? "#050510" : "#f8fafc"}, transparent)` }} />
          {/* Right fade shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${dark ? "#050510" : "#f8fafc"}, transparent)` }} />
          <div
            className={`marquee-ch flex${paused ? " paused" : ""}`}
            style={{ gap: `${GAP}px`, width: "max-content" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {strip.map((ch, i) => (
              <div
                key={`${ch.file}-${i}`}
                className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${
                  dark
                    ? "bg-white/5 border-white/10 hover:border-[#0055A4]/50"
                    : "bg-white border-slate-200 hover:border-[#0055A4]/40"
                }`}
                style={{ width: CARD_W, height: CARD_H }}
              >
                <Image
                  src={`/channels/${ch.file}`}
                  alt={ch.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-semibold px-2 truncate drop-shadow">
                  {ch.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
