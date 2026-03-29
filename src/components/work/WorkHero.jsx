import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { clientBrands, aggregateResults } from "../../data/work";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function WorkHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden"
    >
      {/* BG elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/[0.015] rounded-full blur-[160px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-[1400px] px-6 lg:px-10"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Badge */}
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
              Our Work
            </span>
            <div className="flex-1 h-px bg-dark-border/20 max-w-[200px]" />
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={fadeUp}
            className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12"
          >
            <div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-text-primary leading-[1.02] tracking-tight mb-5">
                Products that
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-cyan">
                    drive results
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-accent to-cyan"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8, ease }}
                    style={{ originX: 0 }}
                  />
                </span>
              </h1>
              <p className="font-body text-base md:text-lg text-text-muted max-w-xl leading-relaxed">
                Every project is treated as a product — architected for scale,
                designed for users, shipped with precision. Here's proof.
              </p>
            </div>

            {/* Large stat */}
            <motion.div
              variants={fadeUp}
              className="hidden lg:block text-right"
            >
              <span className="font-display text-[140px] font-extrabold text-text-primary/[0.03] leading-none block">
                50+
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-text-dim/30 uppercase -mt-10 block">
                Projects Shipped
              </span>
            </motion.div>
          </motion.div>

          {/* Aggregate Results */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          >
            {aggregateResults.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, ease }}
                className="p-4 rounded-2xl border border-dark-border/12 bg-white/[0.015]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent/40">{stat.icon}</span>
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                    {stat.value}
                  </span>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-text-dim/40">
                  {stat.label}
                </p>
                <p className="font-body text-[11px] text-text-dim/30 mt-0.5">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Client logos */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-dim/30 shrink-0">
              Trusted by
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {clientBrands.slice(0, 8).map((c) => (
                <span
                  key={c.name}
                  className="font-grotesk text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-text-dim/20 hover:text-text-dim/40 transition-colors duration-300 cursor-default"
                >
                  {c.letters}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
