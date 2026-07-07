"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/447460010370?text=Hei%21%20Jeg%20er%20interessert%20i%20et%20IPTV-abonnement.%20Kan%20du%20sende%20meg%20mer%20informasjon%3F";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("promo_dismissed")) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("promo_dismissed", "1");
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[310px] sm:w-[340px]"
            style={{ filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.18))" }}
          >
            <div
              className="relative rounded-[22px] overflow-hidden bg-white"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)" }}
            >
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg,#00205B,#25D366,#BA0C2F)" }}
              />

              <div className="px-5 pt-4 pb-6">
                <button
                  onClick={dismiss}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  aria-label="Lukk"
                >
                  <X size={14} className="text-slate-500" />
                </button>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase mb-3"
                  style={{ background: "rgba(37,211,102,0.12)", color: "#16a34a" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  Begrenset tilbud
                </span>

                <h3 className="text-slate-900 font-black text-[17px] leading-snug mb-1.5 pr-6">
                  🎁 12 Måneder + 2 Måneder{" "}
                  <span style={{ color: "#00205B" }}>GRATIS</span>
                </h3>

                <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
                  Få tilgang til over 50 000 kanaler i 4K, filmer, serier og all sport direkte — fra kun <strong className="text-slate-700">149 kr/mnd</strong>.
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-[12px] font-medium">
                    4.9 · <strong className="text-slate-600">+12 000</strong> aktive abonnenter
                  </span>
                </div>

                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-black text-white text-[14px] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg,#25D366,#1aab52)",
                    boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
                  }}
                >
                  <MessageCircle size={18} fill="white" />
                  Bestill via WhatsApp
                </a>

                <p className="text-center text-slate-400 text-[11px] mt-3 leading-relaxed">
                  Svar innen 5 min · Umiddelbar aktivering
                </p>
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#25D366,#1aab52)",
                  boxShadow: "0 6px 20px rgba(37,211,102,0.5)",
                }}
              >
                <MessageCircle size={26} fill="white" className="text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dismissed && (
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#25D366,#1aab52)",
              boxShadow: "0 6px 24px rgba(37,211,102,0.5)",
            }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={28} fill="white" className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
