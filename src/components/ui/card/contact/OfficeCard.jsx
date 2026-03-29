import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../../animation/contactAnimation";

export default function OfficeCard({ office }) {
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
              className="w-3.5 h-3.5 text-text-dim/80 mt-0.5 flex-shrink-0"
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
              <p className="font-body text-[11px] text-text-dim/90">
                {office.zip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              className="w-3.5 h-3.5 text-text-dim/80 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <p className="font-mono text-[10px] text-text-dim/90 uppercase tracking-wider">
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
                  className="w-3.5 h-3.5 text-text-dim/80"
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
                  className="w-3.5 h-3.5 text-text-dim/80"
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
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dark-border/10 bg-white/[0.015] hover:bg-white/[0.03] text-[11px] font-body text-text-dim/90 hover:text-text-muted transition-all duration-300"
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
