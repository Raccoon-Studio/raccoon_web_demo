import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { currencies } from "../../../../data/contact";
import { ease } from "../../../animation/contactAnimation";

export default function CurrencyDropdown({ selected, onChange }) {
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
            transition={{ duration: 0.2, ease }}
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

            {/* List */}
            <div className="max-h-52 overflow-y-auto py-1.5">
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
                        : "hover:bg-white/[0.04] text-text-primary"
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
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
