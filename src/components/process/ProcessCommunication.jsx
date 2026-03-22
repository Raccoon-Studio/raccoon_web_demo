// ─── components/process/ProcessCommunication.jsx ──────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const channels = [
  {
    icon: "💬",
    name: "Shared Slack / Teams",
    freq: "Real-time",
    desc: "A dedicated channel with your entire project team. Ask anything, anytime — avg. response under 2 hours.",
  },
  {
    icon: "📋",
    name: "Sprint Board Access",
    freq: "Always visible",
    desc: "Full read access to our project board (Linear/Jira). See every task, its status, and who's working on it.",
  },
  {
    icon: "📹",
    name: "Weekly Demo Call",
    freq: "Every Friday",
    desc: "30-minute live demo of that week's progress. Working software, not slides. Record it, share it with your team.",
  },
  {
    icon: "📊",
    name: "Written Sprint Report",
    freq: "Every Monday",
    desc: "Bullet-point summary: what shipped, what's next, blockers, burn rate. Emailed directly to stakeholders.",
  },
  {
    icon: "🔗",
    name: "Staging Environment",
    freq: "Updated daily",
    desc: "A live preview URL updated with every merge. Click through the actual product, not a prototype.",
  },
  {
    icon: "📂",
    name: "Shared Drive",
    freq: "Always updated",
    desc: "All docs, designs, contracts, and assets in one shared folder. Nothing lives only on our machines.",
  },
];

export default function ProcessCommunication() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-dark">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:top-32"
          >
            <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
              Communication
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              You're never in
              <span className="text-accent"> the dark</span>
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              Most agencies disappear after the kickoff call and reappear at
              deadline with something you didn't ask for. We flip that model —
              you have full visibility into every hour of work.
            </p>

            <div className="mt-8 p-5 rounded-xl border border-accent/15 bg-accent/5">
              <p className="text-sm text-text-primary leading-relaxed">
                <span className="text-accent font-bold">"</span>
                Working with Raccoon felt like having an in-house team. The
                Friday demos alone saved us from three wrong turns.
                <span className="text-accent font-bold">"</span>
              </p>
              <p className="mt-3 font-mono text-[10px] text-text-dim tracking-wider">
                — SARAH CHEN, CTO @ FINOVA
              </p>
            </div>
          </motion.div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {channels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="p-5 rounded-xl border border-dark-border/20 bg-dark-card hover:border-accent/15 hover:bg-accent/[0.02] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <span className="font-mono text-[9px] text-accent tracking-widest uppercase bg-accent/10 px-2.5 py-1 rounded-full">
                    {ch.freq}
                  </span>
                </div>
                <h4 className="font-grotesk text-sm font-bold text-text-primary mb-1.5">
                  {ch.name}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  {ch.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
