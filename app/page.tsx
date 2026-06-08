import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import HowItWorks from "@/components/sections/HowItWorks";
import Devices from "@/components/sections/Devices";
import Features from "@/components/sections/Features";
import MoviesSection from "@/components/sections/MoviesSection";
import FootballSection from "@/components/sections/FootballSection";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Pricing />
      <HowItWorks />
      <Devices />
      <Features />
      <MoviesSection />
      <FootballSection />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
