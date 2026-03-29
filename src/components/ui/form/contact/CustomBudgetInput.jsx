import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { currencies } from "../../../../data/contact";
import { ease } from "../../../animation/contactAnimation";
import CurrencyDropdown from "./CurrencyDropdown";

export default function CustomBudgetInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const currencyData =
    currencies.find((c) => c.code === currency) || currencies[0];

  const formatNumber = (val) => {
    const num = val.replace(/[^\d]/g, "");
    if (!num) return "";
    return Number(num).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease }}
      className="overflow-hidden"
    >
      <div className="p-5 rounded-2xl border border-dark-border/20 bg-white/[0.015] space-y-4 mt-3">
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

        {/* Currency + Amount */}
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
              onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
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

        {/* Quick amounts */}
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
            Exact conversion confirmed in our proposal
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
