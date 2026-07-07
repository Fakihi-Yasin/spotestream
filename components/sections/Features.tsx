"use client";
import { motion } from "framer-motion";
import { Tv2, Radio, Wifi, Monitor, Zap, Headphones } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const icons = [Tv2, Radio, Wifi, Monitor, Zap, Headphones];

export default function Features() {
  const { theme } = useLang();
  const tx = t.no.features;
  const dark = theme === "dark";

  return (
    <section id="features" className={`py-24 px-4 relative ${dark ? "bg-[#050510]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {tx.items.map((item, i) => {
            const Icon = icons[i];
            const isCyan = i % 2 === 0;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 group cursor-default transition-all duration-300 hover:-translate-y-1 ${
                  dark
                    ? `glass ${isCyan ? "neon-border-cyan" : "neon-border-purple"}`
                    : `border ${isCyan ? "border-[#00205B]/20 bg-blue-50/50 hover:border-[#00205B]/50" : "border-[#BA0C2F]/20 bg-red-50/50 hover:border-[#BA0C2F]/50"} hover:shadow-md`
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    isCyan
                      ? dark ? "bg-[#00205B]/10 text-[#4d9de0]" : "bg-blue-100 text-[#00205B]"
                      : dark ? "bg-[#BA0C2F]/10 text-[#BA0C2F]" : "bg-red-100 text-[#BA0C2F]"
                  }`}
                  aria-hidden="true"
                >
                  <Icon size={24} />
                </div>
                <h3 className={`font-orbitron font-semibold text-lg mb-2 ${
                  isCyan
                    ? dark ? "text-[#4d9de0]" : "text-[#00205B]"
                    : dark ? "text-[#BA0C2F]" : "text-[#BA0C2F]"
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-slate-600"}`}>{item.desc}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
