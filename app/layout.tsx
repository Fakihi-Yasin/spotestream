import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import HtmlWrapper from "@/components/HtmlWrapper";

export const metadata: Metadata = {
  title: "KooraLive11 — Premium IPTV Streaming",
  description: "10,000+ channels in 4K. Stream Arabic & international content with zero buffering.",
  icons: {
    icon: "/logo/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlWrapper>
      <LangProvider>{children}</LangProvider>
    </HtmlWrapper>
  );
}
