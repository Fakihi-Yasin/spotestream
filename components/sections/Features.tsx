"use client";
import { motion } from "framer-motion";
import { Tv2, Radio, Wifi, Monitor, Zap, Headphones } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const icons = [Tv2, Radio, Wifi, Monitor, Zap, Headphones];

export default function Features() {
  const { lang } = useLang();
  const tx = t[lang].features;

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{tx.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tx.items.map((item, i) => {
            const Icon = icons[i];
            const isCyan = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 group cursor-default ${isCyan ? "neon-border-cyan" : "neon-border-purple"} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isCyan
                    ? "bg-[#00FFFF]/10 text-[#00FFFF] group-hover:glow-cyan"
                    : "bg-[#A855F7]/10 text-[#A855F7] group-hover:glow-purple"
                } transition-all`}>
                  <Icon size={24} />
                </div>
                <h3 className={`font-orbitron font-semibold text-lg mb-2 ${isCyan ? "text-[#00FFFF]" : "text-[#A855F7]"}`}>
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
