import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import {
  contactMethods,
  serviceCategories,
  budgetRanges,
  currencies,
  timelines,
  referralSources,
  offices,
  processSteps,
  faqs,
  teamMembers,
  socialLinks,
  testimonials,
  trustStats,
  trustedBrands,
  certifications,
} from "../../data/contact";

/* ═══════════════════════════════════
   ANIMATION PRESETS
   ═══════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};

/* ═══════════════════════════════════
   FORM PRIMITIVES
   ═══════════════════════════════════ */

function FormField({
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
          className={`w-full bg-white/3 backdrop-blur-sm rounded-xl ${icon ? "pl-10" : "px-4"} pr-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none ${
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

function FormTextarea({
  label,
  name,
  required = false,
  rows = 4,
  maxLength = 1000,
  value,
  onChange,
  placeholder,
}) {
  const [focused, setFocused] = useState(false);
  const hasContent = value?.length > 0;

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1.5"
        >
          {label}
          {required && <span className="text-accent text-[10px]">*</span>}
        </label>
        <span
          className={`font-mono text-[10px] transition-colors duration-300 ${hasContent ? "text-text-dim/50" : "text-transparent"}`}
        >
          {value?.length || 0}/{maxLength}
        </span>
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white/3 backdrop-blur-sm rounded-xl px-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none resize-none ${
          focused
            ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
            : hasContent
              ? "border-dark-border/40"
              : "border-dark-border/20 hover:border-dark-border/40"
        }`}
        placeholder={
          placeholder ||
          "Describe your project goals, timeline, and any specific requirements..."
        }
      />
    </div>
  );
}

/* ═══════════════════════════════════
   CHIP / TAG SELECTORS
   ═══════════════════════════════════ */

