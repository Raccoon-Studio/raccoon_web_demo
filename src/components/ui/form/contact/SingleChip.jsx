import { motion, AnimatePresence } from "framer-motion";

export default function SingleChip({ option, isActive, onSelect }) {
  const label = typeof option === "string" ? option : option.label;
  const icon = typeof option === "object" ? option.icon : null;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
          : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/[0.04] hover:border-dark-border/40 hover:text-text-primary"
      }`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {label}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-3 h-3 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
