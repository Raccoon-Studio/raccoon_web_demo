import { motion } from "framer-motion";
import { trustStats } from "../../data/contact";
import { stagger, fadeUp, ease } from "../animation/contactAnimation";

export default function HeroHeader({ isInView }) {
  return (
    <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-32 md:pt-40 pb-16 md:pb-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl"
      >
        {/* Badges */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.06] border border-accent/15">
            <span className="font-mono text-[10px] text-accent tracking-[0.2em] font-semibold">
              04
            </span>
            <span className="w-px h-3 bg-accent/20" />
            <span className="font-body text-[11px] text-accent/80 uppercase tracking-[0.12em]">
              Get in Touch
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/[0.06] border border-emerald/15">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald/50 animate-ping" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-emerald" />
            </span>
            <span className="font-mono text-[10px] text-emerald/80 uppercase tracking-widest">
              Online now
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-text-primary leading-[1.05] tracking-tight mb-5"
        >
          Let's build something
          <br />
          <span className="relative inline-block mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-indigo-400 to-cyan">
              extraordinary together
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-accent via-indigo-400 to-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-body text-base md:text-lg text-text-muted max-w-xl leading-relaxed mb-8"
        >
          Tell us about your project and we'll craft a tailored plan. Whether
          you need a quick MVP or an enterprise platform, we've got you covered.
        </motion.p>

        {/* Trust stats */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-6 md:gap-8"
        >
          {trustStats.slice(0, 4).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-baseline gap-2"
            >
              <span className="font-display text-xl md:text-2xl font-bold text-text-primary">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim/50">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
