"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  const { theme } = useLang();
  const tx = t.no.faq;
  const dark = theme === "dark";

  return (
    <section id="faq" className={`py-24 px-4 relative ${dark ? "bg-[#050510]" : "bg-slate-50"}`} aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl px-6 ${
            dark ? "glass neon-border-cyan" : "bg-white border border-slate-200 shadow-sm"
          }`}
        >
          <Accordion type="single" collapsible>
            {tx.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className={dark ? "border-white/10" : "border-slate-100"}
              >
                <AccordionTrigger className={`text-left ${dark ? "text-gray-200 hover:text-[#4d9de0]" : "text-slate-800 hover:text-[#00205B]"} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00205B] rounded`}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className={dark ? "text-gray-400" : "text-slate-600"}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
