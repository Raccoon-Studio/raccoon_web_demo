// ─── components/process/ProcessPhilosophy.jsx ─────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    icon2: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    ),
    title: "Radical Transparency",
    desc: 'You see everything — every commit, every sprint board, every deployment. No black boxes, no hidden decisions, no "trust us" moments.',
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    title: "Fixed Scope, Fixed Price",
    desc: "We quote it, we lock it, we deliver it. Our discovery phase eliminates guesswork so your budget is never a moving target.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    title: "Ship Fast, Ship Right",
    desc: "Speed without shortcuts. Our architecture-first approach means your MVP is production-grade from day one — not a prototype you'll rebuild later.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    title: "Your Team, Not Vendors",
    desc: "We embed with your team. Shared Slack, shared standups, shared goals. We succeed when you succeed — and we structure our contracts to prove it.",
  },
];

export default function ProcessPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-28 bg-dark-card border-y border-dark-border/20"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Built on principles,
            <span className="text-accent"> not promises</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-muted leading-relaxed">
            Every decision we make traces back to four non-negotiable beliefs
            about how software should be built.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative p-7 rounded-2xl border border-dark-border/20 bg-dark hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-5">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {p.icon}
                  {p.icon2}
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
