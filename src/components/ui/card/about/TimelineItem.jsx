import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "../../../animation/workAnimation";

const typeColors = {
  founding: "bg-accent",
  revenue: "bg-emerald",
  team: "bg-cyan",
  milestone: "bg-violet-400",
  expansion: "bg-blue-400",
  award: "bg-amber-400",
  compliance: "bg-rose-400",
};

export default function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease }}
      className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-6 md:gap-10`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
        <div className="p-5 rounded-2xl border border-dark-border/12 bg-white/[0.015] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300 group">
          <div
            className={`flex items-center gap-2 mb-2 ${isEven ? "md:justify-end" : ""}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-mono text-[9px] text-text-dim/40 uppercase tracking-widest">
              {item.year} {item.quarter}
            </span>
          </div>
          <h3 className="font-display text-[15px] font-bold text-text-primary mb-1.5">
            {item.title}
          </h3>
          <p className="font-body text-[13px] text-text-muted leading-relaxed mb-2">
            {item.description}
          </p>
          <span className="font-display text-sm font-bold text-accent">
            {item.metric}
          </span>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <div
          className={`w-3 h-3 rounded-full ${typeColors[item.type] || "bg-accent"} ring-4 ring-dark`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-dark-border/15 min-h-[40px]" />
        )}
      </div>

      {/* Spacer for alternating */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
