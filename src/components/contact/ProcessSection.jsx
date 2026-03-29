import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { processSteps } from "../../data/contact";
import { stagger, fadeUp } from "../animation/contactAnimation";

export default function ProcessSection() {
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
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What happens after you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              hit send
            </span>
          </h2>
          <p className="font-body text-base text-text-muted leading-relaxed">
            A transparent, proven workflow from first contact to launch day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="group relative p-5 rounded-2xl border border-dark-border/12 bg-white/[0.015] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
            >
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent/[0.12] transition-colors duration-300 flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[9px] text-accent/50 uppercase tracking-widest">
                      Step {step.step}
                    </span>
                    <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
                      · {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-text-primary">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="font-body text-[13px] text-text-muted leading-relaxed pl-[3.25rem]">
                {step.description}
              </p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-dark-border/20">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
