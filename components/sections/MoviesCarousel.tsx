"use client";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { MOVIE_FILES } from "@/lib/movies-data";

const CARD_WIDTH = 220;
const CARD_GAP   = 16;
const CARD_STEP  = CARD_WIDTH + CARD_GAP;

export default function MoviesCarousel() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const trackRef = useRef<HTMLDivElement>(null);

  if (MOVIE_FILES.length === 0) return null;

  const strip = [...MOVIE_FILES, ...MOVIE_FILES, ...MOVIE_FILES, ...MOVIE_FILES];
  const singleWidth = MOVIE_FILES.length * CARD_STEP;
  const duration = MOVIE_FILES.length * 1.8;

  return (
    <section
      className={`py-16 overflow-hidden ${dark ? "bg-[#0a0a0f]" : "bg-slate-50"}`}
      aria-labelledby="movies-heading"
    >
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 id="movies-heading" className="font-orbitron font-black text-4xl md:text-5xl gradient-text">
          Populære filmer
        </h2>
      </div>

      <div
        className="relative"
        aria-hidden="true"
        role="presentation"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: dark ? "linear-gradient(to right,#0a0a0f,transparent)" : "linear-gradient(to right,#f8fafc,transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: dark ? "linear-gradient(to left,#0a0a0f,transparent)" : "linear-gradient(to left,#f8fafc,transparent)" }}
        />

        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            width: "max-content",
            animation: `marquee-movies ${duration}s linear infinite`,
            willChange: "transform",
          }}
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
        >
          {strip.map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="relative rounded-xl overflow-hidden shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.04] hover:-translate-y-0.5"
              style={{
                width: CARD_WIDTH,
                aspectRatio: "2/3",
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

      <style>{`
        @keyframes marquee-movies {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${singleWidth}px); }
        }
      `}</style>
    </section>
  );
}
