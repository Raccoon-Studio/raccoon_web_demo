// ─── components/process/ProcessPricing.jsx ────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const models = [
  {
    name: "Fixed-Price MVP",
    best: "New products & startups",
    desc: "Locked scope, locked price. You know exactly what you're getting and what it costs — before we write a line of code.",
    features: [
      "Discovery phase included",
      "Fixed timeline & budget",
      "Milestone-based payments",
      "30-day post-launch support",
    ],
    highlight: true,
  },
  {
    name: "Monthly Retainer",
    best: "Ongoing development",
    desc: "A dedicated team on a monthly basis. Perfect for products that need continuous feature development and iteration.",
    features: [
      "Dedicated team allocation",
      "Flexible scope each sprint",
      "Priority response times",
      "Discounted hourly rate",
    ],
    highlight: false,
  },
  {
    name: "Staff Augmentation",
    best: "Scaling your team",
    desc: "Embed our engineers directly into your team. Same tools, same standups, same Slack — just more horsepower.",
    features: [
      "Seamless team integration",
      "Your processes & tools",
      "Flexible duration",
      "Senior engineers only",
    ],
    highlight: false,
  },
];

export default function ProcessPricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-dark">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            Engagement Models
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pricing that
            <span className="text-accent"> respects your budget</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-text-muted leading-relaxed">
            Three flexible models. No hourly surprises, no vague estimates. Pick
            what fits, or let us recommend.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {models.map((model, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className={`relative p-7 rounded-2xl border transition-all duration-300 ${
                model.highlight
                  ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                  : "border-dark-border/20 bg-dark-card hover:border-dark-border/40"
              }`}
            >
              {model.highlight && (
                <span className="absolute -top-3 left-6 font-mono text-[9px] tracking-[0.2em] text-dark bg-accent px-3 py-1 rounded-full font-bold">
                  MOST POPULAR
                </span>
              )}

              <h3 className="font-display text-xl font-extrabold text-text-primary mb-1">
                {model.name}
              </h3>
              <span className="font-mono text-[10px] text-accent tracking-wider uppercase">
                {model.best}
              </span>
              <p className="mt-4 text-sm text-text-muted leading-relaxed mb-6">
                {model.desc}
              </p>

              <div className="space-y-3">
                {model.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <svg
                      className="w-3.5 h-3.5 text-emerald flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs text-text-muted">{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`mt-8 block text-center font-grotesk text-sm font-bold py-3 rounded-xl transition-colors ${
                  model.highlight
                    ? "bg-accent text-dark hover:bg-accent/90"
                    : "border border-dark-border/30 text-text-primary hover:border-accent/30 hover:bg-accent/5"
                }`}
              >
                Get a quote
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
