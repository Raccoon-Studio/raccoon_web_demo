// ─── components/process/ProcessPostLaunch.tsx ─────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const inclusions = [
  {
    title: "30-Day Bug Fixes",
    desc: "Any bugs found within 30 days of launch are fixed at zero cost. No questions, no fine print.",
    icon: "🛠️",
  },
  {
    title: "Monitoring & Alerts",
    desc: "We set up Sentry, uptime monitoring, and Slack alerts so you know about issues before your users do.",
    icon: "📡",
  },
  {
    title: "Performance Watch",
    desc: "Weekly performance reports for the first month — load times, error rates, and optimization suggestions.",
    icon: "📈",
  },
  {
    title: "Knowledge Transfer",
    desc: "Full documentation, recorded walkthrough, and a live handoff session with your in-house team.",
    icon: "📚",
  },
  {
    title: "Source Code Ownership",
    desc: "You own 100% of the code, designs, and IP. We transfer everything to your repos on completion.",
    icon: "🔑",
  },
  {
    title: "Ongoing Retainer (Optional)",
    desc: "Need continued support? We offer monthly retainers at a discounted rate for existing clients.",
    icon: "🤝",
  },
];

export default function ProcessPostLaunch() {
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
            After Launch
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            We don't disappear
            <span className="text-accent"> after deploy</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-text-muted leading-relaxed">
            Launch day isn't the finish line — it's the starting line. Here's
            exactly what happens after your product goes live.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inclusions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl border border-dark-border/20 bg-dark hover:border-emerald/15 hover:bg-emerald/[0.02] transition-all duration-300"
            >
              <span className="text-2xl block mb-4">{item.icon}</span>
              <h4 className="font-display text-base font-bold text-text-primary mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
