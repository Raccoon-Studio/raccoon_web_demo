import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceMarquee from "./components/ServiceMarquee";
import Services from "./components/Services";
import HowWeWork from "./components/HowWeWork";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Contact from "./components/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="noise">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <main>
            <Navbar />
            <Hero />
            <ServiceMarquee />
            <Services />
            <HowWeWork />
            <Portfolio />
            <Testimonials />
            <Stats />
            <CTA />
            <TechStack />
            <Contact />
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
