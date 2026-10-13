import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Features from "@/components/sections/Features";
import MoviesCarousel from "@/components/sections/MoviesCarousel";
import Devices from "@/components/sections/Devices";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AnnouncementBar from "@/components/AnnouncementBar";

import { siteUrl, homeMetadata } from "@/lib/seo";
export const metadata = homeMetadata;

export default function Home() {
  return (
    <>
      {/* Skip-to-content for keyboard/screen reader users */}
      <a href="#main-content" className="skip-link">
        Hopp til innhold
      </a>

      {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite",
        name: "Beste IPTV i Norge", url: `${siteUrl}/`, inLanguage: "nb-NO",
      }).replace(/</g, "\\u003c") }} />}
      <AnnouncementBar />

      <div className="pt-11">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Pricing />
          <Features />
          <MoviesCarousel />
          <Devices />
          <HowItWorks />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
