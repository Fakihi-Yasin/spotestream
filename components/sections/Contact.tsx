"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const WHATSAPP_NUMBER = "966500000000";

export default function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#00FFFF]/60 focus:bg-white/8 transition-all";

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0010] to-black pointer-events-none" />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-gray-400 text-lg">{tx.sub}</p>
        </motion.div>

        {/* WhatsApp prominent button */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg mb-8 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
        >
          <MessageCircle size={24} />
          {tx.whatsapp}
        </motion.a>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-600 text-sm">{lang === "ar" ? "أو أرسل رسالة" : "or send a message"}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 neon-border-purple space-y-5"
        >
          <input
            type="text"
            placeholder={tx.name}
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
          <input
            type="email"
            placeholder={tx.email}
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
          <textarea
            rows={5}
            placeholder={tx.message}
            required
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={inputClass + " resize-none"}
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#A855F7] text-black font-bold hover:opacity-90 hover:scale-[1.02] transition-all glow-cyan"
          >
            <Send size={18} />
            {tx.send}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
