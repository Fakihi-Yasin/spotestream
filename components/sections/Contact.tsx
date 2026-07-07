"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const WHATSAPP_NUMBER = "447460010370";
const WA_MSG = "Hei%21%20Jeg%20er%20interessert%20i%20et%20IPTV-abonnement.%20Kan%20du%20sende%20meg%20mer%20informasjon%3F";

export default function Contact() {
  const { theme } = useLang();
  const tx = t.no.contact;
  const dark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Navn: ${form.name}\nE-post: ${form.email}\nMelding: ${form.message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const inputClass = `w-full rounded-xl px-4 py-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B]/60 ${
    dark
      ? "bg-white/5 border border-white/10 text-gray-200 placeholder:text-gray-500"
      : "bg-slate-100 border border-slate-200 text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-[#00205B]"
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${dark ? "text-gray-300" : "text-slate-700"}`;

  return (
    <section id="contact" className={`py-24 px-4 relative ${dark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg mb-8 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
          aria-label="Chat med oss på WhatsApp"
        >
          <MessageCircle size={24} aria-hidden="true" />
          {tx.whatsapp}
        </motion.a>

        <div className="flex items-center gap-4 mb-8" aria-hidden="true">
          <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
          <span className={`text-sm ${dark ? "text-gray-400" : "text-slate-500"}`}>
            eller send en melding
          </span>
          <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className={`rounded-2xl p-8 space-y-5 ${
            dark ? "glass neon-border-purple" : "bg-slate-50 border border-slate-200 shadow-sm"
          }`}
          aria-label="Kontaktskjema"
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {tx.name}
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder={tx.name}
              required
              autoComplete="name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {tx.email}
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder={tx.email}
              required
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              {tx.message}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder={tx.message}
              required
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className={inputClass + " resize-none"}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00205B] to-[#BA0C2F] text-white font-bold hover:opacity-90 hover:scale-[1.02] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00205B]"
          >
            <Send size={18} aria-hidden="true" />
            {tx.send}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
