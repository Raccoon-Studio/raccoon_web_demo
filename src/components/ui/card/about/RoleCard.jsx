import { motion } from "framer-motion";
import { fadeUp } from "../../../animation/workAnimation";

export default function RoleCard({ role }) {
  return (
    <motion.a
      href="/careers"
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="group flex items-center justify-between p-4 rounded-2xl border border-dark-border/12 bg-white/[0.01] hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
    >
      <div>
        <h4 className="font-display text-[14px] font-bold text-text-primary group-hover:text-accent transition-colors duration-300">
          {role.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[9px] text-text-dim/40 uppercase tracking-wider">
            {role.department}
          </span>
          <span className="w-px h-3 bg-dark-border/10" />
          <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
            {role.location}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-md bg-accent/[0.06] font-mono text-[8px] text-accent/60 uppercase tracking-widest">
          {role.type}
        </span>
        <svg
          className="w-4 h-4 text-text-dim/20 group-hover:text-accent/50 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}
