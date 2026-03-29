import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { industries } from "../../data/work";
import { stagger, fadeUp } from "../animation/workAnimation";

export default function ResultsSection() {
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
            Industries
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Deep expertise across{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              industries
            </span>
          </h2>
          <p className="font-body text-base text-text-muted leading-relaxed">
            We bring specialized knowledge from fintech compliance to healthcare
            regulations, e-commerce conversion patterns to AI model deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="group p-5 rounded-2xl border border-dark-border/12 bg-white/[0.01] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
            >
              <span className="text-2xl block mb-3">{ind.icon}</span>
              <h4 className="font-display text-[15px] font-bold text-text-primary mb-1">
                {ind.name}
              </h4>
              <span className="font-mono text-[10px] text-accent/50 uppercase tracking-widest">
                {ind.count} projects
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
