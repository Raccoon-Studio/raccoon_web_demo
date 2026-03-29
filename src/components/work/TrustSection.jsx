import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { workTrustSignals } from "../../data/work";
import { stagger, fadeUp } from "../animation/workAnimation";

export default function TrustSection() {
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
            Our Guarantees
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why teams{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              trust us
            </span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {workTrustSignals.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl border border-dark-border/10 bg-white/[0.01]"
            >
              <span className="font-display text-2xl font-bold text-text-primary block mb-1">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] text-text-dim/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Guarantees */}
        <div className="grid sm:grid-cols-2 gap-4">
          {workTrustSignals.guarantees.map((guarantee) => (
            <motion.div
              key={guarantee.title}
              variants={fadeUp}
              className="p-6 rounded-2xl border border-dark-border/12 bg-white/[0.015] hover:bg-white/[0.025] transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{guarantee.icon}</span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-text-primary mb-1.5">
                    {guarantee.title}
                  </h3>
                  <p className="font-body text-[13px] text-text-muted leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {workTrustSignals.certifications.map((cert) => (
            <span
              key={cert}
              className="px-4 py-2 rounded-xl border border-dark-border/10 bg-white/[0.01] font-mono text-[10px] text-text-dim/40 uppercase tracking-widest"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
