import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, ease } from "../../../animation/workAnimation";

export default function LeaderCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-dark-border/15 bg-white/[0.01] overflow-hidden hover:border-dark-border/30 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

        {/* Previous companies */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {member.previousCompanies.map((co) => (
            <span
              key={co}
              className="px-2 py-0.5 rounded-md bg-dark/60 backdrop-blur-sm border border-white/10 font-mono text-[8px] text-white/60 uppercase tracking-wider"
            >
              {co}
            </span>
          ))}
        </div>

        {/* Socials */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg bg-dark/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg bg-dark/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-text-primary">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] text-accent/60 uppercase tracking-widest mb-3">
          {member.role}
        </p>

        <p className="font-body text-[13px] text-text-muted leading-relaxed mb-3 line-clamp-3">
          {member.bio}
        </p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {member.expertise.map((e) => (
            <span
              key={e}
              className="px-2 py-0.5 rounded bg-white/[0.03] border border-dark-border/10 font-mono text-[8px] text-text-dim/40 uppercase tracking-wider"
            >
              {e}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              {/* Quote */}
              <div className="p-3 rounded-xl border border-dark-border/10 bg-white/[0.01] mb-3">
                <p className="font-body text-[12px] text-text-muted/60 italic">
                  "{member.quote}"
                </p>
              </div>

              {/* Fun fact */}
              <div className="flex items-center gap-2">
                <span className="text-sm">✨</span>
                <span className="font-body text-[11px] text-text-dim/40">
                  {member.funFact}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim/30 hover:text-text-dim/60 transition-colors"
        >
          {expanded ? "Less" : "More"}
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
