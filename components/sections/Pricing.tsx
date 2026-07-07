"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Tv, Monitor, Zap, Shield } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const FEATURES = [
  "Plus de 50 000 chaînes",
  "Qualité 4K / Full HD",
  "Films & Séries",
  "Tous les sports & PPV",
  "Bibliothèque VOD",
  "Support EPG",
  "Technologie Anti-Freeze",
  "Support 24h/24 et 7j/7",
  "Activation instantanée",
  "Compatible tous les appareils",
  "Smart TV / Android / Firestick / MAG",
];

const WA = "https://wa.me/447460010370?text=Bonjour%21%20Je%20suis%20int%C3%A9ress%C3%A9%20par%20votre%20abonnement%20IPTV.%20Pourriez-vous%20m%27envoyer%20plus%20d%27informations%20%3F";

const PLANS = [
  {
    id: "1m",
    name: "1 MOIS",
    bonus: null as string | null,
    prices: { one: 14.99, two: 19.99 },
    period: "/ mois",
    savings: null as string | null,
    features: FEATURES.slice(0, 7),
    gold: false,
    cta: "Commencer",
  },
  {
    id: "3m",
    name: "3 MOIS",
    bonus: null as string | null,
    prices: { one: 39.99, two: 49.99 },
    period: "/ 3 mois",
    savings: "Économisez 20%",
    features: FEATURES.slice(0, 9),
    gold: false,
    cta: "Commencer",
  },
  {
    id: "6m",
    name: "6 MOIS",
    bonus: null as string | null,
    prices: { one: 45.9, two: 55.9 },
    period: "/ 6 mois",
    savings: "Économisez 33%",
    features: FEATURES.slice(0, 10),
    gold: false,
    cta: "Commencer",
  },
  {
    id: "12m",
    name: "12 MOIS",
    bonus: "+ 2 MOIS OFFERTS",
    prices: { one: 59.99, two: 74.99 },
    period: "/ an",
    savings: "Économisez 44%",
    features: FEATURES,
    gold: true,
    cta: "Obtenir l'offre",
  },
];

