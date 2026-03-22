import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 bg-dark overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-dark-border/30 overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-dark-card to-cyan/5" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-cyan/8 blur-[80px] rounded-full" />

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-dark-border-light/50" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-dark-border-light/50" />

          {/* Content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 md:p-16 lg:p-20">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-8 h-[1px] bg-text-muted" />
                <span className="font-mono text-[11px] tracking-[0.3em] text-text-muted uppercase">
                  // Let's Build Together
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold italic leading-[1.1]"
              >
                Ready to build
                <br />
                <span className="gradient-text">something</span> great?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-6 text-text-secondary max-w-md leading-relaxed"
              >
                Your project should serve you, not the other way around. Let's
                turn your vision into a polished digital reality — on time, on
                budget, no surprises.
              </motion.p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start lg:items-end justify-center gap-6">
              <motion.a
                href="#"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-text-primary text-dark font-grotesk font-bold text-sm tracking-wider uppercase rounded-full hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-shadow duration-500"
              >
                Start a Project
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#work"
                  className="font-mono text-[12px] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  View Our Work <span>↗</span>
                </a>
                <a
                  href="#"
                  className="font-mono text-[12px] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  All Products <span>→</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="flex items-center gap-2 mt-4"
              >
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.15em] text-emerald uppercase">
                  Available for new projects
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
