import { motion } from "framer-motion";
import { fadeUp } from "../../../animation/workAnimation";

const colorMap = {
  accent: {
    bg: "bg-accent/[0.07]",
    border: "border-accent/20",
    text: "text-accent",
  },
  emerald: {
    bg: "bg-emerald/[0.07]",
    border: "border-emerald/20",
    text: "text-emerald",
  },
  cyan: { bg: "bg-cyan/[0.07]", border: "border-cyan/20", text: "text-cyan" },
  amber: {
    bg: "bg-amber-400/[0.07]",
    border: "border-amber-400/20",
    text: "text-amber-400",
  },
  violet: {
    bg: "bg-violet-400/[0.07]",
    border: "border-violet-400/20",
    text: "text-violet-400",
  },
  rose: {
    bg: "bg-rose-400/[0.07]",
    border: "border-rose-400/20",
    text: "text-rose-400",
  },
};

export default function ValueCard({ value }) {
  const c = colorMap[value.color] || colorMap.accent;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="group p-6 rounded-2xl border border-dark-border/12 bg-white/[0.01] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
    >
      <div
        className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} mb-4 group-hover:scale-105 transition-transform duration-300`}
      >
        {value.icon}
      </div>

      <h3 className="font-display text-lg font-bold text-text-primary mb-1.5">
        {value.title}
      </h3>

      <p className="font-body text-[13px] text-text-muted leading-relaxed mb-3">
        {value.description}
      </p>

      <span
        className={`font-mono text-[9px] uppercase tracking-widest ${c.text}/50`}
      >
        {value.principle}
      </span>
    </motion.div>
  );
}
