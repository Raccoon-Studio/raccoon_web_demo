import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, fadeUp } from "../animation/workAnimation";
import BookCallButton from "../ui/form/contact/BookCallButton";

export default function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="relative text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <motion.div variants={fadeUp} className="relative">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-4">
            Let's Connect
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.08] mb-5">
            Ready to work with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-cyan">
              a team that ships?
            </span>
          </h2>
          <p className="font-body text-base md:text-lg text-text-muted max-w-md mx-auto mb-10">
            Whether you need a product built, a team augmented, or a strategy
            refined — we're here.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-accent px-8 py-4 font-grotesk text-[13px] font-bold uppercase tracking-[0.12em] text-dark overflow-hidden shadow-lg shadow-accent/15 hover:shadow-accent/25 transition-shadow duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.a>
            <BookCallButton variant="secondary" size="lg">
              Book a Call
            </BookCallButton>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
              <span className="relative rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="font-mono text-[10px] text-text-dim/40 uppercase tracking-widest">
              3 slots open for Q3 2025
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
