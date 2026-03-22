// ─── components/process/ProcessQA.jsx ─────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const layers = [
  {
    num: "1",
    name: "Automated Tests",
    desc: "Unit, integration, and E2E tests run on every pull request. Nothing merges without green checks.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
  {
    num: "2",
    name: "Code Review",
    desc: "Every line reviewed by a senior engineer. We catch bugs, enforce patterns, and share knowledge.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    ),
  },
  {
    num: "3",
    name: "Manual QA",
    desc: "Dedicated QA engineers test user flows, edge cases, and cross-browser/device compatibility.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
  },
  {
    num: "4",
    name: "Performance Audit",
    desc: "Lighthouse, Core Web Vitals, and load testing to ensure sub-second load times under pressure.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    num: "5",
    name: "Security Scan",
    desc: "Dependency audits, OWASP checks, and penetration testing for any app handling sensitive data.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
  },
];

export default function ProcessQA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-dark">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            Quality Assurance
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Five layers between
            <span className="text-accent"> your users and bugs</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-text-muted leading-relaxed">
            Quality isn't a phase — it's embedded in every step. Here's exactly
            how we catch issues before your users do.
          </p>
        </motion.div>

        <div className="space-y-4">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="group flex items-start gap-5 p-5 md:p-6 rounded-xl border border-dark-border/15 bg-dark-card hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-300"
            >
              {/* Layer number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  {layer.icon}
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[10px] text-text-dim tracking-wider">
                    LAYER {layer.num}
                  </span>
                </div>
                <h4 className="font-display text-base md:text-lg font-bold text-text-primary">
                  {layer.name}
                </h4>
                <p className="mt-1 text-sm text-text-muted leading-relaxed">
                  {layer.desc}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex-shrink-0 flex items-center gap-1.5 self-center">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="font-mono text-[9px] text-emerald tracking-wider hidden md:block">
                  ACTIVE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
