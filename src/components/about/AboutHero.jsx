import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { companyOverview, companyStats } from "../../data/about";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/[0.012] rounded-full blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              <span className="w-2 h-2 rounded-full bg-accent/25" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-text-muted">
              About Us · Est. {companyOverview.founded}
            </span>
            <div className="flex-1 h-px bg-dark-border/20 max-w-[200px]" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-text-primary leading-[1.02] tracking-tight mb-6 max-w-4xl"
          >
            A product studio that
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-cyan">
                ships what matters
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-accent to-cyan"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8, ease }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-base md:text-lg text-text-muted max-w-2xl leading-relaxed mb-12"
          >
            {companyOverview.description}
          </motion.p>

          {/* Key stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {companyStats.slice(0, 4).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, ease }}
                className="p-4 rounded-2xl border border-dark-border/12 bg-white/[0.015]"
              >
                <span className="text-lg block mb-1">{stat.icon}</span>
                <span className="font-display text-2xl md:text-3xl font-bold text-text-primary block">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim/40">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
