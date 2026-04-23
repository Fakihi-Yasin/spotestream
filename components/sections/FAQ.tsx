"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/translations";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  const { lang } = useLang();
  const tx = t[lang].faq;

  return (
    <section id="faq" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl gradient-text mb-4">{tx.title}</h2>
          <p className="text-gray-400 text-lg">{tx.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl px-6 neon-border-cyan"
        >
          <Accordion type="single" collapsible>
            {tx.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
