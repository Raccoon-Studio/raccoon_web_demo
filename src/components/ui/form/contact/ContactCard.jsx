import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../../../animation/contactAnimation";

export default function ContactCard({ method, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e) => {
      if (!method.copyable) return;
      e.preventDefault();
      await navigator.clipboard.writeText(method.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    [method],
  );

  return (
    <motion.a
      href={method.href}
      target={method.href.startsWith("http") ? "_blank" : undefined}
      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={method.copyable ? handleCopy : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease }}
      whileHover={{ y: -2 }}
      className="group relative flex items-start gap-4 p-4 rounded-2xl border border-dark-border/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-dark-border/30 transition-all duration-300 cursor-pointer"
    >
      <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-dark-border/15 group-hover:border-accent/25 flex items-center justify-center text-text-dim group-hover:text-accent transition-all duration-300">
        {method.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim/60 mb-0.5">
          {method.label}
        </p>
        <p className="font-body text-sm text-text-primary group-hover:text-accent transition-colors duration-300 truncate">
          {method.value}
        </p>
        {method.description && (
          <p className="font-body text-[11px] text-text-dim/40 mt-1">
            {method.description}
          </p>
        )}
        {method.responseTime && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald/60" />
            <span className="font-mono text-[9px] text-emerald/60 uppercase tracking-wider">
              {method.responseTime}
            </span>
          </div>
        )}
      </div>
      <span className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-emerald"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-text-dim"
            >
              {method.copyable ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.a>
  );
}
