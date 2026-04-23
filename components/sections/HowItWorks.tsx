"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function HowItWorks() {
  const { lang } = useLang();
  const tx = t[lang].how;

  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0010] to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A855F7]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-gray-400 text-lg">{tx.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#00FFFF]/30 via-[#A855F7]/30 to-[#00FFFF]/30" />

          {tx.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full glass-cyan flex items-center justify-center glow-cyan">
                  <span className="font-orbitron font-black text-2xl text-[#00FFFF]">{step.n}</span>
                </div>
              </div>
              <h3 className="font-orbitron font-semibold text-xl text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
