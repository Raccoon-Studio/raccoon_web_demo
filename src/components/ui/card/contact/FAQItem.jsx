import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../../../animation/contactAnimation";

export default function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-dark-border/10 rounded-xl overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <span className="font-body text-[13px] text-text-primary/80 font-medium leading-snug">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/[0.03] border border-dark-border/10 flex items-center justify-center"
        >
          <svg
            className="w-3.5 h-3.5 text-text-dim/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 font-body text-[13px] text-text-muted leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
