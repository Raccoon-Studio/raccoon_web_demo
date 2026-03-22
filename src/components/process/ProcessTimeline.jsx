// ─── components/process/ProcessTimeline.jsx ───────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    num: "01",
    phase: "DISCOVER",
    tagline: "Understand before we build",
    duration: "Week 1",
    color: "accent",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/5",
    textColor: "text-accent",
    dotColor: "bg-accent",
    description:
      "We deep-dive into your business, users, and technical landscape. By the end of this phase, you'll have a crystal-clear scope document, architecture blueprint, and a fixed-price quote — no ambiguity, no assumptions.",
    deliverables: [
      "Stakeholder interviews & goal mapping",
      "User journey & information architecture",
      "Technical architecture document",
      "Wireframes & low-fidelity prototypes",
      "Locked scope & fixed-price proposal",
      "Project timeline with milestones",
    ],
    outcome:
      "You sign off on a scope you fully understand, with a price that won't change.",
  },
  {
    num: "02",
    phase: "DESIGN",
    tagline: "Pixel-perfect, user-first",
    duration: "Week 2",
    color: "cyan",
    borderColor: "border-cyan/30",
    bgColor: "bg-cyan/5",
    textColor: "text-cyan",
    dotColor: "bg-cyan",
    description:
      "Our design team translates wireframes into high-fidelity, interactive prototypes. You review every screen, click through flows, and approve before a single line of code is written.",
    deliverables: [
      "Brand-aligned UI design system",
      "High-fidelity screen designs",
      "Interactive Figma prototype",
      "Mobile-responsive layouts",
      "Micro-interaction specifications",
      "Client review & sign-off session",
    ],
    outcome:
      "A clickable prototype that looks and feels like the final product — approved by you.",
  },
  {
    num: "03",
    phase: "DEVELOP",
    tagline: "Clean code, fast sprints",
    duration: "Weeks 3–5",
    color: "white",
    borderColor: "border-white/15",
    bgColor: "bg-white/[0.02]",
    textColor: "text-text-primary",
    dotColor: "bg-white",
    description:
      "We build in 1-week sprints with live demos every Friday. You see working software weekly, give feedback, and we iterate in real-time. Our CI/CD pipeline means every merge is tested and deployable.",
    deliverables: [
      "Sprint planning & daily standups",
      "Weekly demo of working software",
      "CI/CD pipeline & staging environment",
      "Code reviews & pair programming",
      "Real-time Slack/Teams communication",
      "Written sprint retrospectives",
    ],
    outcome:
      "Working, tested software you can touch every week — not a surprise delivery at the end.",
  },
  {
    num: "04",
    phase: "LAUNCH",
    tagline: "Ship with confidence",
    duration: "Week 6",
    color: "emerald",
    borderColor: "border-emerald/30",
    bgColor: "bg-emerald/5",
    textColor: "text-emerald",
    dotColor: "bg-emerald",
    description:
      "Rigorous QA, performance testing, security audit, and zero-downtime deployment. We set up monitoring, alerting, and stay on for 30 days to ensure everything runs flawlessly.",
    deliverables: [
      "End-to-end QA & regression testing",
      "Performance & load testing",
      "Security audit & vulnerability scan",
      "Zero-downtime production deploy",
      "Monitoring & alerting setup",
      "30-day post-launch support",
    ],
    outcome:
      "A production-grade product with monitoring, docs, and a team that doesn't disappear.",
  },
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-28 bg-dark-card border-y border-dark-border/20"
    >
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            The Framework
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Four phases.
            <span className="text-accent"> Zero surprises.</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-text-muted leading-relaxed">
            Every project follows the same proven framework — adapted to your
            needs, rigid on quality.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <motion.div
            className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 5%, rgba(255,255,255,0.08) 95%, transparent)",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="relative flex gap-7 md:gap-10"
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 pt-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.5 + i * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 ${phase.borderColor} ${phase.bgColor} flex items-center justify-center`}
                  >
                    <span
                      className={`font-mono text-sm font-bold ${phase.textColor}`}
                    >
                      {phase.num}
                    </span>
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 min-w-0 ${phase.bgColor} border ${phase.borderColor} rounded-2xl p-6 md:p-8 hover:shadow-xl hover:shadow-black/10 transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3
                      className={`font-display text-2xl md:text-3xl font-extrabold ${phase.textColor} tracking-wide`}
                    >
                      {phase.phase}
                    </h3>
                    <span className="font-mono text-[10px] text-text-dim tracking-wider px-3 py-1 border border-dark-border/30 rounded-full bg-dark/40">
                      {phase.duration}
                    </span>
                  </div>

                  <p
                    className={`text-sm font-semibold ${phase.textColor} opacity-70 mb-4`}
                  >
                    {phase.tagline}
                  </p>

                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-text-dim tracking-[0.2em] uppercase block mb-3">
                      Deliverables
                    </span>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {phase.deliverables.map((item, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 0.7 + i * 0.2 + j * 0.05,
                          }}
                          className="flex items-start gap-2.5"
                        >
                          <svg
                            className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${phase.textColor}`}
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
                          <span className="text-text-muted text-xs leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="pt-5 border-t border-dark-border/15">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-1 h-1 rounded-full ${phase.dotColor} mt-2 flex-shrink-0`}
                      />
                      <div>
                        <span className="font-mono text-[10px] text-text-dim tracking-[0.15em] uppercase">
                          Outcome
                        </span>
                        <p className="text-text-primary text-sm font-medium mt-1 leading-relaxed">
                          {phase.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
