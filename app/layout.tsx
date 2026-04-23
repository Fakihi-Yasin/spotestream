import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

export const metadata: Metadata = {
  title: "SpotStream — Premium IPTV Streaming",
  description: "10,000+ channels in 4K. Stream Arabic & international content with zero buffering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
