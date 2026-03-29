import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { offices } from "../../data/contact";
import { stagger, fadeUp } from "../animation/contactAnimation";
import OfficeCard from "../ui/card/contact/OfficeCard";

export default function OfficesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-xl mb-12 md:mb-16">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Our Offices
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Global presence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              local touch
            </span>
          </h2>
          <p className="font-body text-base text-text-muted leading-relaxed">
            With teams across three continents, we ensure seamless collaboration
            in any timezone.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office) => (
            <OfficeCard key={office.city} office={office} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
