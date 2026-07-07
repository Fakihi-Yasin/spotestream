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

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <div className="pt-11">
        <Navbar />
        <main id="main-content">
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
