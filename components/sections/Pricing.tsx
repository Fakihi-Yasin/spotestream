"use client";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Pricing() {
  const { lang } = useLang();
  const tx = t[lang].pricing;

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-gray-400 text-lg">{tx.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tx.plans.map((plan, i) => {
            const isPopular = "popular" in plan && plan.popular;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isPopular
                    ? "bg-gradient-to-b from-[#00FFFF]/10 to-[#A855F7]/10 border border-[#00FFFF]/40 glow-cyan scale-105"
                    : "glass neon-border-purple"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black text-xs font-bold">
                    <Star size={12} fill="black" />
                    {tx.popular}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-orbitron font-bold text-xl text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-orbitron font-black text-5xl gradient-text">{plan.price}</span>
                    <span className="text-[#00FFFF] font-bold text-lg">ر.س</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-[#00FFFF] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                    isPopular
                      ? "bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black glow-cyan"
                      : "glass neon-border-cyan text-[#00FFFF]"
                  }`}
                >
                  {tx.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
