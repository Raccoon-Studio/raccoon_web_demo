import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trustStats, trustedBrands } from "../../data/contact";
import { stagger, fadeUp } from "../animation/contactAnimation";

export default function TrustFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-24 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="space-y-12"
      >
        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl border border-dark-border/8 bg-white/[0.01]"
            >
              <span className="text-lg mb-1 block">{stat.icon}</span>
              <span className="font-display text-xl font-bold text-text-primary block">
                {stat.value}
              </span>
              <span className="font-mono text-[8px] text-text-dim/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/40 mb-5">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustedBrands.map((brand) => (
              <span
                key={brand}
                className="font-grotesk text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-text-dim/25 hover:text-text-dim/45 transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={fadeUp}
          className="relative text-center pt-10 border-t border-dark-border/8"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-20 bg-accent/[0.03] rounded-full blur-[60px]" />
          <p className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
            Ready to start?
          </p>
          <p className="font-body text-sm text-text-muted mb-6">
            Scroll back up to fill out the form, or reach out directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent hover:bg-accent/90 font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-dark transition-colors duration-300 shadow-lg shadow-accent/10"
            >
              Start a Project
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:hello@raccoonstudio.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-dark-border/20 bg-white/[0.02] hover:bg-white/[0.04] font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-text-muted hover:text-text-primary transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
