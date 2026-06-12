"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOVIE_FILES } from "@/lib/movies-data";
import { useLang } from "@/lib/lang-context";

const title = { ar: "أفلام ومسلسلات", en: "Movies & Series" };

export default function MoviesCarousel() {
  const images = MOVIE_FILES;
  const { theme, lang } = useLang();
  const dark = theme === "dark";
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleCount = useCallback(() => {
    if (typeof window === "undefined") return 5;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 5;
  }, []);

  const slide = useCallback(
    (dir: 1 | -1) => {
      if (transitioning || images.length === 0) return;
      setTransitioning(true);
      setIndex(i => (i + dir + images.length) % images.length);
      setTimeout(() => setTransitioning(false), 400);
    },
    [transitioning, images.length]
  );

  // Autoplay every 2s
  useEffect(() => {
    if (images.length === 0) return;
    timerRef.current = setInterval(() => slide(1), 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length, slide]);

  if (images.length === 0) return null;

  // Build infinite visible slice: repeat array 3× so we can always slice
  const pool = [...images, ...images, ...images];
  const offset = images.length; // start from middle copy
  const count = visibleCount();
  const visible = Array.from({ length: count }, (_, i) =>
    pool[(offset + index + i) % pool.length]
  );

  return (
    <section className={`py-16 overflow-hidden ${dark ? "bg-[#0a0a0f]" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">
            {title[lang]}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Left arrow */}
          <button
            onClick={() => slide(-1)}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full border
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity
                       ${dark
                         ? "bg-black/70 border-white/10 text-white hover:bg-black/90 hover:border-cyan-400/50"
                         : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-indigo-400 shadow-md"
                       }`}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
          >
            {visible.map((file, i) => (
              <div
                key={`${file}-${i}`}
                className="relative overflow-hidden rounded-xl cursor-pointer"
                style={{
                  aspectRatio: "2/3",
                  transition: "transform 0.4s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.07)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 20px 60px rgba(0,255,255,0.25), 0 8px 30px rgba(0,0,0,0.8)";
                  (e.currentTarget as HTMLDivElement).style.zIndex = "10";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.zIndex = "1";
                }}
              >
                <Image
                  src={`/movies/${encodeURIComponent(file)}`}
                  alt={file}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                  style={{
                    transition: "transform 0.4s cubic-bezier(.25,.8,.25,1)",
                  }}
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => slide(1)}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full border
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity
                       ${dark
                         ? "bg-black/70 border-white/10 text-white hover:bg-black/90 hover:border-cyan-400/50"
                         : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-indigo-400 shadow-md"
                       }`}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "24px" : "6px",
                background: i === index
                  ? "linear-gradient(90deg,#0891b2,#a855f7)"
                  : dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
