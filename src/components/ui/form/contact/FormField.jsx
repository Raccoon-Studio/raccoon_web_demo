import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FormField({
  label,
  name,
  type = "text",
  required = false,
  error,
  placeholder,
  value,
  onChange,
  icon,
}) {
  const [focused, setFocused] = useState(false);
  const hasContent = value?.length > 0;

  return (
    <div className="relative flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1.5"
      >
        {label}
        {required && <span className="text-accent text-[10px]">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim/30 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? "true" : undefined}
          className={`w-full bg-white/[0.03] backdrop-blur-sm rounded-xl ${
            icon ? "pl-10" : "px-4"
          } pr-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none ${
            error
              ? "border-red-400/60 focus:border-red-400"
              : focused
                ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                : hasContent
                  ? "border-dark-border/40"
                  : "border-dark-border/20 hover:border-dark-border/40"
          }`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
        <AnimatePresence>
          {focused && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs font-body mt-0.5 flex items-center gap-1"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4m0 4h.01" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
