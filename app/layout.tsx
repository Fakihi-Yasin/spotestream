import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import HtmlWrapper from "@/components/HtmlWrapper";


export const metadata: Metadata = {
  title: "SpoteStream — Premium Streaming Norge | Sport, Filmer og Serier",
  description: "Se sport, filmer og serier i 4K. Over 50 000 kanaler. Rask aktivering. Premium streaming i Norge.",
  keywords: "streaming norge, iptv norge, sport streaming, filmer serier, 4K streaming, NRK, TV2, Viaplay",
  openGraph: {
    title: "SpoteStream — Premium Streaming Norge",
    description: "Se sport, filmer og serier i 4K. Over 50 000 kanaler. Rask aktivering.",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpoteStream — Premium Streaming Norge",
    description: "Se sport, filmer og serier i 4K. Over 50 000 kanaler. Rask aktivering.",
  },
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
