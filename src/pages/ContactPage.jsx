import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "../components/animation/contactAnimation";

import HeroHeader from "../components/contact/HeroHeader";
import ContactForm from "../components/ui/form/contact/ContactForm";
import ContactSidebar from "../components/ui/form/contact/ContactSidebar";
import ProcessSection from "../components/contact/ProcessSection";
import OfficesSection from "../components/contact/OfficesSection";
import TestimonialsSection from "../components/contact/TestimonialsSection";
import FAQSection from "../components/contact/FAQSection";
import TrustFooter from "../components/contact/TrustFooter";

export default function ContactPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-dark overflow-hidden"
    >
      {/* ═══ BG EFFECTS ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-accent/[0.012] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[400px] bg-cyan/[0.01] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[350px] bg-violet-500/[0.008] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* 1. Hero Header */}
      <HeroHeader isInView={isInView} />

      {/* 2. Form + Sidebar */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* Form Column */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <ContactForm />
          </motion.div>

          {/* Sidebar */}
          <ContactSidebar isInView={isInView} />
        </div>
      </div>

      {/* 3. Process */}
      <ProcessSection />

      {/* 4. Offices */}
      <OfficesSection />

      {/* 5. Testimonials */}
      <TestimonialsSection />

      {/* 6. FAQ */}
      <FAQSection />

      {/* 7. Trust Footer */}
      <TrustFooter />
    </section>
  );
}
