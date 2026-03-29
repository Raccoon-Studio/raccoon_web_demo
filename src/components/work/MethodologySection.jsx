import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { methodology } from "../../data/work";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function MethodologySection() {
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
            Methodology
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              build
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            A battle-tested 4-phase approach refined across 50+ projects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {methodology.map((phase, i) => (
            <motion.div
              key={phase.phase}
              variants={fadeUp}
              className="group relative p-6 rounded-2xl border border-dark-border/12 bg-white/[0.01] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
            >
              {/* Connector line */}
              {i < methodology.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-dark-border/15" />
              )}

              <div className="w-10 h-10 rounded-xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/[0.12] transition-colors">
                {phase.icon}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  {phase.phase}
                </h3>
                <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
                  {phase.duration}
                </span>
              </div>

              <p className="font-body text-[13px] text-text-muted leading-relaxed mb-4">
                {phase.description}
              </p>

              <div className="space-y-1.5">
                {phase.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-accent/40 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-mono text-[10px] text-text-dim/40 uppercase tracking-wider">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
