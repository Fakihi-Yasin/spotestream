"use client";
import { motion } from "framer-motion";
import { CreditCard, Play, ShoppingCart } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const stepIcons = [ShoppingCart, CreditCard, Play];
const stepColorsLight = ["#0891b2", "#7c3aed", "#0891b2"];
const stepColorsDark  = ["#00FFFF", "#A855F7", "#00FFFF"];

/* Mini visual for each step */
function StepVisual({ index, dark }: { index: number; dark: boolean }) {
  if (index === 0) return (
    <div className={`w-full aspect-video rounded-xl p-4 flex flex-col gap-3 border ${dark ? "glass border-cyan-400/20" : "bg-slate-50 border-slate-200"}`}>
      <div className="text-cyan-500 text-xs font-bold mb-1">اختر باقتك</div>
      {[{ name: "شهر", price: "49" }, { name: "3 أشهر ⭐", price: "119", active: true }, { name: "12 شهر", price: "349" }].map(p => (
        <div key={p.name} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border ${
          p.active
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/40"
            : dark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
        }`}>
          <span className={p.active ? "text-cyan-500 font-bold" : dark ? "text-gray-400" : "text-slate-500"}>{p.name}</span>
          <span className={p.active ? (dark ? "text-white font-bold" : "text-slate-800 font-bold") : dark ? "text-gray-500" : "text-slate-400"}>{p.price} ر.س</span>
        </div>
      ))}
    </div>
  );

  if (index === 1) return (
    <div className={`w-full aspect-video rounded-xl p-4 flex flex-col gap-3 justify-center border ${dark ? "glass border-purple-400/20" : "bg-slate-50 border-slate-200"}`}>
      <div className="text-purple-500 text-xs font-bold mb-2">الدفع الآمن</div>
      <div className="flex gap-2 flex-wrap">
        {["STC Pay", "مدى", "Visa", "Apple Pay"].map(m => (
          <div key={m} className={`px-2 py-1 rounded-lg text-xs border ${dark ? "bg-white/5 border-white/10 text-gray-400" : "bg-white border-slate-200 text-slate-600"}`}>{m}</div>
        ))}
      </div>
      <div className="mt-2 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/30">
        <span className={`text-xs font-semibold ${dark ? "text-white" : "text-slate-700"}`}>✓ دفع مؤمّن بالكامل</span>
      </div>
    </div>
  );

  return (
    <div className={`w-full aspect-video rounded-xl p-4 flex flex-col justify-between border ${dark ? "glass border-cyan-400/20" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className={`text-xs font-bold ${dark ? "text-white" : "text-slate-800"}`}>LIVE</span>
        </div>
        <span className="text-cyan-500 text-xs">4K HD</span>
      </div>
      <div className="flex items-center justify-center flex-1">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg"
        >
          <Play size={20} fill="white" className="text-white ms-0.5" />
        </motion.div>
      </div>
      <div className={`w-full h-1 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-slate-200"}`}>
        <motion.div
          animate={{ width: ["20%", "80%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { lang, theme } = useLang();
  const tx = t[lang].how;
  const dark = theme === "dark";

  return (
    <section id="how-it-works" className={`py-24 px-4 relative overflow-hidden ${dark ? "bg-black" : "bg-white"}`}>
      {dark && <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0010] to-black pointer-events-none" />}
      {dark && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A855F7]/5 blur-3xl pointer-events-none" />}

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tx.steps.map((step, i) => {
            const Icon = stepIcons[i];
            const color = dark ? stepColorsDark[i] : stepColorsLight[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`rounded-2xl p-6 flex flex-col gap-5 ${dark ? "glass" : "bg-slate-50 border border-slate-200 shadow-sm"}`}
                style={dark ? { border: `1px solid ${color}25` } : {}}
              >
                {/* Step visual */}
                <StepVisual index={i} dark={dark} />

                {/* Step info */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-orbitron text-xs" style={{ color }}>{step.n}</span>
                      <h3 className={`font-orbitron font-semibold text-base ${dark ? "text-white" : "text-slate-800"}`}>{step.title}</h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-slate-600"}`}>{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
