// ─── components/process/ProcessCTA.jsx ────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ProcessCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-dark overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[700px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-emerald border border-emerald/20 bg-emerald/5 rounded-full px-5 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            READY TO START
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Let's build something
            <br />
            <span className="text-accent">worth shipping</span>
          </h2>

          <p className="mt-6 text-text-muted text-lg leading-relaxed">
            Book a free 30-minute discovery call. We'll discuss your project,
            walk through our process, and give you a honest assessment — even if
            that means telling you we're not the right fit.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-grotesk text-sm font-bold text-dark bg-accent hover:bg-accent/90 transition-colors px-8 py-4 rounded-full"
            >
              Book a discovery call
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="mailto:hello@raccoonstudios.dev"
              className="font-grotesk text-sm font-semibold text-text-muted hover:text-accent transition-colors px-6 py-4"
            >
              or email us directly →
            </a>
          </div>

          {/* Trust micro-badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-6"
          >
            {["Free consultation", "NDA ready", "No obligation"].map(
              (badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-emerald"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-mono text-[11px] text-text-dim tracking-wider">
                    {badge}
                  </span>
                </div>
              ),
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
