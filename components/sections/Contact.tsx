"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";

const WHATSAPP_NUMBER = "966500000000";

export default function Contact() {
  const { lang, theme } = useLang();
  const tx = t[lang].contact;
  const dark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const inputClass = `w-full rounded-xl px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
    dark
      ? "bg-white/5 border border-white/10 text-gray-200 placeholder:text-gray-600 focus:bg-white/8"
      : "bg-slate-100 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-cyan-400"
  }`;

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

        {/* WhatsApp button */}
        {/* <motion.a
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
        </motion.a> */}

        <div className="flex items-center gap-4 mb-8">
          <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
          <span className={`text-sm ${dark ? "text-gray-500" : "text-slate-400"}`}>
            {lang === "ar" ? "أو أرسل رسالة" : "or send a message"}
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
          >
            <Send size={18} />
            {tx.send}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
