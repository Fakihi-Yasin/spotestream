"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { MOVIE_FILES } from "@/lib/movies-data";

const CARD_WIDTH = 220;  // px
const CARD_GAP   = 16;   // px
const CARD_STEP  = CARD_WIDTH + CARD_GAP;

export default function MoviesCarousel() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const [paused, setPaused] = useState(false);

  if (MOVIE_FILES.length === 0) return null;

  // Duplicate 4× so the strip is always wider than the viewport
  const strip = [...MOVIE_FILES, ...MOVIE_FILES, ...MOVIE_FILES, ...MOVIE_FILES];
  // The animation translates exactly one full copy width, then resets — seamless loop
  const singleWidth = MOVIE_FILES.length * CARD_STEP;

  return (
    <section className={`py-16 overflow-hidden ${dark ? "bg-[#0a0a0f]" : "bg-slate-50"}`}>
      {/* Inject keyframe once via a style tag */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${singleWidth}px); }
        }
        .marquee-track {
          animation: marquee ${MOVIE_FILES.length * 1.8}s linear infinite;
          will-change: transform;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text">
          Films &amp; Séries
        </h2>
      </div>

      {/* Edge fades */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: dark ? "linear-gradient(to right,#0a0a0f,transparent)" : "linear-gradient(to right,#f8fafc,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: dark ? "linear-gradient(to left,#0a0a0f,transparent)" : "linear-gradient(to left,#f8fafc,transparent)" }} />

        {/* Marquee track */}
        <div
          className={`marquee-track flex${paused ? " paused" : ""}`}
          style={{ gap: `${CARD_GAP}px`, width: "max-content" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {strip.map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="relative rounded-xl overflow-hidden shrink-0 cursor-pointer group"
              style={{
                width: CARD_WIDTH,
                aspectRatio: "2/3",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04) translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.22)";
                (e.currentTarget as HTMLDivElement).style.zIndex = "10";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1) translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.zIndex = "1";
              }}
            >
              <Image
                src={`/movies/${encodeURIComponent(file)}`}
                alt=""
                fill
                className="object-cover"
                sizes="220px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
