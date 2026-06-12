"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "66539537142";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 end-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
      <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-red-500 border-2 border-black animate-pulse" />
    </motion.a>
  );
}
