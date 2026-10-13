import { siteMetadata } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import HtmlWrapper from "@/components/HtmlWrapper";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03040f",
};

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlWrapper fontVars={`${orbitron.variable} ${inter.variable}`}>
      <LangProvider>{children}</LangProvider>
    </HtmlWrapper>
  );
}
