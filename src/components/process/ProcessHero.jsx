// ─── components/process/ProcessHero.jsx ───────────────────
import { motion } from "framer-motion";

export default function ProcessHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-dark">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[120px]" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-accent border border-accent/20 bg-accent/5 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          OUR PROCESS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
        >
          We don't just build.
          <br />
          <span className="text-accent">We engineer trust.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 max-w-2xl mx-auto text-text-muted text-lg leading-relaxed"
        >
          Every pixel, every sprint, every deploy follows a battle-tested
          framework designed for one outcome —{" "}
          <span className="text-text-primary font-medium">
            shipping software you can bet your business on.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#timeline"
            className="inline-flex items-center gap-2 font-grotesk text-sm font-bold text-dark bg-accent hover:bg-accent/90 transition-colors px-7 py-3.5 rounded-full"
          >
            See the full process
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-grotesk text-sm font-semibold text-text-primary border border-dark-border/50 hover:border-accent/40 transition-colors px-7 py-3.5 rounded-full"
          >
            Book a discovery call
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 rounded-full border border-dark-border/40 flex items-start justify-center pt-1.5"
          >
            <span className="w-1 h-2 rounded-full bg-text-dim" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
