import { motion } from "framer-motion";
import { ease } from "../../../animation/contactAnimation";
import BookCallButton from "./BookCallButton";

export default function SuccessState({ onReset }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-center justify-center text-center py-24 md:py-32"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 14,
          delay: 0.15,
        }}
        className="relative w-28 h-28 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
        <div className="relative w-full h-full rounded-full border-2 border-accent/30 bg-accent/[0.05] flex items-center justify-center">
          <svg
            className="w-12 h-12 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      <h3 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3">
        Message sent!
      </h3>
      <p className="font-body text-text-muted max-w-md mb-4 leading-relaxed">
        Thank you for reaching out. We'll review your project details and get
        back to you within 24 hours.
      </p>

      {/* What happens next */}
      <div className="w-full max-w-sm space-y-3 mb-8 text-left">
        {[
          { step: "1", text: "We review your brief", time: "Today" },
          { step: "2", text: "Discovery call invitation", time: "Within 24h" },
          { step: "3", text: "Custom proposal delivery", time: "2–3 days" },
        ].map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/10 bg-white/[0.015]"
          >
            <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono text-[10px] font-bold flex-shrink-0">
              {s.step}
            </span>
            <span className="font-body text-[13px] text-text-primary/80 flex-1">
              {s.text}
            </span>
            <span className="font-mono text-[9px] text-text-dim/40 uppercase tracking-wider">
              {s.time}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-border/30 bg-white/[0.03] hover:bg-white/[0.06] text-sm font-body text-text-muted hover:text-text-primary transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5" />
          </svg>
          New message
        </button>

        {/* Google Calendar booking instead of Calendly */}
        <BookCallButton variant="primary" size="default">
          Book a call now
        </BookCallButton>
      </div>
    </motion.div>
  );
}
