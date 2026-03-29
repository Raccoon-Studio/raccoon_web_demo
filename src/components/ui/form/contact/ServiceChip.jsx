import { motion, AnimatePresence } from "framer-motion";

export default function ServiceChip({ service, isActive, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
          : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/[0.04] hover:border-dark-border/40 hover:text-text-primary"
      }`}
    >
      <span
        className={`text-[10px] transition-colors duration-300 ${
          isActive ? "text-accent" : "text-text-dim/40"
        }`}
      >
        {service.icon}
      </span>
      <span>{service.label}</span>
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

      {service.description && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-[#1a1c24] border border-dark-border/20 text-[10px] text-text-muted font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-10">
          {service.description}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a1c24]" />
        </span>
      )}
    </motion.button>
  );
}
