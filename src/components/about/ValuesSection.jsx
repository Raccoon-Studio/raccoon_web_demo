import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { values } from "../../data/about";
import { stagger, fadeUp } from "../animation/workAnimation";
import ValueCard from "../ui/card/about/ValueCard";

export default function ValuesSection() {
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
        <motion.div variants={fadeUp} className="max-w-xl mb-12">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Our Values
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Principles that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              guide every decision
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            These aren't poster slogans — they're operating principles we
            reference daily.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
