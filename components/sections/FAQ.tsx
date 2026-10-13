"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

export default function FAQ() {
  const { theme } = useLang();
  const tx = t.no.faq;
  const dark = theme === "dark";

  return (
    <section id="faq" className={`py-24 px-4 relative ${dark ? "bg-[#050510]" : "bg-slate-50"}`} aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl px-6 ${
            dark ? "glass neon-border-cyan" : "bg-white border border-slate-200 shadow-sm"
          }`}
        >
          {tx.items.map((item, i) => (
            <details key={i} className={`faq-detail border-b last:border-0 ${dark ? "border-white/10" : "border-slate-100"}`}>
              <summary className={`cursor-pointer py-5 font-medium ${dark ? "text-gray-200" : "text-slate-800"}`}><h3 className="inline">{item.q}</h3></summary>
              <p className={`pb-5 text-sm leading-relaxed ${dark ? "text-gray-400" : "text-slate-600"}`}>{item.a}</p>
            </details>
          ))}
          <p className="text-muted py-5 text-sm"><a href="#pricing" className="underline">Se abonnement og priser</a>{" · "}<a href="#how-it-works" className="underline">Les om oppsett</a>{" · "}<a href="#contact" className="underline">Kontakt oss om feilsøking</a></p>
          <p className="text-muted pb-5 text-sm">Teknisk bakgrunn: <a href="https://www.itu.int/en/ITU-T/jca/iptv/Pages/tor.aspx" className="underline">ITUs definisjon av IPTV</a>{" · "}<a href="https://developer.samsung.com/tv-seller-office/faq/tv-seller-office-use.html" className="underline">Samsung om appbutikk og TV-modell</a>.</p>

        </motion.div>
      </div>
    </section>
  );
}
