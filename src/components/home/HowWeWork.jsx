import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    subtitle: "Scope & Strategy",
    desc: "We map your goals, audit existing systems, and deliver a locked scope document — so you know exactly what you're getting, when, and what it costs.",
    items: [
      "Stakeholder deep-dive",
      "Technical architecture",
      "Scope & timeline doc",
      "Fixed-price proposal",
    ],
    time: "Week 1",
    dotColor: "bg-accent",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/5",
    textColor: "text-accent",
  },
  {
    num: "02",
    title: "BUILD",
    subtitle: "Sprint Delivery",
    desc: "Agile sprints with live demos every Friday. You see working software, give real-time feedback, and steer the ship — no black boxes, no surprises.",
    items: [
      "Weekly sprint demos",
      "Shared project board",
      "CI/CD pipeline",
      "Written progress reports",
    ],
    time: "Weeks 2–4",
    dotColor: "bg-cyan",
    borderColor: "border-cyan/30",
    bgColor: "bg-cyan/5",
    textColor: "text-cyan",
  },
  {
    num: "03",
    title: "LAUNCH",
    subtitle: "Ship & Support",
    desc: "Rigorous QA, zero-downtime deploy, and real-time monitoring. We stay on for 30 days to ensure everything runs flawlessly — we don't disappear.",
    items: [
      "Load & security testing",
      "Zero-downtime deploy",
      "Monitoring & alerts",
      "30-day support window",
    ],
    time: "Weeks 5–6",
    dotColor: "bg-emerald",
    borderColor: "border-emerald/30",
    bgColor: "bg-emerald/5",
    textColor: "text-emerald",
  },
];

const stats = [
  { value: "98%", label: "On-time delivery" },
  { value: "150+", label: "Projects shipped" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "30d", label: "Post-launch support" },
];

const pledges = [
  "Fixed pricing — no hidden fees or surprise invoices",
  "Weekly demos — see working software before each payment",
  "Your code, your IP — full ownership on completion",
  "30-day post-launch bug fixes included at zero cost",
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-32 bg-dark overflow-hidden"
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        {/* ── Section header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-accent border border-accent/20 bg-accent/5 rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            OUR PROCESS
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
            Transparency at every step
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-text-muted leading-relaxed">
            No surprises, no scope creep, no vanishing acts. Our battle-tested
            framework keeps you in control from day one to launch&nbsp;day.
          </p>
        </motion.div>

        {/* ── Trust stats ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark-border/20 rounded-2xl overflow-hidden mb-20"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-dark-card px-4 py-8 text-center"
            >
              <span className="font-display text-2xl md:text-3xl font-extrabold text-text-primary">
                {s.value}
              </span>
              <p className="mt-2 font-mono text-[10px] text-text-dim tracking-[0.15em] uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Process timeline ───────────────────────────── */}
        <div className="relative">
          {/* vertical connector */}
          <motion.div
            className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-dark-border/20"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                className="relative flex gap-6 md:gap-10"
              >
                {/* timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.6 + i * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center`}
                  >
                    <span
                      className={`font-mono text-xs md:text-sm font-bold ${step.textColor}`}
                    >
                      {step.num}
                    </span>
                  </motion.div>
                </div>

                {/* content card */}
                <div
                  className={`flex-1 min-w-0 ${step.bgColor} border ${step.borderColor} rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/20`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-text-primary tracking-wide">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[10px] text-text-dim tracking-wider px-2.5 py-1 border border-dark-border/40 rounded-full bg-dark/50">
                      {step.time}
                    </span>
                  </div>

                  <p className={`text-sm font-semibold ${step.textColor} mb-2`}>
                    {step.subtitle}
                  </p>

                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  {/* deliverables checklist */}
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {step.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: 0.8 + i * 0.2 + j * 0.06,
                        }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${step.textColor}`}
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
                        <span className="text-text-muted text-xs">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Guarantees ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 border border-dark-border/30 rounded-2xl p-8 md:p-10 bg-dark-card"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-extrabold text-text-primary tracking-wide">
                OUR COMMITMENT TO YOU
              </h3>
              <p className="font-mono text-[10px] text-text-dim tracking-[0.2em]">
                EVERY PROJECT · NO EXCEPTIONS
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {pledges.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 + i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-dark-elevated/40 border border-dark-border/15"
              >
                <svg
                  className="w-[18px] h-[18px] text-emerald flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-text-muted text-sm leading-relaxed">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-14 text-center"
        >
          <p className="text-text-dim text-sm mb-5">
            Need more information? Click below for a comprehensive overview of
            the process.
          </p>
          <a
            href="/process"
            className="inline-flex items-center gap-2 font-grotesk text-sm font-bold text-dark bg-accent hover:bg-accent/90 transition-colors px-7 py-3.5 rounded-full"
          >
            Click for Process Overview
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
