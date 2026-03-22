import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ───────────────────── Data ───────────────────── */

const contactMethods = [
  {
    label: "Email",
    value: "hello@raccoonstudio.com",
    href: "mailto:hello@raccoonstudio.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: "Phone",
    value: "+1 (415) 555-0132",
    href: "tel:+14155550132",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.google.com/?q=San+Francisco+CA",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    copyable: false,
  },
];

const services = [
  { label: "Brand Strategy", icon: "◆" },
  { label: "Web Design", icon: "◇" },
  { label: "Development", icon: "⟐" },
  { label: "Motion Design", icon: "△" },
  { label: "UI/UX Design", icon: "○" },
  { label: "Creative Direction", icon: "□" },
];

const budgetRanges = [
  { label: "Under \$10k", value: "<10k" },
  { label: "\$10k – \$25k", value: "10k-25k" },
  { label: "\$25k – \$50k", value: "25k-50k" },
  { label: "\$50k – \$100k", value: "50k-100k" },
  { label: "\$100k+", value: "100k+" },
];

const currencies = [
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧" },
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "RUB", symbol: "₽", label: "Russian Ruble", flag: "🇷🇺" },
  { code: "IQD", symbol: "د.ع", label: "Iraqi Dinar", flag: "🇮🇶" },
  { code: "KWD", symbol: "د.ك", label: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan", flag: "🇨🇳" },
];

const trustedBrands = ["Acme Co", "Vertex", "Prism", "Horizon", "Apex", "Nova"];

/* ───────────────────── Sub-components ───────────────────── */

function FormField({ label, name, type = "text", required = false, error }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const hasContent = value.length > 0;

  return (
    <div className="relative flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1"
      >
        {label}
        {required && <span className="text-accent text-xs">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-white/[0.03] backdrop-blur-sm rounded-xl px-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/40 border transition-all duration-300 outline-none ${
            error
              ? "border-red-400/60 focus:border-red-400"
              : focused
                ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                : hasContent
                  ? "border-dark-border/40"
                  : "border-dark-border/20 hover:border-dark-border/40"
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
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
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs font-body mt-0.5"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function FormTextarea({ label, name, required = false, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const hasContent = value.length > 0;

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1"
        >
          {label}
          {required && <span className="text-accent text-xs">*</span>}
        </label>
        <span
          className={`font-mono text-[10px] transition-colors duration-300 ${value.length > 0 ? "text-text-dim" : "text-transparent"}`}
        >
          {value.length}/500
        </span>
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        maxLength={500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white/[0.03] backdrop-blur-sm rounded-xl px-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/40 border transition-all duration-300 outline-none resize-none ${
          focused
            ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
            : hasContent
              ? "border-dark-border/40"
              : "border-dark-border/20 hover:border-dark-border/40"
        }`}
        placeholder="Describe your project goals, timeline, and any specific requirements..."
      />
    </div>
  );
}

function ChipSelect({ options, selected, onToggle, multi = true }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const label = typeof option === "string" ? option : option.label;
        const value =
          typeof option === "string" ? option : option.value || option.label;
        const icon = typeof option === "object" ? option.icon : null;
        const isActive = multi ? selected.includes(value) : selected === value;

        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => onToggle(value)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
              isActive
                ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
                : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/[0.04] hover:border-dark-border/40 hover:text-text-primary"
            }`}
          >
            {icon && (
              <span
                className={`text-[10px] transition-colors duration-300 ${isActive ? "text-accent" : "text-text-dim/50"}`}
              >
                {icon}
              </span>
            )}
            {label}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-0.5"
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
      })}
    </div>
  );
}

/* ───────── Currency Dropdown ───────── */

function CurrencyDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const filtered = currencies.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );

  const current = currencies.find((c) => c.code === selected) || currencies[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-3 rounded-xl border bg-white/[0.03] text-sm font-body transition-all duration-300 min-w-[130px] ${
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
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 top-full left-0 mt-2 w-64 bg-[#111318] border border-dark-border/30 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Search */}
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
                  className="w-full bg-white/[0.04] rounded-lg pl-9 pr-3 py-2 text-xs font-body text-text-primary placeholder:text-text-dim/30 border border-dark-border/10 focus:border-accent/30 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Currency list */}
            <div className="max-h-52 overflow-y-auto py-1.5 scrollbar-thin scrollbar-thumb-dark-border/20 scrollbar-track-transparent">
              {filtered.length === 0 ? (
                <p className="text-center text-text-dim/40 text-xs py-4 font-body">
                  No currencies found
                </p>
              ) : (
                filtered.map((currency) => {
                  const isActive = currency.code === selected;
                  return (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => {
                        onChange(currency.code);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ${
                        isActive
                          ? "bg-accent/[0.08] text-accent"
                          : "hover:bg-white/[0.04] text-text-primary"
                      }`}
                    >
                      <span className="text-lg leading-none">
                        {currency.flag}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm font-medium">
                            {currency.code}
                          </span>
                          <span className="font-mono text-[10px] text-text-dim/50">
                            {currency.symbol}
                          </span>
                        </div>
                        <span className="font-body text-[11px] text-text-dim/60">
                          {currency.label}
                        </span>
                      </div>
                      {isActive && (
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────── Custom Budget Input ───────── */

function CustomBudgetInput({ value, onChange, currency, onCurrencyChange }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const currencyData =
    currencies.find((c) => c.code === currency) || currencies[0];

  const formatNumber = (val) => {
    const num = val.replace(/[^\d]/g, "");
    if (!num) return "";
    return Number(num).toLocaleString();
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    onChange(raw);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="p-5 rounded-2xl border border-dark-border/20 bg-white/[0.015] space-y-4">
        {/* Header */}
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

        {/* Currency + Amount row */}
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
              value={formatNumber(value)}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="0"
              className={`w-full bg-white/[0.03] rounded-xl pl-10 pr-4 py-3 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none font-mono tracking-wide ${
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

        {/* Quick amount buttons */}
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

        {/* Conversion hint */}
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
            Exact conversion will be confirmed in our proposal
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ───────── Contact Card ───────── */

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
      target={method.label === "Location" ? "_blank" : undefined}
      rel={method.label === "Location" ? "noopener noreferrer" : undefined}
      onClick={method.copyable ? handleCopy : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.4 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2 }}
      className="group relative flex items-center gap-4 p-4 rounded-2xl border border-dark-border/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-dark-border/30 transition-all duration-300 cursor-pointer"
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
      </div>
      <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              key="action"
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

/* ───────────────────── Main Component ───────────────────── */

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isOtherBudget = selectedBudget === "other";

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const toggleBudget = (budget) => {
    if (budget === "other") {
      setSelectedBudget((prev) => (prev === "other" ? null : "other"));
    } else {
      setSelectedBudget((prev) => (prev === budget ? null : budget));
      setCustomBudget("");
      setSelectedCurrency("USD");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);

    const budgetData = isOtherBudget
      ? { type: "custom", amount: customBudget, currency: selectedCurrency }
      : { type: "range", value: selectedBudget };

    console.log("Budget:", budgetData);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSelectedServices([]);
    setSelectedBudget(null);
    setCustomBudget("");
    setSelectedCurrency("USD");
    setFormErrors({});
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-dark py-24 md:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/[0.015] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-cyan/[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        {[25, 50, 75].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-px bg-text-primary"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Section Header ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
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
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-text-primary leading-[1.08] tracking-tight"
          >
            Let's build something
            <br />
            <span className="relative inline-block mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-indigo-400 to-cyan">
                extraordinary together
              </span>
              <motion.span
                className="absolute -bottom-1.5 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-accent via-indigo-400 to-cyan"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-body text-base md:text-[17px] text-text-muted max-w-lg leading-relaxed"
          >
            Tell us about your project. We'll get back to you within 24 hours
            with a tailored plan.
          </motion.p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* ── Form Column ── */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-20 md:py-28"
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
                    className="relative w-24 h-24 mb-8"
                  >
                    <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
                    <div className="relative w-full h-full rounded-full border-2 border-accent/30 bg-accent/[0.05] flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-accent"
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
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3">
                    Message sent successfully!
                  </h3>
                  <p className="font-body text-text-muted max-w-md mb-8 leading-relaxed">
                    Thank you for reaching out. We'll review your project
                    details and respond within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-border/30 bg-white/[0.03] hover:bg-white/[0.06] text-sm font-body text-text-muted hover:text-text-primary transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Step 1 */}
                  <fieldset className="space-y-6">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent/10 text-accent font-mono text-[10px] font-bold">
                        1
                      </span>
                      <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                        Your Details
                      </span>
                      <span className="flex-1 h-px bg-dark-border/15 ml-2" />
                    </legend>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        label="Full Name"
                        name="name"
                        required
                        error={formErrors.name}
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        error={formErrors.email}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Company" name="company" />
                      <FormField label="Phone" name="phone" type="tel" />
                    </div>
                  </fieldset>

                  {/* Step 2 */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent/10 text-accent font-mono text-[10px] font-bold">
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
                    <ChipSelect
                      options={services}
                      selected={selectedServices}
                      onToggle={toggleService}
                      multi
                    />
                  </fieldset>

                  {/* Step 3 — Budget with "Other" */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent/10 text-accent font-mono text-[10px] font-bold">
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

                    {/* Predefined ranges + Other button */}
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((range) => {
                        const isActive = selectedBudget === range.value;
                        return (
                          <motion.button
                            key={range.value}
                            type="button"
                            onClick={() => toggleBudget(range.value)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
                              isActive
                                ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
                                : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/[0.04] hover:border-dark-border/40 hover:text-text-primary"
                            }`}
                          >
                            {range.label}
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
                      })}

                      {/* Other button */}
                      <motion.button
                        type="button"
                        onClick={() => toggleBudget("other")}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-body font-medium border transition-all duration-300 cursor-pointer select-none ${
                          isOtherBudget
                            ? "bg-accent/[0.08] border-accent/40 text-accent shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
                            : "bg-white/[0.02] border-dark-border/20 text-text-muted hover:bg-white/[0.04] hover:border-dark-border/40 hover:text-text-primary"
                        }`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${isOtherBudget ? "text-accent" : "text-text-dim/50"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Other
                        <AnimatePresence>
                          {isOtherBudget && (
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
                    </div>

                    {/* Custom Budget Input - appears when "Other" is selected */}
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

                  {/* Step 4 */}
                  <fieldset className="space-y-4">
                    <legend className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent/10 text-accent font-mono text-[10px] font-bold">
                        4
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
                      rows={5}
                    />
                  </fieldset>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-grotesk text-sm font-semibold uppercase tracking-[0.12em] text-dark transition-all duration-400 overflow-hidden shadow-lg shadow-accent/10 hover:shadow-accent/20"
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
                              Send Message
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
                    <p className="font-body text-[12px] text-text-dim/50 leading-relaxed max-w-xs">
                      By submitting, you agree to our{" "}
                      <a
                        href="#"
                        className="text-text-dim hover:text-accent underline underline-offset-2 transition-colors"
                      >
                        privacy policy
                      </a>
                      . We'll never share your data.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.aside
            className="lg:col-span-5 xl:col-span-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <div className="lg:sticky lg:top-28 space-y-8">
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
                    Currently accepting new projects. Typical response time is
                    within{" "}
                    <strong className="text-text-primary font-medium">
                      24 hours
                    </strong>{" "}
                    on business days.
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

              <motion.div variants={fadeUp}>
                <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-4">
                  Trusted by
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {trustedBrands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center justify-center h-11 rounded-xl border border-dark-border/10 bg-white/[0.015] hover:border-dark-border/25 hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <span className="font-grotesk text-[10px] uppercase tracking-[0.12em] text-text-dim/40">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/60 mb-1">
                  Quick Answers
                </p>
                {[
                  {
                    q: "What's the typical timeline?",
                    a: "Most projects take 4–12 weeks depending on scope.",
                  },
                  {
                    q: "Do you offer ongoing support?",
                    a: "Yes — we provide retainer packages for maintenance.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group p-4 rounded-xl border border-dark-border/10 bg-white/[0.01] hover:bg-white/[0.025] transition-colors duration-300"
                  >
                    <summary className="flex items-center justify-between cursor-pointer font-body text-[13px] text-text-primary/80 font-medium list-none [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <svg
                        className="w-4 h-4 text-text-dim/40 group-open:rotate-45 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <p className="mt-2.5 font-body text-[12px] text-text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </motion.div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
