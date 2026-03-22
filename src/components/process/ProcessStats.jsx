// ─── components/process/ProcessStats.jsx ──────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "98%",
    label: "On-Time Delivery",
    sub: "Across all projects since 2021",
  },
  {
    value: "150+",
    label: "Projects Shipped",
    sub: "MVPs, platforms, and apps",
  },
  {
    value: "4.9/5",
    label: "Client Satisfaction",
    sub: "Avg. score on Clutch & Google",
  },
  {
    value: "<2hr",
    label: "Avg. Response Time",
    sub: "During active engagements",
  },
  {
    value: "$0",
    label: "Hidden Fees Ever",
    sub: "Fixed pricing, no surprises",
  },
  {
    value: "30d",
    label: "Free Post-Launch",
    sub: "Bug fixes & critical support",
  },
];

export default function ProcessStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            The Numbers
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Results speak louder
            <span className="text-accent"> than decks</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border/15 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
              className="bg-dark-card p-6 md:p-8 text-center group hover:bg-dark-elevated/50 transition-colors duration-300"
            >
              <motion.span
                className="font-display text-3xl md:text-4xl font-extrabold text-accent block"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                {s.value}
              </motion.span>
              <span className="mt-2 block font-grotesk text-sm font-bold text-text-primary tracking-wide">
                {s.label}
              </span>
              <span className="mt-1 block font-mono text-[10px] text-text-dim tracking-wider">
                {s.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
