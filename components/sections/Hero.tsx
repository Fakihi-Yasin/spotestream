"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.o += s.speed;
        const opacity = Math.abs(Math.sin(s.o));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient-bg pt-20">
      <Stars />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00FFFF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#A855F7]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Ramadan Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 rounded-full glass border border-[#A855F7]/40 text-sm text-[#A855F7] font-medium"
        >
          {tx.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
        >
          <span className="text-white">{tx.headline1} </span>
          <span className="gradient-text glow-text-cyan">{tx.headline2}</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {tx.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black font-bold text-lg glow-cyan hover:scale-105 transition-transform"
          >
            <Play size={20} fill="black" />
            {tx.cta1}
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-full glass neon-border-cyan text-[#00FFFF] font-semibold text-lg hover:scale-105 transition-transform"
          >
            {tx.cta2}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[["10K+", lang === "ar" ? "قناة" : "Channels"], ["4K", lang === "ar" ? "جودة" : "Quality"], ["99.9%", lang === "ar" ? "وقت التشغيل" : "Uptime"], ["24/7", lang === "ar" ? "دعم" : "Support"]].map(([val, label]) => (
            <div key={label}>
              <div className="font-orbitron font-bold text-2xl gradient-text">{val}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
