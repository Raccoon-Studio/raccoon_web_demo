import { motion } from "framer-motion";
import { fadeUp } from "../../../animation/workAnimation";

export default function AwardCard({ award }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="flex items-start gap-3.5 p-4 rounded-2xl border border-dark-border/12 bg-white/[0.015] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
    >
      <span className="text-2xl mt-0.5">{award.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-display text-[14px] font-bold text-text-primary">
            {award.name}
          </span>
          <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
            {award.year}
          </span>
        </div>
        <p className="font-body text-[12px] text-text-muted">
          {award.category}
        </p>
        <p className="font-mono text-[9px] text-accent/50 uppercase tracking-widest mt-1">
          {award.project}
        </p>
      </div>
    </motion.div>
  );
}