function ServiceChip({ service, isActive, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
          : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/4 hover:border-dark-border/40 hover:text-text-primary"
      }`}
    >
      <span
        className={`text-[10px] transition-colors duration-300 ${isActive ? "text-accent" : "text-text-dim/40"}`}
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

      {/* Tooltip */}
      {service.description && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-[#1a1c24] border border-dark-border/20 text-[10px] text-text-muted font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
          {service.description}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a1c24]" />
        </span>
      )}
    </motion.button>
  );
}

function SingleChip({ option, isActive, onSelect }) {
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
          : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/4 hover:border-dark-border/40 hover:text-text-primary"
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

/* ═══════════════════════════════════
   CURRENCY DROPDOWN
   ═══════════════════════════════════ */

function CurrencyDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchRef = useRef(null);

  const filtered = currencies.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );
  const current = currencies.find((c) => c.code === selected) || currencies[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-3 rounded-xl border bg-white/3 text-sm font-body transition-all duration-300 min-w-[130px] ${
          open
            ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
            : "border-dark-border/20 hover:border-dark-border/40"
        }`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-text-primary font-medium">{current.code}</span>
        <span className="text-text-dim/40 text-xs ml-auto">
          {current.symbol}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3.5 h-3.5 text-text-dim/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease }}
            className="absolute z-50 top-full left-0 mt-2 w-64 bg-[#111318] border border-dark-border/30 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="p-2.5 border-b border-dark-border/15">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-dim/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full bg-white/4 rounded-lg pl-9 pr-3 py-2 text-xs font-body text-text-primary placeholder:text-text-dim/30 border border-dark-border/10 focus:border-accent/30 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="max-h-52 overflow-y-auto py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filtered.length === 0 ? (
                <p className="text-center text-text-dim/40 text-xs py-4 font-body">
                  No currencies found
                </p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ${
                      c.code === selected
                        ? "bg-accent/[0.08] text-accent"
                        : "hover:bg-white/4 text-text-primary"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm font-medium">
                          {c.code}
                        </span>
                        <span className="font-mono text-[10px] text-text-dim/50">
                          {c.symbol}
                        </span>
                      </div>
                      <span className="font-body text-[11px] text-text-dim/60">
                        {c.label}
                      </span>
                    </div>
                    {c.code === selected && (
                      <svg
                        className="w-4 h-4 text-accent shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════
   CUSTOM BUDGET INPUT
   ═══════════════════════════════════ */

function CustomBudgetInput({ value, onChange, currency, onCurrencyChange }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const currencyData =
    currencies.find((c) => c.code === currency) || currencies[0];

  const formatNumber = (val) => {
    if (!val) return "";
    const num = String(val).replace(/[^\d]/g, "");
    if (!num) return "";
    return Number(num).toLocaleString();
  };

  // Show raw value when focused, formatted when blurred
  const displayValue = focused ? value : formatNumber(value);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
      animate={{ opacity: 1, height: "auto", transitionEnd: { overflow: "visible" } }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="p-5 rounded-2xl border border-dark-border/20 bg-white/1.5 space-y-4 mt-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
          </svg>
          <span className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim/70">
            Enter Custom Amount
          </span>
        </div>

        <div className="flex items-stretch gap-3">
          <CurrencyDropdown selected={currency} onChange={onCurrencyChange} />
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-accent/60 pointer-events-none">
              {currencyData.symbol}
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={displayValue || ""}
              onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="0"
              className={`w-full bg-white/3 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none font-mono tracking-wide ${
                focused
                  ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                  : value
                    ? "border-dark-border/40"
                    : "border-dark-border/20 hover:border-dark-border/40"
              }`}
            />
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim/30 hover:text-text-dim transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[5000, 15000, 30000, 75000, 150000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onChange(String(amount))}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-200 border ${
                value === String(amount)
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "bg-white/[0.02] border-dark-border/15 text-text-dim/50 hover:text-text-dim hover:border-dark-border/30"
              }`}
            >
              {currencyData.symbol}
              {amount >= 1000 ? `${amount / 1000}k` : amount}
            </button>
          ))}
        </div>

        {value && currency !== "USD" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-[11px] text-text-dim/40 flex items-center gap-1.5"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Exact conversion confirmed in our proposal
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   CUSTOM TIMELINE INPUT
   ═══════════════════════════════════ */

function CustomTimelineInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
      animate={{ opacity: 1, height: "auto", transitionEnd: { overflow: "visible" } }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="p-5 rounded-2xl border border-dark-border/20 bg-white/1.5 space-y-4 mt-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim/70">
            Enter Custom Timeline
          </span>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. 6-8 weeks, by Q4..."
            className={`w-full bg-white/3 rounded-xl px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none tracking-wide ${
              focused
                ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                : value
                  ? "border-dark-border/40"
                  : "border-dark-border/20 hover:border-dark-border/40"
            }`}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim/30 hover:text-text-dim transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   FILE UPLOAD
   ═══════════════════════════════════ */

function FileUpload({ files, setFiles }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const newFiles = Array.from(fileList).filter(
        (f) => f.size <= 10 * 1024 * 1024,
      );
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    },
    [setFiles],
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-3">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-accent/50 bg-accent/4"
            : "border-dark-border/20 hover:border-dark-border/40 bg-white/1 hover:bg-white/2"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.figma,.sketch,.xd"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              dragActive
                ? "bg-accent/15 text-accent"
                : "bg-white/4 text-text-dim/40"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="font-body text-sm text-text-primary/70">
              <span className="text-accent font-medium">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="font-mono text-[10px] text-text-dim/40 mt-1 uppercase tracking-wider">
              PDF, DOC, PNG, JPG, Figma · Max 10MB each · Up to 5 files
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={`${file.name}-${i}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/15 bg-white/[0.02]"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-text-primary truncate">
                {file.name}
              </p>
              <p className="font-mono text-[10px] text-text-dim/40">
                {formatSize(file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-text-dim/30 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════
   CONTACT METHOD CARD
   ═══════════════════════════════════ */

function ContactCard({ method, index }) {
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
      className="group relative flex items-start gap-4 p-4 rounded-2xl border border-dark-border/15 bg-white/[0.02] hover:bg-white/4 hover:border-dark-border/30 transition-all duration-300 cursor-pointer"
    >
      <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-dark-border/15 group-hover:border-accent/25 flex items-center justify-center text-text-dim group-hover:text-accent transition-all duration-300">
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
      <span className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

/* ═══════════════════════════════════
   OFFICE CARD
   ═══════════════════════════════════ */

function OfficeCard({ office, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border border-dark-border/15 bg-white/[0.02] overflow-hidden hover:border-dark-border/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={office.image}
          alt={office.city}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark/70 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
            <span className="text-sm">{office.flag}</span>
            {office.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div>
          <h4 className="font-display text-lg font-bold text-text-primary">
            {office.city}
          </h4>
          <p className="font-body text-[13px] text-text-muted">
            {office.country}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2.5">
            <svg
              className="w-3.5 h-3.5 text-text-dim/40 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-body text-[12px] text-text-primary/80">
                {office.address}
              </p>
              <p className="font-body text-[11px] text-text-dim/50">
                {office.zip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              className="w-3.5 h-3.5 text-text-dim/40 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <p className="font-mono text-[10px] text-text-dim/50 uppercase tracking-wider">
              {office.hours} · {office.timezone}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <a
                href={`tel:${office.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-[12px] font-body text-text-muted hover:text-accent transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 text-text-dim/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {office.phone}
              </a>
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-2.5 text-[12px] font-body text-text-muted hover:text-accent transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 text-text-dim/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                {office.email}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dark-border/10 bg-white/1.5 hover:bg-white/3 text-[11px] font-body text-text-dim/50 hover:text-text-muted transition-all duration-300"
        >
          {expanded ? "Less" : "Contact details"}
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════ */

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative p-6 rounded-2xl border border-dark-border/15 bg-white/[0.02] hover:bg-white/3 transition-colors duration-300 flex flex-col h-full">
      <div className="absolute top-4 right-5 font-display text-4xl text-accent/8 leading-none">
        "
      </div>
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5 text-amber-400/70"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="font-body text-[14px] text-text-primary/80 leading-relaxed italic flex-1 mb-5">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-dark-border/10">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-9 h-9 rounded-full border border-dark-border/15"
            loading="lazy"
          />
          <div>
            <p className="font-body text-[13px] font-medium text-text-primary">
              {testimonial.author}
            </p>
            <p className="font-mono text-[10px] text-text-dim/50 uppercase tracking-wider">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
        {testimonial.metric && (
          <div className="text-right">
            <p className="font-display text-lg font-bold text-accent leading-none">
              {testimonial.metric}
            </p>
            <p className="font-mono text-[8px] text-text-dim/40 uppercase tracking-wider mt-0.5">
              {testimonial.metricLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════ */

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-dark-border/10 rounded-xl overflow-hidden bg-white/1 hover:bg-white/2 transition-colors duration-300">
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
          className="shrink-0 w-6 h-6 rounded-lg bg-white/3 border border-dark-border/10 flex items-center justify-center"
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

/* ═══════════════════════════════════
   FORM STEP INDICATOR
   ═══════════════════════════════════ */

function StepIndicator({ currentStep, totalSteps, completedFields }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i < currentStep
              ? "bg-accent w-6"
              : i === currentStep
                ? "bg-accent/50 w-4"
                : "bg-dark-border/20 w-2"
          }`}
        />
      ))}
      <span className="ml-2 font-mono text-[9px] text-text-dim/40 uppercase tracking-widest">
        {completedFields} fields
      </span>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN CONTACT COMPONENT
   ═══════════════════════════════════ */

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  /* form state */
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    role: "",
    message: "",
    nda: false,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [customTimeline, setCustomTimeline] = useState("");
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* faq state */
  const [activeFaqCategory, setActiveFaqCategory] = useState("Process");
  const [openFaq, setOpenFaq] = useState(null);

  /* helpers */
  const isOtherBudget = selectedBudget === "other";
  const isOtherTimeline = selectedTimeline === "other";

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleService = (label) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  };

  const toggleBudget = (value) => {
    if (value === "other") {
      setSelectedBudget((p) => (p === "other" ? null : "other"));
    } else {
      setSelectedBudget((p) => (p === value ? null : value));
      setCustomBudget("");
    }
  };

  const toggleTimeline = (value) => {
    if (value === "other") {
      setSelectedTimeline((p) => (p === "other" ? null : "other"));
    } else {
      setSelectedTimeline((p) => (p === value ? null : value));
      setCustomTimeline("");
    }
  };

  /* completion tracking */
  const completedFields = useMemo(() => {
    let count = 0;
    if (form.name) count++;
    if (form.email) count++;
    if (form.company) count++;
    if (form.phone) count++;
    if (selectedServices.length) count++;
    if (selectedBudget) count++;
    if (selectedTimeline) count++;
    if (form.message) count++;
    return count;
  }, [form, selectedServices, selectedBudget, selectedTimeline]);

  /* validate */
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Please describe your project";
    if (selectedServices.length === 0)
      errs.services = "Select at least one service";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      formRef.current?.querySelector("[aria-invalid]")?.focus();
      return;
    }

    setIsSubmitting(true);
    /* simulate API call */
    await new Promise((r) => setTimeout(r, 2500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      website: "",
      role: "",
      message: "",
      nda: false,
    });
    setSelectedServices([]);
    setSelectedBudget(null);
    setCustomBudget("");
    setSelectedCurrency("USD");
    setSelectedTimeline(null);
    setCustomTimeline("");
    setSelectedReferral(null);
    setFiles([]);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-dark overflow-hidden"
    >
      {/* ═══ BG EFFECTS ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-accent/[0.012] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[400px] bg-cyan/[0.01] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[350px] bg-violet-500/[0.008] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ═══════════════════════════════════
           1. HERO HEADER
         ═══════════════════════════════════ */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-32 md:pt-40 pb-16 md:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.06] border border-accent/15">
              <span className="font-mono text-[10px] text-accent tracking-[0.2em] font-semibold">
                04
              </span>
              <span className="w-px h-3 bg-accent/20" />
              <span className="font-body text-[11px] text-accent/80 uppercase tracking-[0.12em]">
                Get in Touch
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/[0.06] border border-emerald/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald/50 animate-ping" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-emerald" />
              </span>
              <span className="font-mono text-[10px] text-emerald/80 uppercase tracking-widest">
                Online now
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-text-primary leading-[1.05] tracking-tight mb-5"
          >
            Let's build something
            <br />
            <span className="relative inline-block mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-indigo-400 to-cyan">
                extraordinary together
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-accent via-indigo-400 to-cyan"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5, ease }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-base md:text-lg text-text-muted max-w-xl leading-relaxed mb-8"
          >
            Tell us about your project and we'll craft a tailored plan. Whether
            you need a quick MVP or an enterprise platform, we've got you
            covered.
          </motion.p>

          {/* Trust stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-6 md:gap-8"
          >
            {trustStats.slice(0, 4).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-baseline gap-2"
              >
                <span className="font-display text-xl md:text-2xl font-bold text-text-primary">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim/50">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════
           2. FORM + SIDEBAR
         ═══════════════════════════════════ */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* ─── FORM COLUMN ─── */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* ─── SUCCESS STATE ─── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex flex-col items-center justify-center text-center py-24 md:py-32"
                >
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
                          transition={{
                            duration: 0.5,
                            delay: 0.4,
                            ease: "easeOut",
                          }}
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
                    Thank you for reaching out. We'll review your project
                    details and get back to you within 24 hours.
                  </p>

                  {/* What happens next */}
                  <div className="w-full max-w-sm space-y-3 mb-8 text-left">
                    {[
                      {
                        step: "1",
                        text: "We review your brief",
                        time: "Today",
                      },
                      {
                        step: "2",
                        text: "Discovery call invitation",
                        time: "Within 24h",
                      },
                      {
                        step: "3",
                        text: "Custom proposal delivery",
                        time: "2–3 days",
                      },
                    ].map((s, i) => (
                      <motion.div
                        key={s.step}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.12 }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/10 bg-white/1.5"
                      >
                        <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono text-[10px] font-bold shrink-0">
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
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-border/30 bg-white/3 hover:bg-white/[0.06] text-sm font-body text-text-muted hover:text-text-primary transition-all duration-300"
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
                    <a
                      href="https://calendly.com/raccoonstudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-sm font-grotesk font-semibold uppercase tracking-[0.1em] text-dark transition-colors duration-300"
                    >
                      Book a call now
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* ─── FORM ─── */
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -16 }}
                  className="space-y-14"
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <StepIndicator
                      currentStep={Math.min(Math.floor(completedFields / 2), 5)}
                      totalSteps={6}
                      completedFields={completedFields}
                    />
                    <span className="font-mono text-[10px] text-text-dim/30 uppercase tracking-widest">
                      {completedFields}/8 complete
                    </span>
                  </div>

                  {/* ── STEP 1: Personal Details ── */}
                  <fieldset className="space-y-6">
                    <legend className="flex items-center gap-3 mb-4">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        1
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        About You
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                    </legend>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        label="Full Name"
                        name="name"
                        required
                        value={form.name}
                        onChange={(v) => updateField("name", v)}
                        error={errors.name}
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                          </svg>
                        }
                      />
                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(v) => updateField("email", v)}
                        error={errors.email}
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <rect x="2" y="4" width="20" height="16" rx="3" />
                            <path d="M2 7l10 7 10-7" />
                          </svg>
                        }
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        label="Company / Organization"
                        name="company"
                        value={form.company}
                        onChange={(v) => updateField("company", v)}
                        placeholder="Your company name"
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        }
                      />
                      <FormField
                        label="Your Role"
                        name="role"
                        value={form.role}
                        onChange={(v) => updateField("role", v)}
                        placeholder="e.g., CTO, Founder, PM"
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                          </svg>
                        }
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(v) => updateField("phone", v)}
                        placeholder="+1 (555) 000-0000"
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        }
                      />
                      <FormField
                        label="Website URL"
                        name="website"
                        type="url"
                        value={form.website}
                        onChange={(v) => updateField("website", v)}
                        placeholder="https://yoursite.com"
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                          </svg>
                        }
                      />
                    </div>
                  </fieldset>

                  {/* ── STEP 2: Services ── */}
                  <fieldset className="space-y-5">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        2
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        Services Needed
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                      {selectedServices.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-md"
                        >
                          {selectedServices.length} selected
                        </motion.span>
                      )}
                    </legend>

                    {errors.services && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-xs font-body flex items-center gap-1"
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
                        {errors.services}
                      </motion.p>
                    )}

                    {serviceCategories.map((cat) => (
                      <div key={cat.category} className="space-y-2.5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/40 flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-${cat.color}/40`}
                          />
                          {cat.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cat.services.map((service) => (
                            <ServiceChip
                              key={service.label}
                              service={service}
                              isActive={selectedServices.includes(
                                service.label,
                              )}
                              onToggle={() => toggleService(service.label)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </fieldset>

                  {/* ── STEP 3: Budget ── */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        3
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        Budget Range
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                      {selectedBudget && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-md"
                        >
                          {isOtherBudget
                            ? customBudget
                              ? `${currencies.find((c) => c.code === selectedCurrency)?.symbol}${Number(customBudget).toLocaleString()}`
                              : "Custom"
                            : budgetRanges.find(
                                (b) => b.value === selectedBudget,
                              )?.label}
                        </motion.span>
                      )}
                    </legend>

                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((range) => (
                        <SingleChip
                          key={range.value}
                          option={range}
                          isActive={selectedBudget === range.value}
                          onSelect={() => toggleBudget(range.value)}
                        />
                      ))}
                      <SingleChip
                        option={{ label: "Other", icon: "✏️" }}
                        isActive={isOtherBudget}
                        onSelect={() => toggleBudget("other")}
                      />
                    </div>

                    <AnimatePresence>
                      {isOtherBudget && (
                        <CustomBudgetInput
                          value={customBudget}
                          onChange={setCustomBudget}
                          currency={selectedCurrency}
                          onCurrencyChange={setSelectedCurrency}
                        />
                      )}
                    </AnimatePresence>
                  </fieldset>

                  {/* ── STEP 4: Timeline ── */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        4
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        Timeline
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                      {selectedTimeline && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-md"
                        >
                          {isOtherTimeline
                            ? customTimeline || "Custom"
                            : timelines.find((t) => t.value === selectedTimeline)?.label}
                        </motion.span>
                      )}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <SingleChip
                          key={t.value}
                          option={t}
                          isActive={selectedTimeline === t.value}
                          onSelect={() => toggleTimeline(t.value)}
                        />
                      ))}
                      <SingleChip
                        option={{ label: "Other", icon: "✏️" }}
                        isActive={isOtherTimeline}
                        onSelect={() => toggleTimeline("other")}
                      />
                    </div>
                    <AnimatePresence>
                      {isOtherTimeline && (
                        <CustomTimelineInput
                          value={customTimeline}
                          onChange={setCustomTimeline}
                        />
                      )}
                    </AnimatePresence>
                  </fieldset>

                  {/* ── STEP 5: Project Details ── */}
                  <fieldset className="space-y-5">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        5
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        Project Details
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                    </legend>

                    <FormTextarea
                      label="Project Description"
                      name="message"
                      required
                      rows={6}
                      maxLength={2000}
                      value={form.message}
                      onChange={(v) => updateField("message", v)}
                      placeholder="Tell us about your project: What problem does it solve? Who is the target audience? What does success look like? Any technical requirements or existing systems to integrate with?"
                    />

                    <div>
                      <label className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1.5 mb-2">
                        Attachments
                        <span className="text-text-dim/30 normal-case tracking-normal text-[11px]">
                          (optional)
                        </span>
                      </label>
                      <FileUpload files={files} setFiles={setFiles} />
                    </div>
                  </fieldset>

                  {/* ── STEP 6: How did you hear ── */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                        6
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        How Did You Find Us?
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {referralSources.map((src) => (
                        <SingleChip
                          key={src.value}
                          option={src}
                          isActive={selectedReferral === src.value}
                          onSelect={() =>
                            setSelectedReferral((p) =>
                              p === src.value ? null : src.value,
                            )
                          }
                        />
                      ))}
                    </div>
                  </fieldset>

                  {/* ── NDA Option ── */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-dark-border/15 bg-white/1.5">
                    <button
                      type="button"
                      onClick={() => updateField("nda", !form.nda)}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                        form.nda
                          ? "bg-accent border-accent"
                          : "border-dark-border/30 hover:border-dark-border/50"
                      }`}
                    >
                      {form.nda && (
                        <svg
                          className="w-3 h-3 text-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <p className="font-body text-[13px] text-text-primary/80 font-medium">
                        I'd like to sign an NDA before sharing details
                      </p>
                      <p className="font-body text-[11px] text-text-dim/40 mt-0.5">
                        We'll send a mutual NDA for review within 24 hours of
                        your submission.
                      </p>
                    </div>
                  </div>

                  {/* ── Submit ── */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex items-center gap-3 px-10 py-4.5 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-grotesk text-sm font-semibold uppercase tracking-[0.12em] text-dark transition-all duration-400 overflow-hidden shadow-lg shadow-accent/10 hover:shadow-accent/25"
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2.5"
                            >
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="inline-block w-4 h-4 border-2 border-dark/20 border-t-dark rounded-full"
                              />
                              Sending…
                            </motion.span>
                          ) : (
                            <motion.span
                              key="default"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2.5"
                            >
                              Send Project Brief
                              <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </motion.button>

                    <div className="flex flex-col gap-1.5">
                      <p className="font-body text-[12px] text-text-dim/50 leading-relaxed max-w-xs">
                        By submitting, you agree to our{" "}
                        <a
                          href="#"
                          className="text-text-dim/70 hover:text-accent underline underline-offset-2 transition-colors"
                        >
                          privacy policy
                        </a>
                        . We never share your data.
                      </p>
                      <p className="font-body text-[11px] text-text-dim/30 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        256-bit SSL encrypted
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── SIDEBAR ─── */}
          <motion.aside
            className="lg:col-span-5 xl:col-span-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Contact Methods */}
              <div>
                <motion.p
                  variants={fadeUp}
                  className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-4"
                >
                  Contact Info
                </motion.p>
                <div className="space-y-2.5">
                  {contactMethods.map((method, i) => (
                    <ContactCard key={method.label} method={method} index={i} />
                  ))}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                variants={fadeUp}
                className="relative p-5 rounded-2xl border border-dark-border/15 bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald/[0.04] rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
                <div className="relative space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                    </span>
                    <span className="font-grotesk text-[11px] uppercase tracking-[0.15em] text-emerald font-semibold">
                      Available for projects
                    </span>
                  </div>
                  <p className="font-body text-[13px] text-text-muted leading-relaxed">
                    Currently accepting new projects for{" "}
                    <strong className="text-text-primary font-medium">
                      Q3 2025
                    </strong>
                    . Typical response within{" "}
                    <strong className="text-text-primary font-medium">
                      24 hours
                    </strong>
                    .
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <svg
                      className="w-3.5 h-3.5 text-text-dim/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="font-mono text-[10px] text-text-dim/50 tracking-wide">
                      Mon – Fri · 9AM – 6PM PST
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Team */}
              <motion.div variants={fadeUp}>
                <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-4">
                  Your Point of Contact
                </p>
                <div className="space-y-3">
                  {teamMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/10 bg-white/1.5 hover:bg-white/[0.025] transition-colors duration-300"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-xl border border-dark-border/15 object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-[13px] font-medium text-text-primary truncate">
                          {member.name}
                        </p>
                        <p className="font-mono text-[9px] text-text-dim/50 uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>
                      <a
                        href={member.calendly}
                        className="w-7 h-7 rounded-lg bg-white/4 border border-dark-border/10 flex items-center justify-center text-text-dim/30 hover:text-accent hover:border-accent/20 transition-all duration-300"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={fadeUp}>
                <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-3">
                  Certifications
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-dark-border/10 bg-white/1.5"
                    >
                      <span className="text-sm">{cert.icon}</span>
                      <span className="font-mono text-[9px] text-text-dim/50 uppercase tracking-wider">
                        {cert.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp}>
                <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-4">
                  Follow Us
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.slice(0, 6).map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border border-dark-border/10 bg-white/1.5 hover:bg-white/3 hover:border-dark-border/25 transition-all duration-300"
                    >
                      <span className="text-text-dim/40 group-hover:text-accent transition-colors duration-300">
                        {link.icon}
                      </span>
                      <span className="font-mono text-[8px] text-text-dim/40 uppercase tracking-wider">
                        {link.followers}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* ═══════════════════════════════════
           3. PROCESS TIMELINE
         ═══════════════════════════════════ */}
      <ProcessSection />

      {/* ═══════════════════════════════════
           4. OFFICES
         ═══════════════════════════════════ */}
      <OfficesSection />

      {/* ═══════════════════════════════════
           5. TESTIMONIALS
         ═══════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════
           6. FAQ
         ═══════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════
           7. TRUST FOOTER
         ═══════════════════════════════════ */}
      <TrustFooter />
    </section>
  );
}

/* ═══════════════════════════════════
   SECTION: PROCESS
   ═══════════════════════════════════ */

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-xl mb-12 md:mb-16">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What happens after you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              hit send
            </span>
          </h2>
          <p className="font-body text-base text-text-muted leading-relaxed">
            A transparent, proven workflow from first contact to launch day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="group relative p-5 rounded-2xl border border-dark-border/12 bg-white/1.5 hover:bg-white/[0.025] hover:border-dark-border/25 transition-all duration-300"
            >
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent/[0.12] transition-colors duration-300 shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[9px] text-accent/50 uppercase tracking-widest">
                      Step {step.step}
                    </span>
                    <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
                      · {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-text-primary">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="font-body text-[13px] text-text-muted leading-relaxed pl-[3.25rem]">
                {step.description}
              </p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-dark-border/20">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   SECTION: OFFICES
   ═══════════════════════════════════ */

function OfficesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-xl mb-12 md:mb-16">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Our Offices
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Global presence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              local touch
            </span>
          </h2>
          <p className="font-body text-base text-text-muted leading-relaxed">
            With teams across three continents, we ensure seamless collaboration
            in any timezone.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office, i) => (
            <OfficeCard key={office.city} office={office} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   SECTION: TESTIMONIALS
   ═══════════════════════════════════ */

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="max-w-xl mb-12 md:mb-16">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Client Love
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Don't take our word for it —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              hear from our clients
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.author} variants={fadeUp}>
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   SECTION: FAQ
   ═══════════════════════════════════ */

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Process");
  const [openIndex, setOpenIndex] = useState(null);

  const activeFaqs =
    faqs.find((f) => f.category === activeCategory)?.items || [];

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
              FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Frequently asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                questions
              </span>
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setActiveCategory(cat.category);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-[12px] font-body font-medium border transition-all duration-300 ${
                  activeCategory === cat.category
                    ? "bg-accent/[0.08] border-accent/30 text-accent"
                    : "bg-white/[0.02] border-dark-border/15 text-text-dim/60 hover:text-text-muted hover:border-dark-border/30"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-2.5"
            >
              {activeFaqs.map((faq, i) => (
                <FAQItem
                  key={faq.q}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex((p) => (p === i ? null : i))}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA below FAQ */}
        <motion.div
          variants={fadeUp}
          className="mt-10 p-6 rounded-2xl border border-dark-border/12 bg-white/1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-3xl"
        >
          <div>
            <p className="font-body text-[14px] text-text-primary/80 font-medium">
              Still have questions?
            </p>
            <p className="font-body text-[13px] text-text-dim/50">
              Book a free 30-minute consultation — no strings attached.
            </p>
          </div>
          <a
            href="https://calendly.com/raccoonstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-dark transition-colors duration-300 shrink-0"
          >
            Book a Call
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   SECTION: TRUST FOOTER
   ═══════════════════════════════════ */

function TrustFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-24 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="space-y-12"
      >
        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl border border-dark-border/8 bg-white/1"
            >
              <span className="text-lg mb-1 block">{stat.icon}</span>
              <span className="font-display text-xl font-bold text-text-primary block">
                {stat.value}
              </span>
              <span className="font-mono text-[8px] text-text-dim/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/40 mb-5">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustedBrands.map((brand) => (
              <span
                key={brand}
                className="font-grotesk text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-text-dim/25 hover:text-text-dim/45 transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={fadeUp}
          className="relative text-center pt-10 border-t border-dark-border/8"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-20 bg-accent/[0.03] rounded-full blur-[60px]" />
          <p className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
            Ready to start?
          </p>
          <p className="font-body text-sm text-text-muted mb-6">
            Scroll back up to fill out the form, or reach out directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent hover:bg-accent/90 font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-dark transition-colors duration-300 shadow-lg shadow-accent/10"
            >
              Start a Project
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:hello@raccoonstudio.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-dark-border/20 bg-white/[0.02] hover:bg-white/4 font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-text-muted hover:text-text-primary transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