export default function Pricing() {
  const { theme } = useLang();
  const dark = theme === "dark";
  const [devices, setDevices] = useState<"one" | "two">("one");

  return (
    <section
      id="pricing"
      className={`py-24 px-4 relative ${dark ? "bg-[#04040e]" : "bg-slate-50"}`}
    >
      {dark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #0055A4, transparent)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #F5B335, transparent)" }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className={`inline-block text-xs font-bold tracking-[0.3em] uppercase mb-3 px-4 py-1.5 rounded-full ${
            dark ? "bg-[#0055A4]/20 text-[#4d9de0]" : "bg-[#0055A4]/10 text-[#0055A4]"
          }`}>
            🇫🇷 Offres pour la France
          </span>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-4">
            Choisissez votre offre
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-gray-400" : "text-slate-500"}`}>
            Des prix transparents en euros — sans frais cachés
          </p>
        </motion.div>

        {/* Device toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setDevices("one")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              devices === "one"
                ? "bg-[#0055A4] text-white shadow-md"
                : dark ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Tv size={16} /> 1 Appareil
          </button>

          <button
            onClick={() => setDevices(d => d === "one" ? "two" : "one")}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              devices === "two" ? "bg-[#EF4135]" : "bg-slate-300"
            }`}
          >
            <motion.div
              animate={{ x: devices === "two" ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>

          <button
            onClick={() => setDevices("two")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              devices === "two"
                ? "bg-[#EF4135] text-white shadow-md"
                : dark ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Monitor size={16} /> 2 Appareils
          </button>
        </motion.div>

        {/* Cards — all same height, 12m raised via translateY */}
        {/* Wrapper has paddingTop = raise amount so raised card doesn't get clipped */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          style={{ alignItems: "stretch", paddingTop: 40 }}
        >
          {PLANS.map((plan, i) => {
            const price = plan.prices[devices];

            if (plan.gold) {
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  /* translateY raises it, does NOT change height or bottom position in the grid */
                  style={{ transform: "translateY(-40px)", display: "flex", flexDirection: "column" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.025, transition: { duration: 0.18 } }}
                    className="rounded-3xl overflow-hidden flex flex-col flex-1"
                    style={{
                      background: "linear-gradient(160deg, #162A67 0%, #1a3278 50%, #0f1e4a 100%)",
                      boxShadow: "0 24px 64px rgba(245,179,53,0.3), 0 0 0 1.5px rgba(245,179,53,0.55)",
                    }}
                  >
                    {/* Gold ribbon */}
                    <div
                      className="w-full py-2.5 text-center text-xs font-black tracking-widest uppercase shrink-0"
                      style={{ background: "linear-gradient(90deg,#F5B335,#FFC84A,#F5B335)", color: "#0f1e4a" }}
                    >
                      ⭐ Meilleur choix
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      {/* Top section */}
                      <div>
                        <div className="text-xl font-bold uppercase tracking-wide mb-2" style={{ color: "#F5B335" }}>
                          {plan.name}
                        </div>
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-5"
                          style={{ background: "rgba(245,179,53,0.15)", border: "1px solid rgba(245,179,53,0.4)", color: "#FFC84A" }}
                        >
                          🎁 {plan.bonus}
                        </div>

                        <div className="mb-5">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`12m-${devices}`}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.18 }}
                              className="flex items-start gap-1"
                            >
                              <span className="font-orbitron font-black leading-none"
                                style={{ fontSize: "clamp(2.8rem,5vw,3.5rem)", color: "#FFC84A" }}>
                                {price}
                              </span>
                              <span className="font-bold text-2xl mt-1" style={{ color: "rgba(245,179,53,0.65)" }}>€</span>
                            </motion.div>
                          </AnimatePresence>
                          <div className="text-sm font-medium mt-1" style={{ color: "rgba(245,179,53,0.6)" }}>{plan.period}</div>
                          <div className="text-xs mt-1.5 font-semibold" style={{ color: "rgba(245,179,53,0.8)" }}>
                            {plan.savings} par rapport au mensuel
                          </div>
                        </div>

                        <a
                          href={WA}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center py-3.5 rounded-2xl font-black text-sm mb-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: "linear-gradient(90deg,#F5B335,#FFC84A,#F5B335)",
                            color: "#0f1e4a",
                            boxShadow: "0 6px 24px rgba(245,179,53,0.45)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {plan.cta}
                        </a>

                        <div
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-4 text-xs font-semibold"
                          style={{ background: "rgba(245,179,53,0.1)", border: "1px solid rgba(245,179,53,0.25)", color: "#FFC84A" }}
                        >
                          <Shield size={13} style={{ color: "#F5B335", flexShrink: 0 }} />
                          <span>Activation instantanée • Satisfait ou remboursé</span>
                        </div>

                        <div className="h-px mb-5" style={{ background: "rgba(245,179,53,0.15)" }} />
                      </div>

                      {/* Features — flex-1 fills remaining space */}
                      <ul className="space-y-2.5 flex-1">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: "rgba(245,179,53,0.2)" }}>
                              <Check size={9} strokeWidth={3.5} style={{ color: "#F5B335" }} />
                            </span>
                            <span className="text-sm leading-snug text-slate-200">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom value box — always pinned to bottom */}
                      <div
                        className="mt-5 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0"
                        style={{ background: "rgba(245,179,53,0.08)", border: "1px solid rgba(245,179,53,0.2)", color: "#FFC84A" }}
                      >
                        <Zap size={13} style={{ color: "#F5B335", flexShrink: 0 }} />
                        <span>Meilleure valeur — seulement 4,99€/mois</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <motion.div
                  whileHover={{ scale: 1.025, transition: { duration: 0.18 } }}
                  className="rounded-3xl overflow-hidden flex flex-col flex-1"
                  style={{
                    background: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
                    border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e8edf2",
                    boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="p-7 flex flex-col flex-1">
                    {/* Top section */}
                    <div>
                      <div className="text-xl font-bold uppercase tracking-wide mb-4"
                        style={{ color: dark ? "#e2e8f0" : "#0f172a" }}>
                        {plan.name}
                      </div>

                      <div className="mb-5">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${plan.id}-${devices}`}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="flex items-start gap-1"
                          >
                            <span className="font-orbitron font-black leading-none"
                              style={{ fontSize: "clamp(2.8rem,5vw,3.5rem)", color: dark ? "#fff" : "#0f172a" }}>
                              {price}
                            </span>
                            <span className={`font-bold text-2xl mt-1 ${dark ? "text-gray-400" : "text-slate-400"}`}>€</span>
                          </motion.div>
                        </AnimatePresence>
                        <div className={`text-sm font-medium mt-1 ${dark ? "text-gray-500" : "text-slate-400"}`}>
                          {plan.period}
                        </div>
                        {plan.savings && (
                          <div className={`text-xs mt-1.5 font-semibold ${dark ? "text-gray-500" : "text-slate-400"}`}>
                            {plan.savings} par rapport au mensuel
                          </div>
                        )}
                      </div>

                      <a
                        href={WA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3.5 rounded-2xl font-black text-sm mb-5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: "linear-gradient(90deg,#0055A4 0%,#3a7bd5 50%,#0055A4 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(0,85,164,0.3)",
                        }}
                      >
                        {plan.cta}
                      </a>

                      <div className={`h-px mb-5 ${dark ? "bg-white/[0.08]" : "bg-slate-100"}`} />
                    </div>

                    {/* Features — flex-1 fills remaining space */}
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-100">
                            <Check size={9} strokeWidth={3.5} className="text-green-600" />
                          </span>
                          <span className={`text-sm leading-snug ${dark ? "text-gray-300" : "text-slate-600"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust row — margin accounts for the 40px raise */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-6"
        >
          {["🇫🇷 Offre France", "⚡ Activation instantanée", "🔒 Paiement sécurisé", "🎧 Support 24/7", "↩️ Satisfait ou remboursé"].map((item, i) => (
            <span key={i} className={`text-sm font-medium ${dark ? "text-gray-400" : "text-slate-500"}`}>{item}</span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
