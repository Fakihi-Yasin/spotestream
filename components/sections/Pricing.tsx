"use client";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function Pricing() {
  const { theme } = useLang();
  const tx = t.fr.pricing;
  const dark = theme === "dark";

  return (
    <section id="pricing" className={`py-24 px-4 relative ${dark ? "bg-[#050510]" : "bg-slate-50"}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
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
                    ? "bg-gradient-to-b from-[#0055A4]/10 to-[#EF4135]/10 border-2 border-[#0055A4]/60 scale-105"
                    : dark
                      ? "glass neon-border-purple"
                      : "bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white text-xs font-bold shadow-md">
                    <Star size={12} fill="white" />
                    {tx.popular}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-orbitron font-bold text-xl mb-4 ${dark ? "text-white" : "text-slate-800"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-orbitron font-black text-5xl gradient-text">{plan.price}</span>
                    <span className="text-[#0055A4] font-bold text-lg">€</span>
                    <span className={`text-sm ${dark ? "text-gray-500" : "text-slate-400"}`}>{plan.period}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${dark ? "text-gray-300" : "text-slate-600"}`}>
                      <Check size={16} className="text-[#0055A4] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                    isPopular
                      ? "bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white shadow-md"
                      : dark
                        ? "glass neon-border-cyan text-[#4d9de0]"
                        : "border-2 border-[#0055A4] text-[#0055A4] hover:bg-[#0055A4]/5"
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
