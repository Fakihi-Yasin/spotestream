"use client";
import { motion } from "framer-motion";
import { Tv2, Smartphone, Tablet, Monitor, Box, Flame } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

const CHANNELS = [
  { file: "31a02b6e7b2cba0edf9678159b6151e6.jpg",  name: "beIN Sports" },
  { file: "3cad4b413b8e806fe858dee875f558c3.jpg",  name: "SSC" },
  { file: "4caa83a63167c64fce7946795e57c48d.jpg",  name: "MBC" },
  { file: "4cf6ab7f99a2e056573f3b1f4b450928.jpg",  name: "Rotana" },
  { file: "50a8836404f6acfe6f78dbe274d4d523.jpg",  name: "Sky Sport" },
  { file: "5dae64173273aa9edd1f80c546b71563.jpg",  name: "Disney+" },
  { file: "bd4114283735733d93933f6940860641.jpg",  name: "CNN" },
  { file: "c6c56dcb4f20e1bfbe82c5cf85a61069.jpg",  name: "Netflix" },
  { file: "cae9a94338c12ed80fddd2fec0c7a8a9.jpg",  name: "OSN" },
  { file: "d0795904ca709db34bde5e445527ff3a.jpg",  name: "Amazon Prime" },
  { file: "d3da3b2fb7db022db0f7d54f2d463622.jpg",  name: "Cartoon Network" },
  { file: "d5709ffc0ef20f8eb61838b1d2056341.jpg",  name: "Fox" },
  { file: "d6ee1ce5c71fd7f2db593651f8cad295.jpg",  name: "Al Jazeera" },
  { file: "db366dad48df88d27c0d0cffee4c0102.jpg",  name: "MBC Drama" },
  { file: "e212d95f949659d63722256d04fae268.jpg",  name: "beIN Movies" },
  { file: "f3aefb4a4b110cadbc2c1ad0aa4aaa74.jpg",  name: "Saudi TV" },
  { file: "f42f1eecc32bc6b11b0b41a36d019c39.jpg",  name: "Shahid" },
];

const devices = {
  ar: [
    { icon: Tv2,        label: "تلفاز ذكي",    sub: "Samsung • LG • Sony" },
    { icon: Smartphone, label: "الهاتف",        sub: "iOS & Android" },
    { icon: Tablet,     label: "الجهاز اللوحي", sub: "iPad & Android" },
    { icon: Monitor,    label: "الكمبيوتر",     sub: "Windows & macOS" },
    { icon: Flame,      label: "Firestick",      sub: "Amazon Fire TV" },
    { icon: Box,        label: "MAG Box",        sub: "Set-Top Box" },
  ],
  en: [
    { icon: Tv2,        label: "Smart TV",  sub: "Samsung • LG • Sony" },
    { icon: Smartphone, label: "Mobile",    sub: "iOS & Android" },
    { icon: Tablet,     label: "Tablet",    sub: "iPad & Android" },
    { icon: Monitor,    label: "PC / Mac",  sub: "Windows & macOS" },
    { icon: Flame,      label: "Firestick", sub: "Amazon Fire TV" },
    { icon: Box,        label: "MAG Box",   sub: "Set-Top Box" },
  ],
};

const copy = {
  ar: { title: "شاهد على أي جهاز", sub: "كورة لايف 11 يعمل على جميع أجهزتك", ch: "قنواتنا المميزة" },
  en: { title: "Watch on Any Device", sub: "KooraLive11 works on all your devices", ch: "Featured Channels" },
};

export default function Devices() {
  const { lang, theme } = useLang();
  const dark = theme === "dark";
  const list = devices[lang];
  const tx = copy[lang];

  return (
    <section
      id="devices"
      className={`py-24 px-4 relative overflow-hidden ${dark ? "bg-[#050510]" : "bg-slate-50"}`}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section title ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-6">{tx.title}</h2>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-slate-600"}`}>{tx.sub}</p>
        </motion.div>

        {/* ── Device cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-24">
          {list.map((d, i) => {
            const Icon = d.icon;
            const color = dark
              ? (i % 2 === 0 ? "#00FFFF" : "#A855F7")
              : (i % 2 === 0 ? "#0369a1" : "#7c3aed");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, scale: 1.04 }}
                className={`rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-all cursor-default border ${
                  dark ? "glass" : "bg-white border-gray-100"
                }`}
                style={dark ? { border: `1px solid ${color}25` } : {}}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}12` }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>{d.label}</div>
                  <div className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-slate-400"}`}>{d.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Channels — MUI Pinterest masonry ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="font-orbitron font-black text-4xl md:text-5xl gradient-text">
              {tx.ch}
            </h3>
          </div>

          <ImageList variant="masonry" cols={4} gap={12}
            sx={{
              columnCount: { xs: "2 !important", sm: "3 !important", md: "4 !important" },
              m: 0,
            }}
          >
            {CHANNELS.map((ch, i) => (
              <ImageListItem key={i}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                    bgcolor: dark ? "rgba(255,255,255,0.03)" : "#fff",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.04) translateY(-4px)",
                      boxShadow: dark
                        ? "0 0 24px rgba(0,255,255,0.3), 0 12px 40px rgba(0,0,0,0.8)"
                        : "0 12px 40px rgba(0,0,0,0.15)",
                      borderColor: dark ? "rgba(0,255,255,0.45)" : "rgba(99,102,241,0.45)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`/channels/${ch.file}`}
                    alt={ch.name}
                    loading="lazy"
                    sx={{ display: "block", width: "100%", height: "auto" }}
                  />
                  <Typography
                    component="div"
                    variant="caption"
                    align="center"
                    sx={{
                      display: "block",
                      py: 1,
                      px: 1.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
                      letterSpacing: 0.5,
                    }}
                  >
                    {ch.name}
                  </Typography>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </motion.div>

      </div>
    </section>
  );
}
